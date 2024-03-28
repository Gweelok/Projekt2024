import { get, ref, query, push, update, remove, startAt, endAt, orderByChild } from "firebase/database";
import { firebaseGetDB, firebaseAurth } from "./Firebase";
import { writeToDatabase } from "./General";
import { QRCodeExists } from "./Uptainers";
import { deleteImage, getImage, uploadToFirebase, } from "./Images";
import { getCategoryById } from "./Categories";
import { getModelById } from "./Models";
import { cacheImage, getCachedImage } from "../Cache";
import { getProductById } from "./Products";
import { getBrandById } from "./Brands";

const db = firebaseGetDB;

//DB is lowercase and storage is uppercase
const paths = {
    items: "items",
    Items: "Items/",
};




////////////////
//////GET///////
////////////////

export async function getItemsInUptainer(uptainerId, excludedItems = []) {
    let items = [];
    try {
        items = (await getAllItems()).filter(item => item.itemUptainer === uptainerId && item.itemTaken === false);

        if (excludedItems.length) {
            items = items.filter(item => !(excludedItems.includes(item.itemId)))
        }

        return items;
    } catch (error) {
        throw error;
    }
}

export async function getItemsDetails(items) {
    const updatedItems = await Promise.all(
        items.map(async (item) => {
            const product = await getProductById(item.itemproduct)
            const brand = await getBrandById(item.itemBrand)
            const category = await getCategoryById(item.itemCategory)
            const model = await getModelById(item.itemModel)

            item = {
                ...item,
                product: product,
                brand: brand,
                category: category,
                model: model
            }


            try {
                let cachedImage = await getCachedImage(item.itemId)

                // check if cached image has original image path
                if (cachedImage && !cachedImage.includes(encodeURIComponent(item.itemImage))) {
                    // if not then set to null to cache new image
                    cachedImage = null
                }

                if (cachedImage) {
                    return {
                        ...item,
                        imageUrl: cachedImage
                    }
                } else {
                    const url = await getImage(item.itemImage)
                    await cacheImage(item.itemId, url)
                    return {
                        ...item,
                        imageUrl: url
                    }
                }
            } catch (error) {
                return {
                    ...item,
                    imageUrl: 'https://via.placeholder.com/200x200'
                }
            }
        })
    )

    return updatedItems || []
}

export async function getAllItems() {
    const db = firebaseGetDB;
    const reference = ref(db, '/items');

    try {
        const snapshot = await get(reference);
        return Object.values(snapshot.val())
    } catch (error) {
        throw error;
    }
}

export async function getItemById(itemId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/items/${itemId}`);

    try {
        const snapshot = await get(reference);
        const itemData = snapshot.val();

        if (itemData) {
            return itemData
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}

export async function getDraftFromUser() {
    try {
        const itemList = await getAllItems()

        const draftList = itemList.filter(item => item.itemUser === firebaseAurth.currentUser.uid && item.itemUptainer === "Draft")
        ///not tested yet
        return draftList
    } catch (error) { throw error }
}

export async function getItemsFromUser() {
    try {
        const itemList = await getAllItems()

        const itemsUserList = itemList.filter(item => item.itemUser === firebaseAurth.currentUser.uid)
        ///not tested yet
        return itemsUserList
    } catch (error) { throw error }
}


export async function getItemsByName(searchText) {
    const db = firebaseGetDB;
    const productsReference = ref(db, '/products')
    const brandsReference = ref(db, '/brands')
    const modelsReference = ref(db, '/models')
    const categoryReference = ref(db, '/categories')

    //  Example:       products   productName inputText
    const searchQuery = (reference, childKey, text) =>
        query(reference, orderByChild(childKey), startAt(text), endAt(text + '\uf8ff'))

    const productsQuery = searchQuery(productsReference, `productName`, searchText)
    const brandsQuery = searchQuery(brandsReference, `brandName`, searchText)
    const modelsQuery = searchQuery(modelsReference, `modelName`, searchText)
    const categoryQuery = searchQuery(categoryReference, `categoryName`, searchText)

    try {
        const fetchSnapshot = async (query) => {
            const snapshot = await get(query);
            return snapshot.val() || [];
        }

        const [productsSnapshot, brandsSnapshot, modelsSnapshot, categoriesSnapshot] = await Promise.all([
            fetchSnapshot(productsQuery),
            fetchSnapshot(brandsQuery),
            fetchSnapshot(modelsQuery),
            fetchSnapshot(categoryQuery)
        ])

        const combineSnapshots = (snapshots) => {
            const results = [];
            snapshots.forEach((snapshot) => {
                if (snapshot == []) {
                    return null
                } else {
                    results.push(...Object.values(snapshot))
                }
            });
            return results;
        }

        // eslint-disable-next-line react/prop-types
        let sortedData = combineSnapshots([
            productsSnapshot,
            brandsSnapshot,
            modelsSnapshot,
            categoriesSnapshot
        ]).sort(compare);

        // Use a Set to track unique keys
        const uniqueKeys = new Set();

        // Filter out duplicates and update the data array
        sortedData = sortedData.filter(item => {
            const key = item.brandName || item.categoryName || item.modelName || item.productName;
            if (!uniqueKeys.has(key)) {
                uniqueKeys.add(key);
                return true;
            }
            return false;
        });

        return sortedData
    } catch (error) {
        throw error
    }
}

function compare(a, b) {
    const keyA = a.brandName || a.categoryName || a.modelName || a.productName;
    const keyB = b.brandName || b.categoryName || b.modelName || b.productName;

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
}

export async function getSearchedItems(searchText) {
    const db = firebaseGetDB;
    const productsReference = ref(db, '/products')
    const brandsReference = ref(db, '/brands')
    const modelsReference = ref(db, '/models')
    const categoryReference = ref(db, '/categories')

    //  Example:       products   productName inputText
    const searchQuery = (reference, childKey, text) =>
        query(reference, orderByChild(childKey), startAt(text), endAt(text + '\uf8ff'))

    const productsQuery = searchQuery(productsReference, `productName`, searchText)
    const brandsQuery = searchQuery(brandsReference, `brandName`, searchText)
    const modelsQuery = searchQuery(modelsReference, `modelName`, searchText)
    const categoryQuery = searchQuery(categoryReference, `categoryName`, searchText)

    try {
        const fetchSnapshot = async (query) => {
            const snapshot = await get(query);
            return snapshot.val() || {};
        }
        const allItems = await getAllItems()

        const [productsSnapshot, brandsSnapshot, modelsSnapshot, categoriesSnapshot] = await Promise.all([
            fetchSnapshot(productsQuery),
            fetchSnapshot(brandsQuery),
            fetchSnapshot(modelsQuery),
            fetchSnapshot(categoryQuery)
        ])
        const filteredItems = allItems.filter((item) => {
            const productName = productsSnapshot[item.itemproduct]?.productName
            const brandName = brandsSnapshot[item.itemBrand]?.brandName
            const modelName = modelsSnapshot[item.itemModel]?.modelName
            const categoryName = categoriesSnapshot[item.itemCategory]?.categoryName
            return (productName === searchText ||
                brandName === searchText ||
                modelName === searchText ||
                categoryName === searchText) && item.itemUptainer !== 'Draft' && !item.itemTaken
        })

        return filteredItems
    } catch (error) {
        throw error
    }
}


////////////////
/////CREATE/////
////////////////


export async function createItem(itemImage = "", categoryId = "", itemproduct = "", brandId = "", itemModel = "", itemcondition = "", itemDescription = "", uptainerQRCode = "") {
    const newItemKey = push(ref(db, paths.items)).key;
    let newImagePath = "Default.jpg"
    if (itemImage?.uri) {
        try {
            const fileExtension = itemImage.uri.substr(itemImage.uri.lastIndexOf('.') + 1);
            newImagePath = newItemKey + "." + fileExtension;
            const uploadResp = await uploadToFirebase(itemImage.uri, newImagePath, paths.Items, (v) =>
                console.log("progress: ", v)
            );
        } catch (error) {
            throw error
        }

    }
    try {
        const givenDate = new Date().toISOString();
        const UptainerId = await QRCodeExists(uptainerQRCode); //function to check if QR code exists if not, saved as draft
        
        const itemData = {
            itemId: newItemKey,
            itemproduct: itemproduct,
            itemBrand: brandId,
            itemModel: itemModel,
            itemTaken: false,
            itemCategory: categoryId,
            itemImage: paths.Items + newImagePath,
            itemDescription: itemDescription,
            itemcondition: itemcondition,
            itemUser: firebaseAurth.currentUser.uid,
            itemUptainer: UptainerId,
            itemGivenDate: givenDate,
        };
        await writeToDatabase(paths.items + '/' + newItemKey, itemData);
    } catch (error) {
        throw error
    }

}

export async function createItemDraft(productId = "", brandId = "", modelId = "", categoryId = "", itemImage = "", itemDescription = "", itemCondition = "") {
    try {
        const newItemKey = push(ref(db, paths.items)).key;

        const userId = firebaseAurth.currentUser.uid;
        const allItems = await getAllItems()
        const userDraft = allItems.filter(item => (item.itemUser === userId && item.itemUptainer === "Draft"))
        if (userDraft.length >= 15) {
            return {
                draftAdded: false,
                message: "you can't exceed 15 draft items"
            }
        }
        let newImagePath = "Default.jpg"

        if (itemImage?.uri) {
            try {
                const fileExtension = itemImage.uri.substr(itemImage.uri.lastIndexOf('.') + 1);
                newImagePath = newItemKey + "." + fileExtension;
                const uploadResp = await uploadToFirebase(itemImage.uri, newImagePath, paths.Items, (v) =>
                    console.log("progress: ", v)
                );

                console.log(uploadResp);
                console.log(newImagePath);
            } catch (error) {
                throw error
            }

        }
        const itemData = {
            itemId: newItemKey,
            itemproduct: productId,
            itemBrand: brandId,
            itemModel: modelId,
            itemCategory: categoryId,
            itemImage: paths.Items + newImagePath,
            itemDescription: itemDescription,
            itemcondition: itemCondition,
            itemUptainer: "Draft",
            itemUser: userId,
            itemTaken: false,
        };
        await writeToDatabase(paths.items + '/' + newItemKey, itemData);
        return {
            draftAdded: true,
            message: `draft has been added`
        }
    } catch (error) {
        throw error
    }


}


export async function createItemSeedata(itemImage, itemDescription, itemCondition, categoryId, productId, brandId, modelId, uptainerId) {
    try {

        const givenDate = new Date().toISOString();
        const newItemKey = push(ref(db, paths.items)).key;

        const itemData = {
            itemId: newItemKey,
            itemproduct: productId,
            itemBrand: brandId,
            itemModel: modelId,
            itemTaken: false,
            itemCategory: categoryId,
            itemImage: paths.Items + itemImage,
            itemDescription: itemDescription,
            itemcondition: itemCondition,
            itemUptainer: uptainerId,
            itemUser: firebaseAurth.currentUser.uid,
            itemGivenDate: givenDate
        };
        await writeToDatabase(paths.items + '/' + newItemKey, itemData);
        return newItemKey
    } catch (error) { throw error }
}

////////////////
/////UPDATE/////
////////////////

export async function updateItemById(itemId, newData, newImage) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        const item = await getItemById(itemId)
        if (!item) throw 'item not found to be updated'
        // get default saved image
        let newImagePath = newData.itemImage

        // check if provided newImage is image not URL/null, means image is changed
        if (newImage?.uri) {
            const fileExtension = newImage.uri.substr(newImage.uri.lastIndexOf('.') + 1);
            const newImageName = itemId + "." + fileExtension;
            newImagePath = paths.Items + newImageName
            await uploadToFirebase(newImage.uri, newImageName, paths.Items, (v) =>
                console.log("progress: ", v)
            );
        } else if (!newImage) {
            // if provided image is null, means image is removed
            await deleteImage(newImagePath)
            newImagePath = paths.Items + "Default.jpg"
        }

        const updatedData = {
            itemproduct: newData.itemproduct || "",
            itemBrand: newData.itemBrand || "",
            itemModel: newData.itemModel || "",
            itemCategory: newData.itemCategory || "",
            itemDescription: newData.itemDescription || "",
            itemcondition: newData.itemcondition || "",
            itemUptainer: newData.itemUptainer || "Draft",
            itemImage: newImagePath,
        }
        await update(reference, updatedData);
        return {
            itemUpdated: true
        }
    } catch (error) {
        return {
            itemUpdated: false,
            error
        }
    }
}



export async function updateItemToTaken(itemId) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        const item = await getItemById(itemId)
        if (!item) throw 'item not found to be updated'
        // set item taken to user
        const takenDate = new Date().toISOString();
        update(reference, { itemTaken: firebaseAurth.currentUser.uid, itemTakenDate: takenDate, });
    } catch (error) {
        throw error
    }
}

////////////////
/////DELETE/////
////////////////

export async function deleteItemById(itemId) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        remove(reference);
    } catch (error) {
        throw error
    }
}
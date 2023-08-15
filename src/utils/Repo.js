import { ref, push, set, get, remove, update} from "firebase/database";
import { firebaseGetDB } from './Firebase';
import { categories, brands, stationData, products, items, models } from './SeedData';

const db = firebaseGetDB;

const paths = {
    uptainers:  'uptainers',
    brands:     'brands',
    categories: 'categories',
    models:     'models',
    items:      'items',
    products:   'products',
};

export async function seedCheck() {
    try {
        const snapshot = await get(ref(db, '/'));
        if (snapshot.exists()) {
            console.log("Data available");
        } else {
            console.log("No data available");
            await createSeedData();
        }
    } catch (error) {
        console.error("Error checking seed data:", error);
    }
}
async function createSeedData() {
    console.log("Creating brands");
    await Promise.all(brands.map(brand => createBrand(brand)));

    console.log("Creating categories");
    await Promise.all(categories.map(category => createCategory(category)));

    console.log("Creating uptainers");
    await Promise.all(stationData.map(station => createUptainer(station)));

    console.log("Creating products");
    await Promise.all(products.map(product => createProduct(product)));

    const brandList     = await getAllBrands();
    const categoryList  = await getAllCategories();
    const uptainerList  = await getAllUptainers();
    const productList   = await getAllProducts();

    console.log("Creating models");
    await Promise.all(models.map(model => createModel(model, brandList[0].brandId)));

    const modelsList = await getAllModels();

    console.log("Creating items");
    items.forEach((item, index) => {
        try {
            createItem(item, categoryList, productList, brandList, uptainerList, modelsList);
        } catch (error) {
            console.error(`Error creating item at index ${index}:`, error);
            console.log("Problematic item:", item);
        }
    });
    console.log("Done creating data");
}

        /********************/
        /***** Create *******/
        /********************/

async function createUptainer(data) {
    const newUptainerKey = push(ref(db, paths.uptainers)).key;
    const uptainerData = {
        uptainerId: newUptainerKey,
        uptainerName: data.uptainerName,
        uptainerQR: data.uptainerQR,
        uptainerStreet: data.uptainerStreet,
        uptainerZip: data.uptainerZip,
        uptainerCity: data.uptainerCity,
        uptainerImage: data.uptainerImage,
        uptainerDescription: data.uptainerDescription,
        uptainerLat: data.uptainerLat,
        uptainerLong: data.uptainerLong,
    };
    await writeToDatabase(paths.uptainers + '/' + newUptainerKey, uptainerData);
}

async function createBrand(name) {
    const newBrandKey = push(ref(db, paths.brands)).key;
    const brandData = {
        brandName: name,
    };
    await writeToDatabase(paths.brands + '/' + newBrandKey, brandData);
}
async function createCategory(name) {
    const newCategoryKey = push(ref(db, paths.categories)).key;
    const categoryData = {
        categoryName: name,
    };
    await writeToDatabase(paths.categories + '/' + newCategoryKey, categoryData);
}
async function createModel(data, brand) {
    const newModelKey = push(ref(db, paths.models)).key;
    const modelData = {
        modelName: data.name,
        brandId: brand,
    };
    await writeToDatabase(paths.models + '/' + newModelKey, modelData);
}


async function createItem(item, categories, products, brands, uptainers, models) {
    const categoryId1 = categories.find(category => category.categoryName === item.categoryId);
    const productId1 = products.find(product => product.productName === item.productId);
    const brandId1 = brands.find(brand => brand.brandName === item.brandId);
    const modelId1 = models.find(model => model.modelName === item.modelId);
    const uptainerId1 = uptainers.find(stationData => stationData.uptainerName === item.UptainerId);

    const newItemKey = push(ref(db, paths.items)).key;
    const itemData = {
        itemId: newItemKey,
        itemproduct: productId1.productId,
        itemBrand: brandId1.brandId,
        itemModel: modelId1.modelId,
        itemCategory: categoryId1.categoryId,
        itemImage: item.itemImage,
        itemDescription: item.itemDescription,
        itemcondition: item.itemCondition,
        itemUptainer: uptainerId1.uptainerId,
    };
    await writeToDatabase(paths.items + '/' + newItemKey, itemData);
}

async function createProduct(data) {
    const newProductKey = push(ref(db, paths.products)).key;
    const productData = {
        productId: newProductKey,
        productName: data.name,
        co2Footprint: data.co2Footprint,
    };
    await writeToDatabase(paths.products + '/' + newProductKey, productData);
}

function writeToDatabase(refPath, data) {
    const reference = ref(db, refPath);
    try {
        set(reference, data);
        console.log(`Data written to ${refPath} successfully.`);
    } catch (error) {
        console.error(`Error writing data to ${refPath}: ${error.message}`);
    }

}



        /********************/
        /******* Get ********/
        /********************/
        
export async function getAllCategories() {
    const db = firebaseGetDB;
    const reference = ref(db, '/categories');

    try {
        const snapshot = await get(reference);
        const categories = [];
        snapshot.forEach((childSnapshot) => {
            const categoryId = childSnapshot.key;
            const categoryName = childSnapshot.val().categoryName;
            categories.push({
                categoryId: categoryId,
                categoryName: categoryName
            });
        });
        return categories;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getCategoryById(categoryId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/categories/${categoryId}`);

    try {
        const snapshot = await get(reference);
        const categoryData = snapshot.val();
        
        if (categoryData) {
            return {
                categoryId,
                categoryName: categoryData.categoryName
            };
        } else {
            console.log(`Category with ID ${categoryId} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for category with ID ${categoryId}:`, error);
        return null;
    }
}
export async function getAllBrands() {
    const db = firebaseGetDB;
    const reference = ref(db, '/brands');

    try {
        const snapshot = await get(reference);
        const brands = [];
        snapshot.forEach((childSnapshot) => {
            const brandId = childSnapshot.key;
            const brandName = childSnapshot.val().brandName;
            brands.push({
                brandId: brandId,
                brandName: brandName
            });
        });
        return brands;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getBrandById(brandId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/brands/${brandId}`);

    try {
        const snapshot = await get(reference);
        const brandData = snapshot.val();
        
        if (brandData) {
            return {
                brandId,
                brandName: brandData.brandName
            };
        } else {
            console.log(`Brand with ID ${brandId} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for brand with ID ${brandId}:`, error);
        return null;
    }
}
export async function getAllUptainers() {
    const db = firebaseGetDB;
    const reference = ref(db, '/uptainers');

    try {
        const snapshot = await get(reference);
        const uptainers = [];

        snapshot.forEach((childSnapshot) => {
            const uptainerData = childSnapshot.val();
            uptainers.push(uptainerData);
        });

        return uptainers;
    } catch (error) {
        console.error("Error fetching uptainer data:", error);
        return [];
    }
}
export async function getAllModels() {
    const db = firebaseGetDB;
    const reference = ref(db, '/models');

    try {
        const snapshot = await get(reference);
        const models = [];
        snapshot.forEach((childSnapshot) => {
            const modelId = childSnapshot.key;
            const modelName = childSnapshot.val().modelName;
            const brandId = childSnapshot.val().brandId;
            models.push({
                modelId: modelId,
                modelName: modelName,
                brandId: brandId
            });
        });
        return models;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function getUptainerById(uptainerId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/uptainers/${uptainerId}`);

    try {
        const snapshot = await get(reference);
        const uptainerData = snapshot.val();
        
        if (uptainerData) {
            return {
                uptainerId: uptainerData.uptainerId,
                uptainerName: uptainerData.uptainerName,
                uptainerQR: uptainerData.uptainerQR,
                uptainerStreet: uptainerData.uptainerStreet,
                uptainerZip: uptainerData.uptainerZip,
                uptainerCity: uptainerData.uptainerCity,
                uptainerImage: uptainerData.uptainerImage,
                uptainerDescription: uptainerData.uptainerDescription,
                uptainerLat: uptainerData.uptainerLat,
                uptainerLong: uptainerData.uptainerLong,
            };
        } else {
            console.log(`Uptainer with ID ${uptainerId} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for uptainer with ID ${uptainerId}:`, error);
        return null;
    }
}

export async function  getAllProducts() {
    const db = firebaseGetDB;
    const reference = ref(db, '/products');

    try {
        const snapshot = await get(reference);
        const products = [];
        snapshot.forEach((childSnapshot) => {
            const productId = childSnapshot.key;
            const productName = childSnapshot.val().productName;
            const co2Footprint = childSnapshot.val().co2Footprint;
            products.push({
                productId: productId,
                productName: productName,
                co2Footprint: co2Footprint
            });
        });
        return products;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


    /********************/
    /***** Delete *******/
    /********************/
// Delete has not been tested yet
export function deleteCategoryById(categoryId) {
    const reference = ref(db, `/categories/${categoryId}`);
    try {
        remove(reference);
        console.log(`Category with ID ${categoryId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting category with ID ${categoryId}:`, error);
    }
}
export function deleteBrandById(brandId) {
    const reference = ref(db, `/brands/${brandId}`);
    try {
        remove(reference);
        console.log(`Brand with ID ${brandId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting brand with ID ${brandId}:`, error);
    }
}
export function deleteUptainerById(uptainerId) {
    const reference = ref(db, `/uptainers/${uptainerId}`);
    try {
        remove(reference);
        console.log(`Uptainer with ID ${uptainerId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting uptainer with ID ${uptainerId}:`, error);
    }
}
// Delete an item by its itemId
export function deleteItemById(itemId) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        remove(reference);
        console.log(`Item with ID ${itemId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting item with ID ${itemId}:`, error);
    }
}

// Delete a model by its modelId
export function deleteModelById(modelId) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        remove(reference);
        console.log(`Model with ID ${modelId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting model with ID ${modelId}:`, error);
    }
}

        /**********************/
        /****** Update ********/
        /**********************/
    // Update has not been tested yet
export function updateModelById(modelId, newData) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        update(reference, newData);
        console.log(`Model with ID ${modelId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating model with ID ${modelId}:`, error);
    }
}

export function updateUptainerById(uptainerId, newData) {
    const reference = ref(db, `/uptainers/${uptainerId}`);
    try {
        update(reference, newData);
        console.log(`Uptainer with ID ${uptainerId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating uptainer with ID ${uptainerId}:`, error);
    }
}

export function updateItemById(itemId, newData) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        update(reference, newData);
        console.log(`Item with ID ${itemId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating item with ID ${itemId}:`, error);
    }
}

export function updateBrandById(brandId, newData) {
    const reference = ref(db, `/brands/${brandId}`);
    try {
        update(reference, newData);
        console.log(`Brand with ID ${brandId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating brand with ID ${brandId}:`, error);
    }
}

export function updateCategoryById(categoryId, newData) {
    const reference = ref(db, `/categories/${categoryId}`);
    try {
        update(reference, newData);
        console.log(`Category with ID ${categoryId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating category with ID ${categoryId}:`, error);
    }
}

export function updateProductById(productId, newData) {
    const reference = ref(db, `/products/${productId}`);
    try {
        update(reference, newData);
        console.log(`Product with ID ${productId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
    }
}   
import { ref, push, set, get, remove, update} from "firebase/database";
import { firebaseGetDB, firebaseAurth } from './Firebase';
import { categories, brands, stationData, products, items, models } from './SeedData';
import { deleteUser, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

const auth = firebaseAurth;
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

export async function createUptainer(data) {
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

export async function createBrand(name) {
    const newBrandKey = push(ref(db, paths.brands)).key;
    const brandData = {
        brandName: name,
    };
    await writeToDatabase(paths.brands + '/' + newBrandKey, brandData);
}
export async function createCategory(name) {
    const newCategoryKey = push(ref(db, paths.categories)).key;
    const categoryData = {
        categoryName: name,
    };
    await writeToDatabase(paths.categories + '/' + newCategoryKey, categoryData);
}
export async function createModel(data, brand) {
    const newModelKey = push(ref(db, paths.models)).key;
    const modelData = {
        modelName: data.name,
        brandId: brand,
    };
    await writeToDatabase(paths.models + '/' + newModelKey, modelData);
}


export async function createItem(item, categories, products, brands, uptainers, models) {
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

export async function createProduct(data) {
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
            const uptainer = {
                uptainerId: uptainerData.uptainerId,
                uptainerName: uptainerData.uptainerName,
                uptainerQR: uptainerData.uptainerQR,
                uptainerStreet: uptainerData.uptainerStreet,
                uptainerZip: uptainerData.uptainerZip,
                uptainerCity: uptainerData.uptainerCity,
                uptainerImage: uptainerData.uptainerImage,
                uptainerDescription: uptainerData.uptainerDescription,
                uptainerLatitude: parseFloat(uptainerData.uptainerLat),
                uptainerLongitude: parseFloat(uptainerData.uptainerLong),
            };
            uptainers.push(uptainer);
        });
        return uptainers;
    } catch (error) {
        console.error("Error fetching uptainer data:", error);
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
                uptainerId,
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
export async function getModelById(modelId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/models/${modelId}`);

    try {
        const snapshot = await get(reference);
        const modelData = snapshot.val();

        if (modelData) {
            return {
                modelId,
                modelName: modelData.modelName,
                brandId: modelData.brandId
            };
        } else {
            console.log(`Model with ID ${modelId} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for model with ID ${modelId}:`, error);
        return null;
    }
}
export async function getItemsInUptainer(uptainerId) {
    
    try {
        const items = (await getAllItems()).filter(item => item.itemUptainer === uptainerId);
        return items;

    } catch (error) {
      // Handle error
      console.error('Error fetching items:', error);
      throw error;
    }
  }

export async function getAllProducts() {
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
export async function getProductById(productId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/products/${productId}`);

    try {
        const snapshot = await get(reference);
        const productData = snapshot.val();
        
        if (productData) {
            return {
                productId,
                productName: productData.productName,
                co2Footprint: productData.co2Footprint
            };
        } else {
            console.log(`Product with ID ${productId} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for product with ID ${productId}:`, error);
        return null;
    }
}
export async function getAllItems() {
    const db = firebaseGetDB;
    const reference = ref(db, '/items');

    try {
        const snapshot = await get(reference);
        const items = [];
        snapshot.forEach((childSnapshot) => {
            const itemId = childSnapshot.key;
            const itemproduct = childSnapshot.val().itemproduct;
            const itemBrand = childSnapshot.val().itemBrand;
            const itemModel = childSnapshot.val().itemModel;
            const itemCategory = childSnapshot.val().itemCategory;
            const itemImage = childSnapshot.val().itemImage;
            const itemDescription = childSnapshot.val().itemDescription;
            const itemcondition = childSnapshot.val().itemcondition;
            const itemUptainer = childSnapshot.val().itemUptainer;
            items.push({
                itemId: itemId,
                itemproduct: itemproduct,
                itemBrand: itemBrand,
                itemModel: itemModel,
                itemCategory: itemCategory,
                itemImage: itemImage,
                itemDescription: itemDescription,
                itemcondition: itemcondition,
                itemUptainer: itemUptainer
            });
        });
        return items;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getItemById(itemId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/items/${itemId}`);

    try {
        const snapshot = await get(reference);
        const itemData = snapshot.val();

        if (itemData) {
            return {
                itemId,
                itemproduct: itemData.itemproduct,
                itemBrand: itemData.itemBrand,
                itemModel: itemData.itemModel,
                itemCategory: itemData.itemCategory,
                itemImage: itemData.itemImage,
                itemDescription: itemData.itemDescription,
                itemcondition: itemData.itemcondition,
                itemUptainer: itemData.itemUptainer
            };
        } else {
            console.log(`Item with ID ${itemId} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for item with ID ${itemId}:`, error);
        return null;
    }
}
export function GetCurrentUser() {
    try
    {
        const user = auth.currentUser;
        if (user) {
            console.log(user);
            return user;
        } else {
            console.log("No user found");
            return null;
        }
    }
    catch (error) {
        console.error(`Error fetching user:`, error);
        console.log('No user found, user might not be logged in');
        return null;
    }
    
    
}

export function createUser(){

}
    /********************/
    /***** Delete *******/
    /********************/

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
export function deleteItemById(itemId) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        remove(reference);
        console.log(`Item with ID ${itemId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting item with ID ${itemId}:`, error);
    }
}
export function deleteModelById(modelId) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        remove(reference);
        console.log(`Model with ID ${modelId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting model with ID ${modelId}:`, error);
    }
}
export function deleteProductById(productId) {
    const reference = ref(db, `/products/${productId}`);
    try {
        remove(reference);
        console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
    }
}
export function deleteUserById() {
    deleteUser(GetCurrentUser()).then(() => {
        // User deleted.
      }).catch((error) => {
        // An error ocurred
        console.error(`Error deleting user:`, error);
      });
}

        /**********************/
        /****** Update ********/
        /**********************/

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
// ToDo find user data and implement it to the function
export function updateUserData(){
updateProfile(GetCurrentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  console.error(`Error updating user data:`, error);
  // ...
});
}


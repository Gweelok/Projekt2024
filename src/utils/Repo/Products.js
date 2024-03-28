import { get, ref, push, update, remove } from "firebase/database";
import { firebaseGetDB } from "./Firebase";
import { writeToDatabase } from "./General";

const db = firebaseGetDB;

const paths = {
    products: "products",
};

////////////////
//////GET///////
////////////////

export async function getAllProducts() {
    const db = firebaseGetDB;
    const reference = ref(db, '/products');

    try {
        const snapshot = await get(reference);
        return Object.values(snapshot.val())
    } catch (error) {
        throw error
    }
}
export async function getProductById(productId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/products/${productId}`);

    try {
        const snapshot = await get(reference);
        const productData = snapshot.val();

        if (productData?.productId) {
            return productData
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}

////////////////
/////CREATE/////
////////////////

export async function createProduct(name, co2Footprint, categoryId) {
    try{

        const newProductKey = push(ref(db, paths.products)).key;
        const productData = {
            productId: newProductKey,
            categoryId: categoryId,
            productName: name,
            co2Footprint: co2Footprint,
        };
        await writeToDatabase(paths.products + '/' + newProductKey, productData);
        return newProductKey
    } catch (error) {throw error}
}

////////////////
/////UPDATE/////
////////////////

export async function updateProductById(productId, newData) {
    const reference = ref(db, `/products/${productId}`);
    try {
        const product = await getProductById(productId)
        if (!product) throw 'product not found to be updated'
        update(reference, newData);
    } catch (error) {
        throw error
    }
}

////////////////
/////DELETE/////
////////////////

export async function deleteProductById(productId) {
    const reference = ref(db, `/products/${productId}`);
    try {
        remove(reference);
    } catch (error) {
        throw error
    }
}
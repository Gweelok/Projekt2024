import { get, ref, push, update, remove } from "firebase/database";
import { firebaseGetDB } from "./Firebase";
import { writeToDatabase } from "./General";

const db = firebaseGetDB;

//DB is lowercase and storage is uppercase
const paths = {
    brands: "brands",
};

////////////////
/////CREATE/////
////////////////

export async function createBrand(name) {
    try{

        const newBrandKey = push(ref(db, paths.brands)).key;
        const brandData = {
            brandId: newBrandKey,
            brandName: name,
        };
        await writeToDatabase(paths.brands + '/' + newBrandKey, brandData);
        return newBrandKey
    } catch(error){ throw error}
}

////////////////
//////GET///////
////////////////

export async function getAllBrands() {
    const db = firebaseGetDB;
    const reference = ref(db, '/brands');

    try {
        const snapshot = await get(reference);
        return Object.values(snapshot.val())
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getBrandById(brandId) {
    const db = firebaseGetDB;
    const path = `/brands/${brandId}`;
    const reference = ref(db, path);

    try {
        const snapshot = await get(reference);
        const brandData = snapshot.val();

        if (brandData?.brandId) {
            return brandData
        } else {
            return null
        }
    } catch (error) {
        console.error(`Error fetching data for brand with ID ${brandId}:`, error);
        throw error;
    }
}


////////////////
/////UPDATE/////
////////////////

export async function updateBrandById(brandId, newData) {
    const reference = ref(db, `/brands/${brandId}`);
    try {
        const brand = await getBrandById(brandId)
        if (!brand) throw 'brand id not found in the database to be updated'
        update(reference, newData);
    } catch (error) {
        throw error
    }
}

////////////////
/////DELETE/////
////////////////

export async function deleteBrandById(brandId) {
    const reference = ref(db, `/brands/${brandId}`);
    try {
        remove(reference);
    } catch (error) {
        throw error
    }
}
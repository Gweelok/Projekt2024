import { get, ref, push, update, remove } from "firebase/database";
import { firebaseGetDB } from "./Firebase";
import { writeToDatabase } from "./General";

const db = firebaseGetDB;

//DB is lowercase and storage is uppercase
const paths = {
    categories: "categories",
};

////////////////
//////GET///////
////////////////

export async function getAllCategories() {
    const db = firebaseGetDB;
    const reference = ref(db, '/categories');

    try {
        const snapshot = await get(reference);
        return Object.values(snapshot.val())
    } catch (error) {
        throw error
    }
}
export async function getCategoryById(categoryId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/categories/${categoryId}`);

    try {
        const snapshot = await get(reference);
        const categoryData = snapshot.val();

        if (categoryData?.categoryId) {
            return categoryData
        } else {
            return null
        }
    } catch (error) {
        throw error;
    }
}

////////////////
/////CREATE/////
////////////////

export async function createCategory(name) {
    const newCategoryKey = push(ref(db, paths.categories)).key;
    const categoryData = {
        categoryId: newCategoryKey,
        categoryName: name
    };
    try{

        await writeToDatabase(paths.categories + '/' + newCategoryKey, categoryData);
        return newCategoryKey
    } catch(error){ throw error }
}

////////////////
/////UPDATE/////
////////////////

export async function updateCategoryById(categoryId, newData) {
    const reference = ref(db, `/categories/${categoryId}`);
    try {
        const category = await getCategoryById(categoryId)
        if(!category) throw 'category not found to be updated'
        update(reference, newData);
    } catch (error) {
        throw error;
    }
}

////////////////
/////DELETE/////
////////////////

export async function deleteCategoryById(categoryId) {
    const reference = ref(db, `/categories/${categoryId}`);
    try {
        remove(reference);
    } catch (error) {
        throw error
    }
}
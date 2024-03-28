import { get, ref, push, update, remove } from "firebase/database";
import { firebaseGetDB } from "./Firebase";
import { writeToDatabase } from "./General";

const db = firebaseGetDB;

const paths = {
    models: "models",
};

////////////////
//////GET///////
////////////////

export async function getAllModels() {
    const db = firebaseGetDB;
    const reference = ref(db, '/models');

    try {
        const snapshot = await get(reference);
        return Object.values(snapshot.val())
    } catch (error) {
        throw error
    }
}
export async function getModelById(modelId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/models/${modelId}`);
    try {
        const snapshot = await get(reference);
        const modelData = snapshot.val();

        if (modelData?.modelId) {
            return modelData
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

export async function createModel(name, brandId, productId) {
    try{

        const newModelKey = push(ref(db, paths.models)).key;
        const modelData = {
            modelId: newModelKey,
            brandId: brandId,
            productId: productId,
            modelName: name
        };
        await writeToDatabase(paths.models + '/' + newModelKey, modelData);
        return newModelKey
    } catch(error) {throw error}
}

////////////////
/////UPDATE/////
////////////////

export async function updateModelById(modelId, newData) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        const model = await getModelById(modelId)
        if(!model) throw 'model not found to updated'
        update(reference, newData);
    } catch (error) {
        throw error
    }
}

////////////////
/////DELETE/////
////////////////

export async function deleteModelById(modelId) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        remove(reference);
    } catch (error) {
        throw error
    }
}
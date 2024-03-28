import { ref, set } from "firebase/database";
import { firebaseGetDB } from "./Firebase";

const db = firebaseGetDB;

export async function writeToDatabase(refPath, data) {
    const reference = ref(db, refPath);
    try {
        set(reference, data);
        console.log(`Data written to ${refPath} successfully.`);
    } catch (error) {
        console.error(`Error writing data to ${refPath}: ${error.message}`);
        throw error
    }

}
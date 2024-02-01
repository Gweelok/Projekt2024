import { get, ref, push, set, update, remove } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
    ref as ref_storage,
    deleteObject,
  } from "firebase/storage";
import { firebaseGetDB, firebaseAurth } from "./Firebase";

const db = firebaseGetDB;

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
              uptainerLatitude: uptainerData.uptainerLat,
              uptainerLongitude: uptainerData.uptainerLong,
          };
          uptainers.push(uptainer);
      });
      return uptainers;
  } catch (error) {
      console.error("Error fetching uptainer data:", error);
      return [];
  }
}

export async function signInUser(email, password, navigation){
  signInWithEmailAndPassword(firebaseAurth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User logged in:', user);
    navigation.navigate("Home");
  })
  .catch((error) => {
      authErrors(error);
  });
}

export function createUptainerAnswers(data) {
    const newAnswersKey = push(ref(db, "answers")).key;
    console.log(newAnswersKey)
    //writeToDatabase("answers" + "/" + newAnswersKey, data)
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
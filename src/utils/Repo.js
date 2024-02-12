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

/********************/
/******* Get ********/
/********************/

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

export async function getItemByUptainerId(uptainerId) {
  const db = firebaseGetDB;
  const reference = ref(db, '/items');

  try {
    const snapshot = await get(reference);
    const itemList = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();

      if (item && item.itemUptainer === uptainerId) {
        itemList.push(item);
      }
    });

    return itemList;
  } catch (error) {
    console.error("Error getting items:", error);
    throw error;
  }
}

export async function getImage(imagePath) {
  const storage = getStorage();
  const imageRef = ref_storage(storage, imagePath);

  try {
    const url = await getDownloadURL(imageRef)
    return url
  } catch (err) {
    //console.log("Error while downloading image => ", err);
    const url = "https://via.placeholder.com/200x200"
    return url
  }
}

/****************/
/***** Auth *****/
/****************/

export async function signInUser(email, password, navigation) {
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

/********************/
/***** Create *******/
/********************/

export function createUptainerTaskAnswers(data) {
  const newAnswersKey = push(ref(db, "taskAnswers")).key;
  writeToDatabase("taskAnswers" + "/" + newAnswersKey, data)
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
/***** Delete *******/
/********************/ 

export async function deleteItemById(itemId) {
  const reference = ref(db, `/items/${itemId}`);

  try {
    const snapshot = await get(reference);
    // Attempt to delete the item directly
    if (snapshot.exists()) {
      // Attempt to delete the item directly
      await remove(reference);
      console.log(`Item with ID ${itemId} deleted successfully.`);
      return true;
    } else {
      //If Id doesn't exist 
      console.log(`Item with ID ${itemId} does not exist.`);
      return false;
    }
  } catch (error) {
    console.log(error)
    return false;
  }
}

/**********************/
/****** Update ********/
/**********************/
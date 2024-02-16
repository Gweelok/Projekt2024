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
  const reference = ref(db, "/uptainers");

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
    set(reference, data);
    console.log(`Data written to ${refPath} successfully.`);
  } catch (error) {
    console.error(`Error writing data to ${refPath}: ${error.message}`);
  }
}

export async function createItem(
  itemImage = "",
  categoryId = "",
  itemproduct = "",
  brandId = "",
  itemModel = "",
  itemcondition = "",
  itemDescription = "",
  uptainerQRCode = ""
) {
  console.log("createItem for QRScanner called with parameters:");
  console.log("itemImage:", itemImage);
  console.log("categoryId:", categoryId);
  console.log("itemproduct:", itemproduct);
  console.log("brandId:", brandId);
  console.log("itemModel:", itemModel);
  console.log("itemcondition:", itemcondition);
  console.log("itemDescription:", itemDescription);
  console.log("uptainerQRCode:", uptainerQRCode);
  const newItemKey = push(ref(db, paths.items)).key;
  let newImagePath = "Default.jpg";
  if (itemImage !== "") {
    try {
      const fileExtension = itemImage.uri.substr(
        itemImage.uri.lastIndexOf(".") + 1
      );
      newImagePath = newItemKey + "." + fileExtension;
      const uploadResp = await uploadToFirebase(
        itemImage.uri,
        newImagePath,
        paths.Items,
        (v) => console.log("progress: ", v)
      );

      console.log(uploadResp);
      console.log(newImagePath);
    } catch (error) {
      console.log("can not upload image. Error: ", error);
    }
  }
  try {
    const user = await getCurrentUser();
    console.log("uptainerQRCode before QRCodeExists:", uptainerQRCode);
    const UptainerId = await QRCodeExists(uptainerQRCode); //function to check if QR code exists if not, saved as draft
    console.log("UptainerId after QRCodeExists:", UptainerId);
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
      itemUser: user.id,
      itemUptainer: UptainerId,
    };
    await writeToDatabase(paths.items + "/" + newItemKey, itemData);
  } catch (error) {
    console.log("can not upload item to DB. Error: ", error);
  }
}

export async function getUptainerFromQR(QRcode) {
  const uptainerId = await QRCodeExists(QRcode);
  console.log("Result from getUptainerFromQR to QRCodeExists:", uptainerId);
  if (uptainerId !== "Draft") {
    console.log("Returning uptainerId:", uptainerId);
    return uptainerId;
  } else {
    return null;
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
        uptainerId: uptainerId,
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
      return uptainerId;
    }
  } catch (error) {
    console.error(
      `Error fetching data for uptainer with ID ${uptainerId}:`,
      error
    );
    return null;
  }
}

 export async function QRCodeExists(qrCode) {
   const uptainerList = await getAllUptainers();
   // console.log("Uptainer list: ", uptainerList);
   const item = uptainerList.find((uptainer) => uptainer.uptainerQR === qrCode);
   if (item) {
     console.log("Uptainer found: ", item);
     return item.uptainerId;
   } else {
     return "Draft";
   }
 }

 export async function updateItemById(itemId, newData, newImage) {
   const reference = ref(db, `/items/${itemId}`);
   try {
     let itemImage = null;
     if (newImage && newImage?.uri) {
       const fileExtension = newImage.uri.substr(
         newImage.uri.lastIndexOf(".") + 1
       );
       const newImagePath = itemId + "." + fileExtension;
       const uploadResp = await uploadToFirebase(
         newImage.uri,
         newImagePath,
         paths.Items,
         (v) => console.log("progress: ", v)
       );
       itemImage = paths.Items + newImagePath;

       console.log(uploadResp);
       console.log(newImagePath);
     }
     const updatedData = itemImage ? { ...newData, itemImage } : newData;
     await update(reference, updatedData);
     console.log(`Item with ID ${itemId} updated successfully.`);
     return {
       itemUpdated: true,
     };
   } catch (error) {
     console.error(`Error updating item with ID ${itemId}:`, error);
     return {
       itemUpdated: false,
       error,
     };
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
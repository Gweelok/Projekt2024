import {
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
    ref as ref_storage,
    deleteObject,
} from "firebase/storage";



////////////////
//////GET///////
////////////////

export async function getImage(imagePath) {
    const storage = getStorage();
    const imageRef = ref_storage(storage, imagePath);

    try {
        const url = await getDownloadURL(imageRef)
        return url
    } catch (err) {
        const url = "https://via.placeholder.com/200x200"
        return url
    }
}

////////////////
/////UPLOAD/////
////////////////

export const uploadToFirebase = async (uri, name, path, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    const storage = getStorage();
    const imageRef = ref_storage(storage, `${path}${name}`);
    const uploadTask = uploadBytesResumable(imageRef, theBlob);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress && onProgress(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
                reject(error);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({
                    downloadUrl,
                    metadata: uploadTask.snapshot.metadata,
                });
            }
        );
    });
};


////////////////
/////DELETE/////
////////////////


export async function deleteImage(imagePath="") {
    if(imagePath.includes("Default.jpg")){
        return
    }
    const storage = getStorage();
    const desertRef = ref_storage(storage, imagePath);
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log("Image deleted successfully, image file path: ", imagePath);
    }).catch((error) => {
        alert("Error deleting image", error);
        throw error
        // Uh-oh, an error occurred!
    });
}
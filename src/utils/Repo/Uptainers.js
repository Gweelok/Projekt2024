import { get, ref, push, update, remove } from "firebase/database";
import { firebaseGetDB } from "./Firebase";
import { writeToDatabase } from "./General";

const db = firebaseGetDB;

//DB is lowercase and storage is uppercase
const paths = {
    uptainers: "uptainers",
    Uptainers: "Uptainers/",//for storage
};


////////////////
//////GET///////
////////////////

export async function getUptainersByLocation(location) {
    const db = firebaseGetDB;
    const uptainersRef = ref(db, '/uptainers');

    try {
        const snapshot = await get(uptainersRef);
        const uptainers = [];

        snapshot.forEach((childSnapshot) => {
            const uptainerData = childSnapshot.val();
            // Assuming location filtering based on uptainerStreet
            if (uptainerData.uptainerStreet === location) {
                uptainers.push(uptainerData);
            }
        });

        if (uptainers.length > 0) {
            return uptainers;
        } else {
            return [];
        }
    } catch (error) {
        throw error
    }
}

export async function getUptainerById(uptainerId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/uptainers/${uptainerId}`);

    try {
        const snapshot = await get(reference);
        const uptainerData = snapshot.val();

        if (uptainerData) {
            return uptainerData
        } else {
            return null;
        }
    } catch (error) {
        throw error
    }
}

export async function getUptainerFromQR(QRcode) {
    try{

        const uptainerId = await QRCodeExists(QRcode);
        console.log("Result from getUptainerFromQR to QRCodeExists:", uptainerId);
        if (uptainerId !== "Draft") {
            return uptainerId;
        } else {
            return null;
        }
    } catch(error) { throw error }
}

export async function getAllUptainers() {
    const db = firebaseGetDB;
    const reference = ref(db, '/uptainers');

    try {

        const snapshot = await get(reference);
        return Object.values(snapshot.val())
    } catch (error) {
        throw error
    }
}


////////////////
/////CREATE/////
////////////////

export async function createUptainer(name, street, zip, city, image, description, latitude, longitude, uptainerQR) {
    try{

        const newUptainerKey = push(ref(db, paths.uptainers)).key;
        
        const uptainerData = {
            uptainerId: newUptainerKey,
            uptainerName: name,
            uptainerStreet: street,
            uptainerZip: zip,
            uptainerCity: city,
            uptainerImage: image,
            uptainerDescription: description,
            uptainerLatitude: latitude,
            uptainerLongitude: longitude,
            uptainerQR: uptainerQR,
        };
        await writeToDatabase(paths.uptainers + '/' + newUptainerKey, uptainerData);
    } catch(error) {throw error}
}

////////////////
/////UPDATE/////
////////////////


export async function updateUptainerById(uptainerId, newData) {
    const reference = ref(db, `/uptainers/${uptainerId}`);
    try {
        const uptainer = await getUptainerById(uptainerId)
        if (!uptainer) throw 'uptainer not found to be updated'
        update(reference, newData);
    } catch (error) {
        throw error
    }
}

////////////////
/////DELETE/////
////////////////

export async function deleteUptainerById(uptainerId) {
    const reference = ref(db, `/uptainers/${uptainerId}`);
    try {
        remove(reference);
    } catch (error) {
        throw error
    }
}

////////////////
/////CHECKS/////
////////////////

export async function QRCodeExists(qrCode) {
    try{

        const uptainerList = await getAllUptainers();
        // console.log("Uptainer list: ", uptainerList);
        const item = uptainerList.find(uptainer => uptainer.uptainerQR === qrCode);
        if (item) {
            return item.uptainerId;
        } else {
            return "Draft";
        }
    } catch (error) {throw error}
}
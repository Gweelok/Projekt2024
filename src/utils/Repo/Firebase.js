// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ6WtmRpOBb0_bmqAv3wFigZ2ucNq56nU",
  authDomain: "projekt2024-98abc.firebaseapp.com",
  databaseURL: "https://projekt2024-98abc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projekt2024-98abc",
  storageBucket: "projekt2024-98abc.appspot.com",
  messagingSenderId: "829726847217",
  appId: "1:829726847217:web:11cdbc63160839086bf950",
  measurementId: "G-NHXD6G84CM"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAurth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseGetDB = getDatabase(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
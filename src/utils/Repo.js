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

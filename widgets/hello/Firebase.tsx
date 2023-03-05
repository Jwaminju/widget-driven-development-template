import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";


const firebaseConfig = {

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


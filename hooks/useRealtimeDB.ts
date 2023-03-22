import {FirebaseApp, getApp, initializeApp} from "firebase/app";
import "firebase/auth";
import {Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore/lite";
import {useEffect, useRef, useState} from "react";
import {auth} from "../widgets/auth/Firebase";


// export class FirebaseDB {
//   private config: FirebaseOptions;
//   private firebaseApp: FirebaseApp;
//   private firebaseDb: Firestore;
//   private firebaseAuth: Auth;
//
//   constructor(config: FirebaseOptions) {
//     this.config = config;
//     this.firebaseApp = initializeApp(this.config);
//     this.firebaseAuth = getAuth(this.firebaseApp);
//     this.firebaseDb = getFirestore(this.firebaseApp);
//   }
//
//   public getInstance(): Firestore { return this.firebaseDb; }
// }

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJ_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebaseAppName = "carbonhero";
export const useFirebase = () => {
  const firebaseDB = useRef<Firestore | null>(null);
  const firebaseAuth = useRef<Auth | null>(null);
  const firebaseApp = useRef<FirebaseApp | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    firebaseApp.current = initializeApp(firebaseConfig, firebaseAppName);
    firebaseAuth.current = getAuth(firebaseApp.current);
    firebaseDB.current = getFirestore(firebaseApp.current);
    return () => {};
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userData = await signInWithPopup(auth, provider);
      setUser(userData.user);
    }
    catch(err) {
        console.log(err);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("logout success");
    }
    catch (error) {
      setUser(null);
      console.log("logout failed");
    }
  }

  return {
    fbAuth: firebaseAuth.current,
    fbDB: firebaseDB.current,
    user,
    login,
  }
}
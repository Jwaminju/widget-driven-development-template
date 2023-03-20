import {FirebaseApp, getApp, initializeApp} from "firebase/app";
import "firebase/auth";
import {Auth, getAuth} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore/lite";
import {FirebaseOptions} from "@firebase/app-types";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJ_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export class FirebaseDB {
  private config: FirebaseOptions;
  private firebaseApp: FirebaseApp;
  private firebaseDb: Firestore;
  private firebaseAuth: Auth;

  constructor(config: FirebaseOptions) {
    this.config = config;
    this.firebaseApp = initializeApp(this.config);
    this.firebaseAuth = getAuth(this.firebaseApp);
    this.firebaseDb = getFirestore(this.firebaseApp);
  }

  public getInstance(): Firestore { return this.firebaseDb; }
}

function initializeAppIfNecessary() {
    try {
      return getApp();
    } catch (any) {
      return initializeApp(firebaseConfig);
    }
  }

export const app = initializeAppIfNecessary(); // initializeApp(firebaseConfig); // 
export const auth = getAuth(app);
export const db = getFirestore(app);




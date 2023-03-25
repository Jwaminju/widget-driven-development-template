import { useAuthState, useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configs/firebase.config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { GameState } from "./useGameState";
import { getFirestore, collection, getDocs, doc, getDoc, query } from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const db = getFirestore(firebaseApp);
export const useFirebaseSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const signIn = () => {
    return signInWithGoogle();
  }
  return { signIn, user, loading, error };
}

export const useFirebaseSignOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  return { signOut, loading, error };
}

export const useFirebaseAuthState = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
}

export const useFirebaseSaveData = (gamestage: GameState) => {
  return set(ref(database, 'gamedatas/' + gamestage.id), gamestage);
}





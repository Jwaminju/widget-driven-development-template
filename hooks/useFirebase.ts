import {useAuthState, useSignInWithGoogle, useSignOut} from "react-firebase-hooks/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../configs/firebase.config";
import {browserSessionPersistence, getAuth} from "firebase/auth";
import {getDatabase, onValue, ref, set} from "firebase/database";

import {GameState} from "../models/gamestate.types";

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
auth.setPersistence(browserSessionPersistence);
export const database = getDatabase(firebaseApp);

export const useFirebaseSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const signIn = () => signInWithGoogle();
  return {signIn, user, loading, error};
}

export const useFirebaseSignOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  return {signOut, loading, error};
}

export const useFirebaseAuthState = () => {
  const [user, loading, error] = useAuthState(auth);
  return {user, loading, error};
}

export const useFirebaseSaveData = (gamestate: GameState) => {
  const [user, loading, error] = useAuthState(auth);
  if (user != null) {
    return set(ref(database, 'gamedatas/' + user.getIdToken), gamestate);
  }

  return error;

}

export const useFirebaseGetData = () => {
  const [user, loading, error] = useAuthState(auth);
  if (user != null) {
    let gameState: GameState;
    const starCountRef = ref(database, 'gamedatas/' + user.getIdToken)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      gameState = data;
      return gameState;
    })
  }

  return error;
}




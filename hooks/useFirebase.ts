import {useAuthState, useSignInWithGoogle, useSignOut} from "react-firebase-hooks/auth";
import {initializeApp} from "@firebase/app";
import {firebaseConfig} from "../configs/firebase.config";
import {getAuth} from "@firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export const useFirebaseSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return {signInWithGoogle, user, loading, error};
}

export const useFirebaseSignOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  return {signOut, loading, error};
}

export const useFirebaseAuthState = () => {
  const [user, loading, error] = useAuthState(auth);
  return {user, loading, error};
}




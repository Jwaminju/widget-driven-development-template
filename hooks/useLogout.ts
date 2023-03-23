import {useState} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../widgets/auth/Firebase";

export const useLogout = () => {
  const [isLogin, setIsLogin] = useState<any | null>(null);
  const logout = async () => {
    try {
      await signOut(auth);
      setIsLogin(true);
      console.log("logout success");
    }
    catch (error) {
      setIsLogin(false);
      console.log("logout failed");
    }
  }

  return {
    isLogin,
    setIsLogin,
    logout
  }
}
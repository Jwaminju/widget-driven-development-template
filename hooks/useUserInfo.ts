import "firebase/auth";
import { auth } from "../widgets/signIn/Firebase";
import { useState } from "react";
import { UserCredential } from "firebase/auth";

const useUserInfo = () => {
    const [userInfo, setUser] = useState<UserCredential['user'] | null>(null);
    auth.onAuthStateChanged(function (user) {
        if (user) {
            setUser(user)
        } else {
            setUser(user)
        }
    });
    return userInfo;
}

export default useUserInfo;
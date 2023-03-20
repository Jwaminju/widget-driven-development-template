import "firebase/auth";
import {auth} from "../widgets/signIn/Firebase";
import {useEffect, useState} from "react";
import {UserCredential} from "firebase/auth";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserCredential['user'] | null>(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {setUserInfo(user)});
    }, [userInfo]);

    return userInfo;
}

export default useUserInfo;
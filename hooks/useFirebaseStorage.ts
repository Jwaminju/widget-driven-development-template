import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../configs/firebase.config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp, 'gs://green-5be28.appspot.com/');

export const useFirebaseImage = () => {
    const [url, setUrl] = useState('');

    const getImage = (imagePath:string) => {
        const pathReference = ref(storage, imagePath);
        getDownloadURL(pathReference).then((url:string) => {
            console.log("GET success", url)
            setUrl(url);     
        })
        .catch((error) => {
            console.log("firebase GET image error")
            return ''
        });
        return url;
    }
    return {getImage};
}

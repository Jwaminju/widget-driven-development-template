import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../../configs/firebase.config";
import {initializeApp} from "firebase/app";
import { useState } from "react";
import { PERSON_ITEMS } from "../../data/items/personal_item";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp, 'gs://green-5be28.appspot.com/');
const pathReference = ref(storage, 'itemsImg/person/feet-937698_640.jpg');

interface SceneParams {
    path: string;
}

interface items {
    name: string;
    img: string;
    story: string;
    tier: number;
    valid_year: number;
};

const ItemsMenuContainer = (data:items) => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });
    const [url, setUrl] = useState('');
    const [ready, setReady]=useState(true);
    const setItemsImageURL=(url:string)=>{
        PERSON_ITEMS[0].img = url;
        console.log("==>", PERSON_ITEMS[0])
    }

    // const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/green-5be28.appspot.com/o/itemsImg%2Fperson%2Fair-conditioner-6605973_640.jpg?alt=media&token=adc045bd-fe0b-4363-a3ef-d70c3fe31bd0');  

    getDownloadURL(pathReference).then((url:string) => {
        console.log("GET success", url)
        setUrl(url);
        setReady(false);
        console.log(url)
        setItemsImageURL(url)
        
    })
    .catch((error) => {
    // Handle any errors
        console.log("firebase GET image error")
    });



    // tab 1, 2, 3에 들어가야할 데이터 다 만들어주고, presenter에 넘겨주기 -> itemTab에 넘겨주기
    // user 정보를 받고, user가 선택한 내용에 따라 개인, 기업, 국가를 보여줌
    if (isSuccess) {
        return <Presenter sceneTitle={sceneData.sceneName} data={PERSON_ITEMS[0]}/>
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default ItemsMenuContainer

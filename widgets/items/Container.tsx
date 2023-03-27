import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../../configs/firebase.config";
import {initializeApp} from "firebase/app";
import { useEffect, useState } from "react";
import { PERSON_ITEMS } from "../../data/items/personal_item";
import { useFirebaseImage } from "../../hooks/useFirebaseStorage";
import { ItemDataInterface } from "../../data/items.interface";

// import useLocalStorage from "../../hooks/useLocalStorage";

// interface SceneParams {
//     path: string;
// }

const ItemsMenuContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });
    const [currItem, setCurrItem] = useState({});
    const {getImage} = useFirebaseImage();

    const setItemsImageURL=()=>{
        for (var i = 0; i < PERSON_ITEMS[0].length; i++) {
            console.log(i); 
            PERSON_ITEMS[0][i].img = getImage('/itemsImg'+PERSON_ITEMS[0][i].ima_tag);
            console.log("==>", PERSON_ITEMS[i])
        }
    }
    // setItemsImageURL();
    
    const [person, setPerson] = useState(JSON.stringify([1,1,1])); 
    // () => localStorage.getItem('person') || 
    
    useEffect(() => {
        // Perform localStorage action
        localStorage.setItem('person', person);
    })

    const getPersonItemSelect = (col:number, tier:number) => {
        let new_person = JSON.parse(person)
        new_person[col] = tier+1
        setPerson(JSON.stringify(new_person))
        console.log("new person is updated!", person)
    }

    const getCurrItem = (item:ItemDataInterface) => {
        setCurrItem(item)
        console.log("curr item!", currItem)
    }

    if (isSuccess) {
        return <Presenter 
                    sceneTitle={sceneData.sceneName} 
                    data={PERSON_ITEMS[0][0]} 
                    itemSelected={JSON.parse(person)}
                    select={getPersonItemSelect}
                    currItem={currItem}
                    getCurrItem={getCurrItem}/>
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default ItemsMenuContainer
    // setItemsImageURL('/itemsImg'+PERSON_ITEMS[i].ima_tag, Number(i));

    // const [url, setUrl] = useState('');
    // const [ready, setReady]=useState(true);
    // const [ready, setReady] = useState(false);

    // setItemsImageURL();

        // console.log("새로운 시작==>")
        // setItemsImageURL('/itemsImg'+PERSON_ITEMS[0].ima_tag, Number(0));

        // for (let i in PERSON_ITEMS) {
        //     console.log(i); 
        //     // setItemsImageURL('/itemsImg'+PERSON_ITEMS[i].ima_tag, Number(i));
        //     PERSON_ITEMS[i].img = getImage('/itemsImg'+PERSON_ITEMS[i].ima_tag);
        //     console.log("==>", PERSON_ITEMS[i])
        // }
        // setReady(true);
    // }, [ready])

    // const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/green-5be28.appspot.com/o/itemsImg%2Fperson%2Fair-conditioner-6605973_640.jpg?alt=media&token=adc045bd-fe0b-4363-a3ef-d70c3fe31bd0');  
    // tab 1, 2, 3에 들어가야할 데이터 다 만들어주고, presenter에 넘겨주기 -> itemTab에 넘겨주기
    // user 정보를 받고, user가 선택한 내용에 따라 개인, 기업, 국가를 보여줌
    // 9 10 11 
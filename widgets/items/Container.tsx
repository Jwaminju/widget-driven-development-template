import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { useEffect, useState, useRef } from "react";
import { PERSON_ITEMS } from "../../data/items/personal_item";
import { useFirebaseImage } from "../../hooks/useFirebaseStorage";
import { ItemDataInterface } from "../../data/items.interface";
// import useLocalStorage from "../../hooks/useLocalStorage";


const h = (urls:string[]) => {
    return urls// ['https://firebasestorage.googleapis.com/v0/b/green-5be28.appspot.com/o/itemsImg%2Fperson%2Ftap-791172_640.jpg?alt=media&token=8235e389-7394-4991-9e40-142e7bd8d5f0'];
};

const ItemsMenuContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });
    
   
    // 가져와진 이미지를 조회만 함 

    // 묶어서 usePersonItem hook을 분리 
    const image = useFirebaseImage();
    const images = useRef(['']);

    const getImages = () => {
        for (let img of image){
            images.current = [...images.current, img]
        }
    }

    
    const [currItem, setCurrItem] = useState({});
    const person = useRef([1,1,1]); // 컴포넌트가 refresh 될 때 어떻게 되나? // useRef를 썼는데도 왜 초기화 될까??
    // 아이템 계층 -> dict 구조로 하면 키값으로 해도 좋음 
    // () => localStorage.getItem('person') || 
    // s1.setItemsImageURL()
    // useRef는 렌더링이 필요하지 않는 상태 + 상태를 렌더링과 관게없이 언마운트 전까지 저장하는 것
    // setItemsImageURL();

    // const setItemsImageURL=() => {
    //     s1.useFirebaseImage();
    //     for (let i in s1.images) {
    //         PERSON_ITEMS[i].img = s1.images[i]
    //     }
    //     console.log("GET images ->:", PERSON_ITEMS);
    // }
    // setItemsImageURL();

    useEffect(() => {
        // Perform localStorage action
        // setItemsImageURL()
        // console.log("GET images:", images)
        // setImages(image);

        // localStorage.setItem('person', JSON.stringify(person));
        return () => {
        }
    }, [])

    const getPersonItemSelect = (col:number, tier:number) => { // 현재 아이템을 바꾸는 것 
        let new_person = person.current
        new_person[col] = tier+1
        person.current = new_person
        console.log("new person is updated!", person)
    }

    const getCurrItem = (item:ItemDataInterface) => { 
        setCurrItem(item)
        console.log("curr item!", currItem)
    }

    // 좀 많긴 함 -> 
    // 

    if (isSuccess) {
        return <Presenter 
                    sceneTitle={sceneData.sceneName} 
                    data={PERSON_ITEMS[0]} // ? 
                    
                    itemSelected={person.current}
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
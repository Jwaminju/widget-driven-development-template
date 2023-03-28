import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { useEffect, useState, useRef } from "react";
import { PERSON_ITEMS } from "../../data/items/personal_item";
import { useFirebaseImage } from "../../hooks/useFirebaseStorage";
import { ItemDataInterface } from "../../data/items.interface";
// import useLocalStorage from "../../hooks/useLocalStorage";
import { ItemSelectInterface } from "../../data/items.interface";

const ItemsMenuContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });

    // 묶어서 usePersonItem hook을 분리 
    const image = useFirebaseImage();
 
    
    // 컴포넌트가 refresh 될 때 어떻게 되나? // useRef를 썼는데도 왜 초기화 될까??
    // 아이템 계층 -> dict 구조로 하면 키값으로 해도 좋음 
    // () => localStorage.getItem('person') || 

    const [currItem, setCurrItem] = useState({} as ItemDataInterface);
    const [select, setSelect] = useState(
        {
            'person': [1,1,1],
            'enterprise': [1,1,1],
            'country': [1,1,1],
        }
    )

    // 현재까지 선택하여 사용한 아이템 정보를 업데이트한다.
    const getItemSelect = (new_select: ItemSelectInterface) => { 
        setSelect(new_select)
        console.log("new person is updated!", select)
    }

    // 현재 선택된 아이템
    const getCurrItem = (item:ItemDataInterface) => { 
        setCurrItem(item)
        console.log("curr item!", currItem)
    }

    useEffect(() => {
        // localStorage.setItem('person', JSON.stringify(person));
        return () => {
        }
    }, [])


    if (isSuccess) {
        return <Presenter 
                    sceneTitle={sceneData.sceneName} 
                    data={PERSON_ITEMS[0]} // ? 
                    
                    itemSelected={select}
                    select={getItemSelect}
                    currItem={currItem}
                    getCurrItem={getCurrItem}/>
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default ItemsMenuContainer

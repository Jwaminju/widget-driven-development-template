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
    ) // useFirebase -> 

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
    // 유저가 select한 아이템의 정보를 -> state ?? 상태 변경 하고, -> 지금 작업 
    // 현재 선택한 아이템 정보만 갖고 있어라. 
    // useGreenHouseGas <파이어베이스 훅?: 현재 온실가스 상태가 변경이 되면 파이어베이스에 업데이트가 됨> -> 파이어베이스에 보냄 ! ??
    // const {greengas, } = useGreenHouseGas(); // 저는 이걸 먼저!! 

    // 그러니까, 설명 + 
    // 개인 -> 기업 -> 국가 -> 개인 -> 기업 -> 국가 로 선택할 수 있도록 안내해주기 ! 
    // 개인 1 , 기업 1, 국가 1 씩 선택하도록! 
    // 연도가 흘러가게끔 아이템이 선택하도록. 
    // [0, 0, 0] ok!! 

    // 년도 계산 로직 ! 
        // 제가 여기서 계산을 다하고 <년도> ex) 2023 을 저장?
        // counting으로 흠.. 알겠습니다! 

    // 그럼 아이템 선택 + 온실가스 새깔 변경되는 거 확인하고
    // 년도 로직하고
    // 애니메이션을 추가 .. 등등 

    useEffect(() => {
        // localStorage.setItem('person', JSON.stringify(person));
        return () => {
        }
    }, [select])


    if (isSuccess) {
        return <Presenter 
                    sceneTitle={sceneData.sceneName} 
                    data={PERSON_ITEMS} // ? 
                    
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

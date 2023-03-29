import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { useEffect, useState, useRef, createContext } from "react";
import { PERSON_ITEMS } from "../../data/items/personal_item";
// import { useFirebaseImage } from "../../hooks/useFirebaseStorage";
import { ItemDataInterface } from "../../data/items.interface";
// import useLocalStorage from "../../hooks/useLocalStorage";
import { ItemSelectInterface } from "../../data/items.interface";
import { ItemContext } from "../../hooks/useLastSelectionContext";

const ItemsMenuContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });

    // {호준님} 쓰실 부분은 일단 이것입니다!
    // context로 만들어서 전달하려고 하는데, 쉽지 않네요,, 다른 hook이나 state들도 추후 리팩토링 하겠습니다. 
    const [lastSelection, setLastSelection] = useState({} as ItemDataInterface); 

    // 가장 최근 사용한(선택)한 아이템 
    const getLastSelection = (item: ItemDataInterface) => { 
        setLastSelection(item)
        console.log("lastSelection is updated!", lastSelection)
    }


    // 묶어서 useSelectItem hook을 분리 or useContext or component composition 알아보기 
    // const image = useFirebaseImage();
    const [currItem, setCurrItem] = useState({} as ItemDataInterface); 
    const [select, setSelect] = useState(
        {
            'person': [1,1,1],
            'enterprise': [1,1,1],
            'country': [1,1,1],
        }
    ) // useFirebase에 보내는 것 -> 추가하기, onValue

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
    // const {greengas, } = useGreenHouseGas(); // 저는 이걸 먼저!! 그리고 여력이 되면 날짜 로직을 하는 걸로


    useEffect(() => {
        // localStorage.setItem('person', JSON.stringify(person));
        return () => {
        }
    }, [select])


    if (isSuccess) {
        return (
              <ItemContext.Provider value={{lastSelection, setLastSelection}}>

                <Presenter 
                    sceneTitle={sceneData.sceneName} 
                    data={PERSON_ITEMS} // PERSON~COUNTRY 데이터로 바꿔야 함 
                    
                    itemSelected={select}
                    select={getItemSelect}

                    currItem={currItem}
                    getCurrItem={getCurrItem}
                    
                    getLastSelection={getLastSelection}
                    />            
                    </ItemContext.Provider>

        )
    }       

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default ItemsMenuContainer

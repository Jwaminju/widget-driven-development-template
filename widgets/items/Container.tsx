import useLink from "../../hooks/useLink";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { PERSON_ITEMS } from "../../data/items/personal_item";
import { ItemContext } from "../../hooks/useLastSelectionContext";
import {useActionItems} from "../../hooks/useActionItems";

const ItemsMenuContainer = () => {
    const { isSuccess, isError, sceneData } = useLink({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });

    const data = [...PERSON_ITEMS, ...COUNTRY_ITEMS, ...ENTERPRISE_ITEMS]

    const {
        select,
        getItemSelect,
        currItem,
        getCurrItem,
        getLastSelection,
        lastSelection,
        setLastSelection
    } = useActionItems();

    if (isSuccess) {
        return (
              <ItemContext.Provider value={{lastSelection, setLastSelection}}>
                <Presenter 
                    sceneTitle={sceneData.sceneName} 
                    data={data} // 실행에 문제는 없는데 string을 type GreenHouseGasType = "co2" | "n2o" | "ch4" | "cfcs"; 에 넣으려해서 생기는 것임
                    
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

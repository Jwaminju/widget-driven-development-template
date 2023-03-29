import useLink from "../../hooks/useLink";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import { PERSON_ITEMS } from "../../data/items/personal_item";
import { ItemContext } from "../../hooks/useLastSelectionContext";
import {useActionItems} from "../../hooks/useGameState";

const ItemsMenuContainer = () => {
    const { isSuccess, isError, sceneData } = useLink({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });

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

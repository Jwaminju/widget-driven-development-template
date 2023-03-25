import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";

interface SceneParams {
    path: string;
}

const ItemsSceneContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Action needed for save earth",
        nextPage: ""
    });

    // tab 1, 2, 3에 들어가야할 데이터 다 만들어주고, presenter에 넘겨주기 -> itemTab에 넘겨주기
    // user 정보를 받고, user가 선택한 내용에 따라 개인, 기업, 국가 
    if (isSuccess) {
        return <Presenter sceneTitle={sceneData.sceneName} />
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default ItemsSceneContainer

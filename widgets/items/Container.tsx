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

    if (isSuccess) {
        return <Presenter sceneTitle={sceneData.sceneName} />
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default ItemsSceneContainer

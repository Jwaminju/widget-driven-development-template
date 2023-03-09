import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";

interface SceneParams {
    path?: string;
}
const SceneContainer = (sceneParams?: SceneParams) => {
    const { isSuccess, isError, sceneData } = useScene();

    if (isSuccess) {
        return <Presenter sceneTitle={sceneData.sceneName} labelForLinkToNext={sceneData.nextPage}/>
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default SceneContainer

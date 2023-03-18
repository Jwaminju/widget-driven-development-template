import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";

interface SceneParams {
    path?: string;
}
const StorySceneContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Click here to open story",
        nextPage: "main"
    });

    if (isSuccess) {
        return <Presenter  
                sceneTitle={sceneData.sceneName} 
                labelForLinkToNext={sceneData.nextPage}/>
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default StorySceneContainer

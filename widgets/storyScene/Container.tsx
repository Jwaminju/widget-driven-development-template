import useScene from "../../hooks/useScene";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import useUserInfo from "../../hooks/useUserInfo";

interface SceneParams {
    path?: string;
}
const StorySceneContainer = () => {
    const { isSuccess, isError, sceneData } = useScene({
        sceneName: "Click here to open story",
        nextPage: "main"
    });
    const userInfo = useUserInfo();

    if (isSuccess) {
        return <Presenter
                userInfo={userInfo}
                sceneTitle={sceneData.sceneName} 
                labelForLinkToNext={sceneData.nextPage}/>
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default StorySceneContainer

import useLink from "../../hooks/useLink";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";

interface IsDefeat {
    isDefeat?: boolean;
}
const EndingSceneContainer = (isDefeat?: IsDefeat) => {
    const { isSuccess, isError, sceneData } = useLink({
        sceneName: "Carbon Hero: Save the Planet",
    });

    if (isSuccess) {
        return <Presenter isDefeat={isDefeat?.isDefeat} />
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default EndingSceneContainer

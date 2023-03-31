import useLink from "../../hooks/useLink";
import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";

interface Result {
    isDefeat?: boolean;
    gas?: number;
}
const EndingSceneContainer = (result?: Result) => {
    const { isSuccess, isError, sceneData } = useLink({
        sceneName: "Carbon Hero: Save the Planet",
    });

    if (isSuccess) {
        return <Presenter isDefeat={result?.isDefeat} gas={result?.gas} />
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default EndingSceneContainer

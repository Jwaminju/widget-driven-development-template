import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";

const GlobeContainer = () => {
    const { isSuccess, isError, globeData } = useGlobe();

    if (isSuccess) {
        return <Presenter />
    }

    if (isError) {
        return <Error />
    }

    return <Loading />
}

export default GlobeContainer

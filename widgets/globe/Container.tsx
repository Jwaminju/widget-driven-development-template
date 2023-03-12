import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import useGlobe from "../../hooks/useGlobe";

const GlobeContainer = () => {
    const { isSuccess, globe, countries, polygonData, globeData } = useGlobe();

    if (isSuccess) {
        return <Presenter globe={globe} countries={countries} polygonData={polygonData} globeData={globeData} />
    }

    if (!isSuccess) {
        return <Error />
    }

    return <Loading />
}

export default GlobeContainer

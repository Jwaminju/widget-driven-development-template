import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import useGlobe from "../../hooks/useGlobe";
import {useGreenHouseEffect} from "../../hooks/useGreenHouseEffect";

const GlobeContainer = () => {
    const { isSuccess, globe, countries, polygonData, globeData } = useGlobe();
    const { currentGreenHouseGases } = useGreenHouseEffect();

    if (isSuccess) {
        return (
          <Presenter
            globe={globe}
            countries={countries}
            currentGreenHouseGases={currentGreenHouseGases}
            polygonData={polygonData}
            globeData={globeData}
        />
        )
    }

    if (!isSuccess) {
        return <Error />
    }

    return <Loading />
}

export default GlobeContainer

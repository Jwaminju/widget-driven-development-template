import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import {useGreenHouseGases} from "../../hooks/useGameState";

const GreenHouseEffectStatsContainer = () => {
    const success = true
    const error = false;
    const {greenHouseEffect, greenHouseGases, changeRates} = useGreenHouseGases();
    if (success) {
        return (
          <Presenter
          changeRates={changeRates}
          greenHouseEffect={greenHouseEffect}
          greenHouseGases={greenHouseGases}
        />
        )
    }

    if (error) {
        return <Error />
    }

    return <Loading />
}

export default GreenHouseEffectStatsContainer

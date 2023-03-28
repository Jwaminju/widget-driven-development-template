import {Stat, StatArrow, StatGroup, StatHelpText, StatLabel} from "@chakra-ui/stat";
import StatIndicator from "../../components/StatIndicator";
import {defaultGreenHouseGases, GreenHouseGas} from "../../models/greenhousegas";

interface Props {
  greenHouseEffect: number | null;
  greenHouseGases: GreenHouseGas[] | null;
  changeRates: Map<string, number> | null;
}

const Presenter = ({
  greenHouseEffect,
  greenHouseGases = defaultGreenHouseGases,
  changeRates
                   }: Props) => {
    const [co2,n2o,ch4,cfcs] = greenHouseGases!;
    return (
      <StatGroup
        position={'fixed'}
        top={'5%'}
        left={'5%'}
        zIndex={100}
        backgroundColor={"#fff"}
        borderRadius={10}
        borderColor={"lightslategrey"}
        gap={12}
        padding={5}
      >
          <StatIndicator label={"GreenHouseEffect"} statNumber={greenHouseEffect||0} changeRate={changeRates?.get("greenHouseEffect")||0} />
          <StatIndicator label={"Co2"} statNumber={co2.concentration} changeRate={changeRates?.get("co2")||0} />
          <StatIndicator label={"N2o"} statNumber={n2o.concentration} changeRate={changeRates?.get("n2o")||0} />
          <StatIndicator label={"Ch4"} statNumber={ch4.concentration} changeRate={changeRates?.get("ch4")||0} />
          <StatIndicator label={"Cfcs"} statNumber={cfcs.concentration} changeRate={changeRates?.get("cfcs")||0} />
      </StatGroup>
    );
}

export default Presenter

import {StatGroup} from "@chakra-ui/stat";
import StatIndicator from "../../components/StatIndicator";
import {defaultGreenHouseGases, GreenHouseGas} from "../../models/greenhousegas";
import {Divider} from "@chakra-ui/react";

interface Props {
  greenHouseEffect: number;
  greenHouseGases: GreenHouseGas[];
  greenHouseEffectChangeRate: number;
}

const Presenter = ({
  greenHouseEffect,
  greenHouseGases = defaultGreenHouseGases,
  greenHouseEffectChangeRate
                   }: Props) => {
    const [co2,n2o,ch4,cfcs] = greenHouseGases!;
    return (
      <StatGroup
        position={'fixed'}
        top={'5%'}
        left={'2.5%'}
        zIndex={100}
        backgroundColor={"#fff"}
        borderRadius={10}
        borderColor={"lightslategrey"}
        gap={12}
        padding={5}
        boxShadow={"outline"}
      >
          <StatIndicator label={"GreenHouseEffect"} statNumber={greenHouseEffect} changeRate={greenHouseEffectChangeRate} />
          <Divider orientation={"vertical"} />
          <StatIndicator label={"Co2"} statNumber={co2.concentration} changeRate={co2.lastChangeRate} />
          <Divider orientation={"vertical"} />
          <StatIndicator label={"N2o"} statNumber={n2o.concentration} changeRate={n2o.lastChangeRate} />
          <Divider orientation={"vertical"} />
          <StatIndicator label={"Ch4"} statNumber={ch4.concentration} changeRate={ch4.lastChangeRate} />
          <Divider orientation={"vertical"} />
          <StatIndicator label={"Cfcs"} statNumber={cfcs.concentration} changeRate={cfcs.lastChangeRate} />
      </StatGroup>
    );
}

export default Presenter

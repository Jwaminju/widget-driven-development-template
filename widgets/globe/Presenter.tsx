import {RefObject} from "react";
import {GlobeData} from "../../models/globe-layer.types";
import {PolygonData, selectPolygonCapColor} from "../../models/polygon-layer.types";
import dynamic from "next/dynamic";
import {Center} from "@chakra-ui/layout";
import {GreenHouseGas} from "../../models/greenhousegas";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false
});
interface FeatureCollection {
  features: GeoNationProperty[];
}
interface Props {
    globe: RefObject<any>;
    countries: FeatureCollection;
    polygonData: PolygonData;
    globeData: GlobeData;
    currentGreenHouseGases: GreenHouseGas[];
}
interface GeoNationProperty {
  properties: any;
}
const Presenter = ({
  globe,
  countries,
  polygonData,
  globeData,
  currentGreenHouseGases
                   }: Props) => {
    const {containerData, globeLayerData} = globeData;
    const {width, height, backgroundImageUrl, backgroundColor} = containerData;
    const {globeImageUrl} = globeLayerData;
    const {polygonsData, polygonLabel, polygonAltitude, polygonCapColor, polygonSideColor} = polygonData;
    const nations = countries?.features as GeoNationProperty[];
    return (
      <Center w={'100%'} h={'100%'}>
        <Globe
          ref={globe}
          globeImageUrl={globeImageUrl}
          width={width}
          height={height}
          backgroundColor={backgroundColor}
          backgroundImageUrl={backgroundImageUrl}
          polygonsData={nations.filter(d => {
            const geoNationProperty =  d.properties.ISO_A2!
            return geoNationProperty !== 'AQ';
          })}
          polygonLabel={polygonLabel}
          polygonCapColor={() => selectPolygonCapColor(currentGreenHouseGases)}
          polygonSideColor={polygonSideColor}
        />
      </Center>
    );
}

export default Presenter

import {RefObject} from "react";
import {GlobeData} from "../../models/globe-layer.types";
import {PolygonData} from "../../models/polygon-layer.types";
import {GeoDataInterface} from "../../data/geoData.interface";
import dynamic from "next/dynamic";
import {Center} from "@chakra-ui/layout";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false
});

interface Props {
    globe: RefObject<any>;
    countries: GeoDataInterface | undefined;
    polygonData: PolygonData;
    globeData: GlobeData;
}
interface GeoNationProperty {
  properties: any;
}
const Presenter = ({
  globe,
  countries,
  polygonData,
  globeData
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
          polygonCapColor={polygonCapColor}
          polygonSideColor={polygonSideColor}
        />
      </Center>
    );
}

export default Presenter

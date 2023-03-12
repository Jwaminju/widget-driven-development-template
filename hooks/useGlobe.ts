import {useEffect, useRef, useState} from "react";
import {GlobeData} from "../models/globe-layer.types";
import { PolygonData } from "../models/polygon-layer.types";
import {GeoDataInterface} from "../data/geoData.interface";
import GeoData from '../data/ne_110m_admin_0_countries.json';

const initialGlobeData: GlobeData = {
  containerData: {
    width: 500,
    height: 500,
    backgroundColor: '#000',
  },
  globeLayerData: {
    globeImageUrl: "https://unpkg.com/three-globe@2.25.4/example/img/earth-dark.jpg",
    bumpImageUrl: "",
  }
}
const initialPolygonData: PolygonData = {
  polygonsData: [],
  polygonLabel: '',
  polygonCapColor: '#ffffaa',
  polygonSideColor: '#000'
};
const useGlobe = () => {
  const globe = useRef();
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [countries, setCountries] = useState<GeoDataInterface>(GeoData);
  const [globeData, setGlobeData] = useState<GlobeData>(initialGlobeData)
  const [polygonData, setPolygonData] = useState<PolygonData>(initialPolygonData);

  return {
    isSuccess,
    globe,
    countries,
    polygonData,
    globeData
  }
}

export default useGlobe;
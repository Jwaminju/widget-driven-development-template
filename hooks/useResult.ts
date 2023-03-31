import {auth, database} from "./useFirebase";
import {get, ref} from "firebase/database";
import {useState} from "react";
import {GameState} from "../models/gamestate.types";
import {calculateGreenHouseEffect, defaultGreenHouseGases, GasFactory} from "../models/greenhousegas";

export const useResult = () => {
  const [isDefeat, setIsDefeat] = useState(false);
  const [gasDifference, setGasDifference] = useState(0);
  get(ref(database, auth.currentUser?.uid)).then((snapshot) => {
    const gameState = snapshot.val() as GameState;
    if (!gameState.greenHouseGases) return;
    const defaultEffect = calculateGreenHouseEffect(defaultGreenHouseGases);
    const resultEffect = calculateGreenHouseEffect(GasFactory.deserializeGases(gameState.greenHouseGases));
    const result = resultEffect < defaultEffect ? false : true;
    setIsDefeat(result);
    setGasDifference((resultEffect - defaultEffect)/defaultEffect);
  })
  return {isDefeat, gasDifference};
}
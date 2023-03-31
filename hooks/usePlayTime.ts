import {onValue, ref, set} from "firebase/database";
import {auth, database} from "./useFirebase";
import {useEffect, useState} from "react";
import {ItemDataInterface} from "../models/items.interface";

const defaultActionCount = {
  "person": 1,
  "enterprise": 1,
  "country": 1
}
export const usePlayTime = () => {
  const playTimeRef = ref(database, auth.currentUser?.uid + "/playtime");
  const [playTime, setPlayTime] = useState(2023);
  const [actionCount, setActionCount] = useState(defaultActionCount);

  useEffect(() => {
    onValue(playTimeRef, (snapshot) => {
      const playtime = snapshot.val();
      if (playtime) {
        setPlayTime(playtime)
      }
    })
  }, []);

  const updatePlayTimeOnDB = (newPlayTime: number) => {
    set(ref(database, auth.currentUser?.uid + "/playtime"), newPlayTime);
  }
  const changePlayTime = (actionItem: ItemDataInterface) => {
    const actionType = actionItem.type;
    switch (actionType) {
      case "person":
        setActionCount((prevState) => {
          return {...prevState, person: 0}
        })
        break;
      case "enterprise":
        setActionCount(prevState => {
          return {...prevState, enterprise: 0}
        })
        break;
      case "country":
        setActionCount(prevState => {
          return {...prevState, country: 0}
        })
        break;
    }
    const totalCount = Object.values(actionCount).reduce((totalCount, count) => totalCount += count);
    if ((totalCount === 1 && actionCount.country === 1) || (totalCount === 0)) {
      updatePlayTimeOnDB(playTime + 1);
      setActionCount(defaultActionCount);
    }
  }

  return {playTime, changePlayTime}
}
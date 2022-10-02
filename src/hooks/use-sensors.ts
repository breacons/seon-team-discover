import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { Thermometer } from "@/interfaces/heater";
import { useMemo } from "react";
import { firebaseToArray } from "@/lib/firebase-transformers";

export const useSensors = (): { thermometers: null | Thermometer[] } => {
  console.log('calling sensors')
  useFirebaseConnect("sensors");

  const sensors = useSelector(
    (state: RootState) => state.firebase.ordered.sensors
  );

  const transformed: any = useMemo(() => {
    if (!sensors) {
      return null;
    }

    return firebaseToArray(sensors);
  }, [sensors]);

  console.log({sensors, transformed})

  return { thermometers: transformed };
};

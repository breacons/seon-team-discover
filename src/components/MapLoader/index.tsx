import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import If from "../If";
import CustomSpinner from "../CustomSpinner";
import { MAPS_KEY } from "@/lib/config";



export default function MapLoader({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={MAPS_KEY as string}
      onLoad={() => setLoaded(true)}
      libraries={["visualization"]}
    >
        <If
          condition={loaded}
          then={() => children}
          else={() => <CustomSpinner />}
          />
    </LoadScript>
  );
}

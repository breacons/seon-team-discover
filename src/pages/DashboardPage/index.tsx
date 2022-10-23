import {
  GoogleMap,
  HeatmapLayer,
  Circle,
  InfoBox,
} from "@react-google-maps/api";
import React, { useState, useMemo, useRef } from "react";
import mapConfig from "./map-config.json";
import Overlay from "./Overlay";
import styles from "./styles.module.less";

import { BounceLoader } from "react-spinners";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const baseLocations = [
  {
    ip: "185.86.56.253",
    time: "9 days ago",
    location: "Budapest, Hungary",
    lat: 47.54316365,
    lng: 19.01321411,
    radius: 4,
    note: "Laki otthon",
  },
  {
    ip: "207.22.105.252",
    time: "3 days ago",
    location: "Budaörs, Hungary",
    lat: 47.4349579,
    lng: 18.9130312,
    radius: 3,
    note: "Ikea",
  },
  {
    ip: "88.83.24.92",
    time: "2 days ago",
    location: "Budapest, Hungary",
    lat: 47.47294,
    lng: 19.05688,
    radius: 7,
    note: "Entremo",
  },
  {
    ip: "10.220.225.59",
    time: "16 hours ago",
    location: "Budapest, Hungary",
    lat: 47.53760125,
    lng: 19.10694122,
    radius: 5,
    note: "Pest Belvaros",
  },
];

const airport = {
  ip: "169.205.173.246",
  time: "4 hours ago",
  location: "Vecsés, Hungary",
  lat: 47.4095417,
  lng: 19.2650378,
  radius: 6,
  note: "Airport",
};

const london = {
  ip: "95.6.149.248",
  time: "12 min ago",
  location: "London, United Kingdom",
  lat: 51.2273219,
  lng: -0.1976474,
  radius: 35,
  note: "London",
};

const tokyo = {
    "ip": "47.135.251.178",
    "time": "1 min ago",
    "location": "Łobez, Poland",
    "lat": 53.636698,
    "lng": 15.59961,
    "radius": 28,
    "note": "Poland"
  };

const predictions = [
  {
    lat: 51.5073219,
    lng: -0.1276474,
    radius: 10,
    note: "London",
  },
  {
    lat: 48.2083537,
    lng: 16.3725042,
    radius: 3,
    note: "Vienna",
  },
  {
    lat: 43.7311424,
    lng: 7.4197576,
    radius: 5,
    note: "Monaco",
  },
  {
    lat: 41.8933203,
    lng: 12.4829321,
    radius: 5,
    note: "Rome",
  },
  {
    lat: 48.8534951,
    lng: 2.3483915,
    radius: 6,
    note: "Paris",
  },
  {
    lat: 47.48138955,
    lng: 19.14609413,
    radius: 8,
    note: "Budapest",
  },
];

const scenarios = {
  "1": {
    locations: baseLocations,
    nextScenario: "2",
    text: "Simulate Transaction",
    predictionDisabled: true,
    similarCount: 24920,
    confidence: 70
  },
  "2": {
    locations: [...baseLocations, airport],
    nextScenario: "3",
    text: "Simulate Transaction",
    predictions,
    similarCount: 15363,
    confidence: 86
  },
  "3": {
    locations: [...baseLocations, airport, london],
    nextScenario: "4",
    text: "Change Location",
    predictions,
    score: 91,
    scoreText: 'Likely physical presence of the user.',
    similarCount: 15363,
    confidence: 86
  },
  "4": {
    locations: [...baseLocations, airport, tokyo],
    predictions,
    nextScenario: "1",
    text: "Reset Timeline",
    score: 7,
    scoreText: 'Unlikely physical presence of the user.',
    similarCount: 15363,
    confidence: 86
  },
};

const defaultCenter = { lat: 47.522002, lng: 19.037267 };

export default function DashboardPage() {
  const [currentScenario, setCurrentScenario] = useState("1");
  const [predicationActive, setPredictionActive] = useState(false);

  const [center, setCenter] = useState(defaultCenter);

  const [zoom, setZoom] = useState(11);

  const mapRef = useRef<any>(null);

  const changeScenario = (newScenario) => {
    setCurrentScenario(newScenario);

    if (newScenario === "1") {
      setZoom(11);

      setTimeout(() => {
        setCenter(defaultCenter);

        setPredictionActive(false);
      }, 1000);
    }
  };

  const changePredictionActive = (active) => {
    if (!predicationActive && active) {
      setZoom(6);
      setPredictionActive(true);

      setTimeout(() => {
        setCenter({
          lat: 47.994679548593645,
          lng: 10.050450593750003,
        });
      }, 1000);
    }

    if (!active) {
      setPredictionActive(false);
    }
  };

  const [locations, predictions] = useMemo(() => {
    return [
      scenarios[currentScenario].locations,
      scenarios[currentScenario].predictions || [],
    ];
  }, [currentScenario]);

  const onMapChange = () => {
    if (mapRef.current) {
      const { center, zoom } = mapRef.current.state.map;
      const c = { lat: center.lat(), lng: center.lng() };
      console.log("in", { c, zoom });
      //   setCenter(c);
      //   setZoom(zoom);
    }
  };


  return (
    <div className={styles.container}>
      <Overlay
        scenario={scenarios[currentScenario]}
        changeScenario={changeScenario}
        predicationActive={predicationActive}
        setPredictionActive={changePredictionActive}
      />
      <div className={styles.mapContainer}>
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{ styles: mapConfig, disableDefaultUI: true }}
          onCenterChanged={onMapChange}
          onZoomChanged={onMapChange}
        >
          {locations.map((p) => (
            <Circle
              center={new google.maps.LatLng(p.lat, p.lng)}
              options={{
                strokeColor: "#46B5A9",
                strokeOpacity: 0.75,
                strokeWeight: 2,
                fillColor: "#46B5A9",
                fillOpacity: 0.5,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: 900 * p.radius,
                zIndex: 1,
              }}
            ></Circle>
          ))}

          {predicationActive &&
            predictions.map((p) => (
              <InfoBox
                position={new google.maps.LatLng(p.lat, p.lng)}
                options={{
                  closeBoxURL: "",
                  enableEventPropagation: true,
                  pixelOffset: new google.maps.Size(
                    -5 * p.radius,
                    -5 * p.radius
                  ),
                }}
              >
                <div style={{ opacity: 0.75, overflow: "visible" }}>
                  <div style={{}}>
                    <BounceLoader
                      color="#FF9300"
                      speedMultiplier={0.5}
                      size={10 * p.radius}
                    />
                  </div>
                  {/* <div style={{ fontSize: 16 }}>Hello, World!</div> */}
                </div>
              </InfoBox>
            ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export {};

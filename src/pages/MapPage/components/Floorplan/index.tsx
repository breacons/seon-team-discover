import React from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";
import baseMap from "./static/floorplan.svg";
import foregroundMap from "./static/floorplan-foreground-2.png";
import {Heater} from "@/interfaces/heater";


const ratio = 0.9;
const width = 1920 * ratio;
const height = 1080 * ratio;

const convertImage = (image) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [img] = useImage(image);
  return <Image image={img} width={width} height={height} />;
};

// import styles from './styles.module.less';

interface Props {
  heaters: Heater[]
}





export const FloorPlan = ({heaters}: Props) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        <Rect x={0} y={0} width={width} height={height} fill="#BDE887" />
        {/*{convertImage(baseMap)}*/}

        {heaters.map((heater) => (
          <Rect
            key={heater.id}
            x={0}
            y={1}
            width={width}
            height={height}
            // fill={"red"}
            fillPriority="radial-gradient" // 'color', 'pattern', 'linear-gradient', 'radial-gradient'
            fillRadialGradientStartPoint={{
              x: width * heater.x,
              y: height * heater.y,
            }}
            fillRadialGradientStartRadius={Math.max(70 * Math.min(heater.radius, 10), 0)}
            fillRadialGradientEndPoint={{
              x: width * heater.x,
              y: height * heater.y,
            }}
            fillRadialGradientEndRadius={Math.max(240 * Math.min(heater.radius, 10), 0)}
            fillRadialGradientColorStops={[
              0,
              "#FF7979",
              0.4,
              "rgba(243,195,72,0.7)",
              1,
              "rgba(203,238,168,0)",
            ]}
          />
        ))}


        {convertImage(foregroundMap)}
      </Layer>
    </Stage>
  );
};

export default FloorPlan;

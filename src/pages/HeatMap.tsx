import { type CSSProperties, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";

const ExampleHeatmapPropTypes = {
};

const onClick = (...args: any[]) => {
  console.log("onClick args: ", args);
};

interface Props {

}

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 37.774546,
  lng: -122.433523,
};

const onLoad = (heatmapLayer) => {
  console.log("HeatmapLayer onLoad heatmapLayer: ", heatmapLayer);
};

const onUnmount = (heatmapLayer) => {
  console.log("HeatmapLayer onUnmount heatmapLayer: ", heatmapLayer);
};

function ExampleHeatmap({ }: Props): JSX.Element {
  const data = useMemo(() => {
    return [
      new google.maps.LatLng(37.782, -122.447),
      new google.maps.LatLng(37.782, -122.445),
      new google.maps.LatLng(37.782, -122.443),
      new google.maps.LatLng(37.782, -122.441),
      new google.maps.LatLng(37.782, -122.439),
      new google.maps.LatLng(37.782, -122.437),
      new google.maps.LatLng(37.782, -122.435),
      new google.maps.LatLng(37.785, -122.447),
      new google.maps.LatLng(37.785, -122.445),
      new google.maps.LatLng(37.785, -122.443),
      new google.maps.LatLng(37.785, -122.441),
      new google.maps.LatLng(37.785, -122.439),
      new google.maps.LatLng(37.785, -122.437),
      new google.maps.LatLng(37.785, -122.435),
    ];
  }, []);

  return (
    <GoogleMap
      // optional
      id="heatmap-layer-example"
      // required to set height and width either through mapContainerClassName, either through mapContainerStyle prop
      mapContainerStyle={mapContainerStyle}
      // required
      zoom={13}
      // required
      center={center}
    >
      <HeatmapLayer
        // optional
        onLoad={onLoad}
        // optional
        onUnmount={onUnmount}
        // required
        data={[
          new google.maps.LatLng(37.782, -122.447),
          new google.maps.LatLng(37.782, -122.445),
          new google.maps.LatLng(37.782, -122.443),
          new google.maps.LatLng(37.782, -122.441),
          new google.maps.LatLng(37.782, -122.439),
          new google.maps.LatLng(37.782, -122.437),
          new google.maps.LatLng(37.782, -122.435),
          new google.maps.LatLng(37.785, -122.447),
          new google.maps.LatLng(37.785, -122.445),
          new google.maps.LatLng(37.785, -122.443),
          new google.maps.LatLng(37.785, -122.441),
          new google.maps.LatLng(37.785, -122.439),
          new google.maps.LatLng(37.785, -122.437),
          new google.maps.LatLng(37.785, -122.435),
        ]}
        options={{opacity: 1}}
      />
    </GoogleMap>
  );
}

ExampleHeatmap.propTypes = ExampleHeatmapPropTypes;

export default memo(ExampleHeatmap);

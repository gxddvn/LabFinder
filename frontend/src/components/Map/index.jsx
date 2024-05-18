import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import React from "react";


const Map = ({laboratories, lab_id}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCT3UTXi1lFNd3JGhI-11HLvQESoe0cjag",
  });
  const [center_pos, setCenterPos] = React.useState([49.21164762151411, 32.1786428703447]);
  const [zoom, setZoom] = React.useState(6);

  React.useEffect(() => {
    if (laboratories.length !== 0) {
      if(lab_id > 0) {
        setCenterPos(laboratories[lab_id-1]?.coordinates.split(', '));
        setZoom(15);
      }
      else {
        setCenterPos(laboratories[0].coordinates.split(', '))
        setZoom(11);
      }
    }
  }, [laboratories, lab_id])
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap zoom={zoom} center={{lat: parseFloat(center_pos[0], 10) , lng: parseFloat(center_pos[1], 10)}} mapContainerClassName='map-container'>
      {laboratories.length !== 0 && laboratories.map((lab, index) => (
        <MarkerF key={index} position={{lat: parseFloat(lab.coordinates.split(', ')[0]) , lng: parseFloat(lab.coordinates.split(', ')[1])}} />
      ))}
    </GoogleMap>
  );
};

export default Map;

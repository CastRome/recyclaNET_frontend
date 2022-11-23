import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// interface MapProps {
//   zoom: number;
//   center: {
//     lat: number;
//     lng: number;
//   };
//   className: string;
//   position: {
//     lat: number;
//     lng: number;
//   };
// }
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const containerStyle = {
  width: '500px',
  height: '500px',

  position: 'static',
};

//: MapProps
// sas string
export default function Map({ zoom, center, className, position }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const fixedCenter = useMemo(() => center, [center]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        top: 40,
        width: 500,
        height: 500,
        backgroundColor: 'lightblue',
      }}
    >
      <GoogleMap
        zoom={zoom}
        center={fixedCenter}
        style={{ width: '400px', height: '400px' }}
        mapContainerStyle={containerStyle}
        options={options}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}

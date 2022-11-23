import Map from '../../components/map';
import { useEffect, useState } from 'react';

const Info = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    //  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    setShow(true);
  }, []);

  return (
    <div>
      {!show ? null : (
        <Map
          zoom={14}
          center={{ lng: -74.1, lat: 4.643387 }}
          className={'none'}
          position={{ lng: -74.1, lat: 4.643387 }}
        ></Map>
      )}
    </div>
  );
};

export default Info;

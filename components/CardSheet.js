import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const CardSheet = () => {
  const [dataCard, setDataCard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callSheet();
  }, []);

  const callSheet = async () => {
    const token = localStorage.getItem('token');
    console.log('a', localStorage.getItem('token'));
    try {
      const { data } = await axios.get('http://localhost:8080/api/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      setDataCard(data.data);
      setLoading(false);

      //
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>please stand by</p>
      ) : (
        dataCard.map((item) => {
          return (
            <div key={item._id}>
              <Card data={item} id={item._id}></Card>;
            </div>
          );
        })
      )}
    </div>
  );
};

export default CardSheet;

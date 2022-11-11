import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Button } from '@mantine/core';
import Swal from 'sweetalert2';
import Router from 'next/router';

const CardSheet = ({ who }) => {
  const [dataCard, setDataCard] = useState({});
  const [loading, setLoading] = useState(true);

  const Toast2 = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const handleAcept = async (id) => {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log('a', localStorage.getItem('token'));
    try {
      const { data } = await axios.put(
        `https://recyclanet.herokuapp.com/api/requests/aceptar/${id}`,
        // `http://localhost:8080/api/requests/aceptar/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      callSheet();
      //

      Toast.fire({
        icon: 'success',
        title: 'Request acepted successfully',
      });
    } catch {
      Toast2.fire({
        icon: 'error',
        title: 'Ups an error happend.',
      });
    }
  };
  const handleFinish = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.put(
        `https://recyclanet.herokuapp.com/api/requests/complete/${id}`,
        //`http://localhost:8080/api/requests/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      callSheet();
      //

      Toast.fire({
        icon: 'success',
        title: 'Request created successfully',
      });
    } catch {
      Toast2.fire({
        icon: 'error',
        title: 'Ups an error happend.',
      });
    }
  };
  const handleClick = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.put(
        `https://recyclanet.herokuapp.com/api/requests/cancel/${id}`,
        //  `http://localhost:8080/api/requests/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      callSheet();
      //

      Toast.fire({
        icon: 'success',
        title: 'Request created successfully',
      });
    } catch {
      Toast2.fire({
        icon: 'error',
        title: 'Ups an error happend.',
      });
    }
  };
  useEffect(() => {
    const { pathname } = Router;
    console.log('pathname', pathname);
    callSheet();
  }, []);

  const callSheet = async () => {
    const token = localStorage.getItem('token');
    console.log('a', localStorage.getItem('token'));

    try {
      let stringURL = '';
      if (who === 'recycler') {
        stringURL = '/pending';
        const { pathname } = Router;
        console.log('pathname', pathname);
        if (pathname === '/requestprogress') {
          stringURL = '/progress';
        }
      } else {
        stringURL = '';
      }
      console.log(stringURL);
      const { data } = await axios.get(
        `https://recyclanet.herokuapp.com/api/requests${stringURL}`,
        // `http://localhost:8080/api/requests${stringURL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
            <div className="CardSheetContainer" key={item._id}>
              <Card data={item} id={item._id}></Card>
              {who === 'user' ? (
                item.state === 'pending' ? (
                  <Button
                    className="cancelButton"
                    onClick={() => {
                      handleClick(item._id);
                    }}
                    variant="gradient"
                    gradient={{ from: 'red', to: 'red', deg: 105 }}
                  >
                    cancelar
                  </Button>
                ) : null
              ) : item.state === 'pending' ? (
                <Button
                  className="cancelButton"
                  onClick={() => {
                    handleAcept(item._id);
                  }}
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                >
                  aceptar
                </Button>
              ) : item.state === 'in_progress' ? (
                <Button
                  className="cancelButton"
                  onClick={() => {
                    handleFinish(item._id);
                  }}
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'yellow', deg: 125 }}
                >
                  confirm recolection
                </Button>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CardSheet;

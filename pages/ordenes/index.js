import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Card from '../../components/Card';
import { Button } from '@mantine/core';
import Router from 'next/router';
const Orders = (props) => {
  const dataRequest = useSelector((state) => state.requestReducer.data);
  const handleRedirect = () => {
    const { pathname } = Router;
    Router.push('/requestlog');
    //
  };
  return (
    <div>
      <Header />
      {dataRequest.data ? (
        <div>
          <Card data={dataRequest.data.data} id={dataRequest.data.id} />
          <div className="ButtonContainer">
            <Button.Group>
              <Button
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                type="button"
                onClick={() => {
                  handleRedirect();
                }}
              >
                go to my request
              </Button>
            </Button.Group>
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <p>for some reasons, there is no order... so...</p>
      )}
    </div>
  );
};

export default Orders;

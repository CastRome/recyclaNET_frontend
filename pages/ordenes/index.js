import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Card from '../../components/Card';
import { Button } from '@mantine/core';
const Orders = (props) => {
  const dataRequest = useSelector((state) => state.requestReducer.data);

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
                type="submit"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="gradient"
                gradient={{ from: 'red', to: 'red' }}
                onClick={() => {
                  handleCancel(2);
                }}
              >
                Cancel
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

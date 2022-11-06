import CardSheet from '../../components/CardSheet';
import Header from '../../components/Header';
import { Button } from '@mantine/core';
import Router from 'next/router';
const requestLog = () => {
  const handleBack = () => {
    const { pathname } = Router;
    Router.push('/home');
  };
  return (
    <div>
      <Header />
      <Button
        onClick={() => {
          handleBack();
        }}
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 105 }}
        type="button"
      >
        Back
      </Button>
      <CardSheet />
    </div>
  );
};

export default requestLog;

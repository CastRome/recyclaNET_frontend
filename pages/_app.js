import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';
function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;

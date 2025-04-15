import React from 'react';
import { Provider } from 'react-redux';
import Map from './src/components/Map';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Map/>
    </Provider>
  );
};

export default App;

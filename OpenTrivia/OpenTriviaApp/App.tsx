import React from 'react';
import {View} from 'react-native';
import {Router} from './src/Router';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    // <Provider>
      <Router />
    // </Provider>
  );
}

export default App;

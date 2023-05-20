import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Screens/HomeScreen';
import ImageScreen from './Screens/ImageScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

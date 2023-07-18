/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar} from 'react-native';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';

import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/modules/welcome/Welcome';
import Login from './src/modules/login/Login';
import MainTab from './src/modules/mainTab/MainTab';
import ArticleDetail from './src/modules/articleDetails/ArticleDetail';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PageA"
          screenOptions={{
            cardStyle: {elevation: 1},
            
          }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}
          />
          <Stack.Screen name="Login" component={Login} options={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false
          }}/>
          <Stack.Screen name="MainTab" component={MainTab} options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS
          }} />
          <Stack.Screen name='ArticleDetail' component={ArticleDetail} options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

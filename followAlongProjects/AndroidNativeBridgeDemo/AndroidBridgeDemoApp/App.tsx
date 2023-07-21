/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NativePage from './src/native/NativePage';



function App(): JSX.Element {


  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <NativePage />



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;

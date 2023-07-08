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
import Transition from './src/anim/Transition';
import Rotation from './src/anim/Rotation';
import Scale from './src/anim/Scale';
import Fade from './src/anim/Fade';


function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={{ flex: 1}}>
      <Transition />
      <View style={{ height: 30}} />
      <Rotation />
      <View style={{ height: 30}} />
      <Scale />
      <View style={{ height: 30}} />
      <Fade />
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  }
});

export default App;

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
import AnimatedDecay from './src/anim/AnimatedDecay';
import AnimatedSpring from './src/anim/AnimatedSpring';
import AnimatedTiming from './src/anim/AnimatedTiming';
import AnimatedValueXY from './src/anim/AnimatedValueXY';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={{flex: 1}}
        >
        <Transition />
        <Rotation />
        <Scale />
        <Fade />
        <AnimatedDecay />
        <AnimatedSpring />
        <AnimatedTiming />
        <AnimatedValueXY />
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
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

function AnimationList(): JSX.Element {
  return (
    <ScrollView style={{flex: 1}}>
      <Transition />
      <Rotation />
      <Scale />
      <Fade />
      <AnimatedDecay />
      <AnimatedSpring />
      <AnimatedTiming />
      <AnimatedValueXY />
    </ScrollView>
  );
}

function SideTabs(): JSX.Element {
  return (
    <View style={[styles.root, styles.tabScreenRoot]}>
      <View style={styles.tabs}>
        <Text style={styles.textTab}>Home</Text>
      </View>
      <View style={styles.tabs}>
        <Text style={styles.textTab}>Info</Text>
      </View>
      <View style={styles.tabs}>
        <Text style={styles.textTab}>Bio</Text>
      </View>
      <View style={styles.tabs}>
        <Text style={styles.textTab}>Fab</Text>
      </View>
    </View>
  );
}

function App(): JSX.Element {
  const [showSideTab, setShowSideTab] = useState(true);

  const switContent = () => {
    setShowSideTab(!showSideTab);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Button
        title={showSideTab ? 'Show Animation List' : 'Show Side Tabs'}
        onPress={switContent}
      />
      {!showSideTab && <AnimationList />}
      {showSideTab && <SideTabs />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabScreenRoot: {
    justifyContent: 'center',
  },
  tabs: {
    height: 60,
    marginTop: 30,
    borderRadius: 50,
    backgroundColor: 'blue',
    overflow: 'hidden',
    alignContent: 'center',
    justifyContent: 'center'
    // marginStart: -50,
  },
  textTab: {
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

export default App;

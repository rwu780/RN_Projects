

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

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {


  return (
    <SafeAreaView style={styles.root}>
      <Text>Account Manager App</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  }
})

export default App;

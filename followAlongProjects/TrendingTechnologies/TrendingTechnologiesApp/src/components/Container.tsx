import {StatusBar, StyleSheet, Text, View, ViewStyle, ActivityIndicator} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { COLORS } from '../constants/color';

interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
}

const Container = ({children, backgroundColor = 'white'}: ContainerProps) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor}} >
      <StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

export default Container;

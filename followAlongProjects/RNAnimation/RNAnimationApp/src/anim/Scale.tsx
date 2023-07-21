import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default () => {
  const scale = useRef(new Animated.Value(1)).current;

  const onAnimated = () => {
    Animated.timing(scale, {
      toValue: 0.5,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.rect, {transform: [{scale: scale}]}]} />
      <Button title="缩放" onPress={onAnimated} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  rect: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    marginLeft: 60,
    marginTop: 60,
    marginBottom: 30,
  },
});

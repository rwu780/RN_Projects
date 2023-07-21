import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default () => {
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateValue = rotate.interpolate({
    inputRange: [0, 45],
    outputRange: ['0deg', '30deg'],
  })

  const onAnimated = () => {
    Animated.timing(rotate, {
      toValue: 45,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.rect, {transform: [{rotate: rotateValue}]}]} />
      <Button title="旋转" onPress={onAnimated} />
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

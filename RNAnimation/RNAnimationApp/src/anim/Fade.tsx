import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default () => {
  const opacity = useRef(new Animated.Value(1)).current;

  const onAnimated = () => {
    Animated.timing(
        opacity,
        {
            toValue: 0.1,
            duration: 1000,
            useNativeDriver: false
        }
    ).start()
  }

  return <View style={styles.root}>
    <Animated.View style={[styles.rect, { opacity: opacity}]} />
    <Button title='渐变' onPress={onAnimated} />
  </View>;
};

const styles = StyleSheet.create({
  root: {
    width: '100%'
  },
  rect: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    marginTop: 30,
    marginBottom: 30
  },

});

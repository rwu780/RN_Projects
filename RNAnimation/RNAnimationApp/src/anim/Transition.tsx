import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default () => {
  const marginStart = useRef(new Animated.Value(20)).current;

  const onAnimated = () => {
    Animated.timing(
        marginStart,
        {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false
        }
    ).start()
  }

  return <View style={styles.root}>
    <Animated.View style={[styles.rect, { marginStart: marginStart}]} />
    <Button title='平移' onPress={onAnimated} />
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

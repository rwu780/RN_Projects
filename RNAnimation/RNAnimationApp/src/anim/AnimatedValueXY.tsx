import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default () => {
  const vector = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const onAnimated = () => {
    Animated.timing(vector, {
      toValue: {x: 300, y: 400},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.rect,
          {
            marginStart: vector.x,
            marginTop: vector.y
          },
        //   {
        //     transform: [
        //       { translateX: marginValue},
        //     ],
        //   }
          // {
          //   position: 'absolute',
          //   left: marginValue,
          //   top: marginValue
          // },
        ]}
      />
      <Button title="平移" onPress={onAnimated} />
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
    marginStart: 15,
    marginTop: 30,
    marginBottom: 30,
  },
});

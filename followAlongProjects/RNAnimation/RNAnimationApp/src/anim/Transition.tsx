import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default () => {
  const marginValue = useRef(new Animated.Value(0)).current;

  const onAnimated = () => {
    Animated.timing(marginValue, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.rect,
          // {
          //   marginStart: marginValue,
          // },
          {
            transform: [
              { translateX: marginValue},
            ],
          }
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

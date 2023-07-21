import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default () => {
  const marginValue = useRef(new Animated.Value(0)).current;

  const onAnimated = () => {
    Animated.decay(marginValue, {
        velocity: 2, 
        deceleration: 0.990,
        useNativeDriver: false
    }).start()
    // Animated.timing(marginValue, {
    //   toValue: 200,
    //   duration: 1000,
    //   useNativeDriver: false,
    // }).start();
  };

  return (
    <View style={styles.root}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>Animated Decay</Text>
      </View>

      <Animated.View
        style={[
          styles.rect,
          {
            marginStart: marginValue,
          },
        ]}
      />
    
      <Button title="平移" onPress={onAnimated} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 20
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

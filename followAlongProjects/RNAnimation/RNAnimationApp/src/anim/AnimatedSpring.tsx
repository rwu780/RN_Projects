import React, {useRef} from 'react';
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default () => {
  const marginValue1 = useRef(new Animated.Value(0)).current;
  const marginValue2 = useRef(new Animated.Value(0)).current;
  const marginValue3 = useRef(new Animated.Value(0)).current;

  const onAnimated1 = () => {
    Animated.spring(
        marginValue1, 
        {
            toValue: 200,
            bounciness: 10,
            speed: 10,
            useNativeDriver: false,
        }).start();
  };

  const onAnimated2 = () => {
    Animated.spring(
        marginValue2, 
        {
            toValue: 200,
            tension: 40,
            friction: 1,
            useNativeDriver: false,
        }).start();
  };

  const onAnimated3 = () => {
    Animated.spring(
        marginValue3, 
        {
            toValue: 200,
            stiffness: 120,
            damping: 5,
            mass: 1.14,
            useNativeDriver: false,
        }).start();
  };

  return (
    <View style={styles.root}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>Animated Spring 1</Text>
      </View>

      <Animated.View
        style={[
          styles.rect,
          {
            marginStart: marginValue1,
          },
        ]}
      />

      <Button title="平移" onPress={onAnimated1} />

      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>Animated Spring 2</Text>
      </View>

      <Animated.View
        style={[
          styles.rect,
          {
            marginStart: marginValue2,
          },
        ]}
      />

      <Button title="平移" onPress={onAnimated2} />

      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>Animated Spring 3</Text>
      </View>

      <Animated.View
        style={[
          styles.rect,
          {
            marginStart: marginValue3,
          },
        ]}
      />

      <Button title="平移" onPress={onAnimated3} />
      
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 20,
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

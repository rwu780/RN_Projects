import React, {useEffect, useState, useRef} from 'react';
import {Image, StyleSheet, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import icon_heart from '../assets/icon_heart.png';
import icon_heart_empty from '../assets/icon_heart_empty.png';

type Props = {
    value: boolean;
    onValueChanged?: (value: boolean) => void;
    size?: number
}

export default ({value, onValueChanged, size = 20} : Props) => {

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current
    const alpha = useRef<Animated.Value>(new Animated.Value(0)).current
  const [showState, setShowState] = useState<boolean>(false);

  useEffect(() => {
    setShowState(value)

  }, [value])

  const onHeartPressed = () => {
    const newState = !showState
    setShowState(newState)
    onValueChanged?.(newState)

    if (newState) {
        const scaleAnim = Animated.timing(scale, {
            toValue: 2,
            duration: 300,
            useNativeDriver: false
        })
        alpha.setValue(1);
        const alphaAnim = Animated.timing(alpha, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
            delay: 200
        })
        Animated.parallel([scaleAnim, alphaAnim]).start()
    } else {
        scale.setValue(0)
        alpha.setValue(0)
    }

  }

  return (
    <TouchableOpacity onPress={onHeartPressed}>
      <Image
        source={showState ? icon_heart : icon_heart_empty}
        style={[styles.container, { width: size, height: size}]}
      />
      <Animated.View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 20,
        position: 'absolute',
        borderColor: '#ff2442',
        transform: [
            { scale: scale}
        ],
        opacity: alpha

      }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

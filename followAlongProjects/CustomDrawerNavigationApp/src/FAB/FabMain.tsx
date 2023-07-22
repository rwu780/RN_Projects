import {
  Text,
  View,
  StyleSheet,
  ImageStyle,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS} from '../constants';
import {useReducer, useState} from 'react';
import {
    Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableHighlight} from 'react-native-gesture-handler';

const FAB_SIZE = 54;
const {width} = Dimensions.get('window');

const circleScale = Math.round(width / FAB_SIZE, 1);
const icon = require('./icon_close_modal.png');

const circleSize = circleScale * FAB_SIZE;
const dist = circleSize / 2;
const middleDist = dist / 1.41;

const ActionButton = ({style}) => {
  return (
    <Animated.View style={[styles.actionBtn, style]} >
      <TouchableOpacity>
        <Image source={icon}/>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default () => {
  const icon = require('./icon_close_modal.png');

  const [open, toggle] = useReducer(s => !s, false);

  const progress = useDerivedValue(() => {
    return open ? withSpring(1) : withSpring(0);
  });

  const translation = useDerivedValue(() => {
    return open ? withSpring(1, { stiffness: 80, damping: 8}) : withSpring(0)  
  })

  const rotation = useDerivedValue(() => {
    return withTiming(open ? '0deg' : '135deg');
  }, [open]);

  const fabStyles = useAnimatedStyle(() => {
    const rotate = rotation.value;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.red, COLORS.dark],
    );
    return {
      transform: [
        {
          rotate,
        },
      ],
      backgroundColor,
    };
  });

  const scalingStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, circleScale]);
    return {
      transform: [
        {
          scale: scale,
        },
      ],
    };
  });

  const translationStyles = ((x, y, value) => {
    return useAnimatedStyle(() => {
        const translate = interpolate(
            translation.value,
            [0,1],
            [0,-value],
            {extrapolateLeft: Extrapolate.CLAMP}
        )
        if (x && y) {
            return {
                transform: [
                    {translateX: translate},
                    {translateY: translate}
                ]
            }
        } else if (x) {
            return {
                transform: [{translateX: translate}]
            }
        }
        return {
            transform: [{translateY: translate}]
        }
    })
  })

  return (
    <View style={styles.root}>
      <View style={styles.fabContainer}>
        <Animated.View style={[styles.expandingCircle, scalingStyles]} />

        <TouchableOpacity onPress={toggle} activeOpacity={0.7}>
          <Animated.View style={[styles.fabStyle, fabStyles]}>
            <Image source={icon} style={styles.fab} />
          </Animated.View>
        </TouchableOpacity>
        <ActionButton style={translationStyles(true, false, dist)} />
        <ActionButton style={translationStyles(false, true, dist)} />
        <ActionButton style={translationStyles(true, true, middleDist)} />
      </View>
    </View>
  );
};

const CircleStyle: ImageStyle = {
  width: FAB_SIZE,
  height: FAB_SIZE,
  borderRadius: FAB_SIZE / 2,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    //   justifyContent: 'center',
    //   alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 40,
    end: 40,
  },
  fabStyle: {
    ...CircleStyle,
    backgroundColor: COLORS.red,
  },
  fab: {
    width: 34,
    height: 34,
    transform: [
      {
        rotate: '0deg',
      },
    ],
  },
  expandingCircle: {
    ...CircleStyle,
    // transform: [{scale: 8}],
    position: 'absolute',
    zIndex: -1,
    backgroundColor: COLORS.red,
  },
  actionBtn: {
    ...CircleStyle,
    backgroundColor: COLORS.dark,
    position: 'absolute',
    zIndex: -1,
    // transform: [{
    //     translateX: -100
    // }]
  }
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {COLORS, TabScreensArray} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type CustomTabBarProp = {
  prop: BottomTabBarProps;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const MARGIN = 16;
const TAB_BAR_WIDTH = SCREEN_WIDTH - 2 * MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / 4;

export default ({prop}: CustomTabBarProp) => {
  const {state, descriptors, navigation} = prop;
  const {routes, index} = state;

  const [selectedBg, setSelectBg] = useState<string>(TabScreensArray[0].activeColor)

  const [translateX] = useState(new Animated.Value(0));
  const translateTab = (i: number) => {
    Animated.spring(translateX, {
      toValue: i * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(index);
  }, [index]);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.slidingTabContainer}>
        <Animated.View
          style={[
            styles.slidingTabContainer,
            
            {
                backgroundColor: selectedBg,
              transform: [
                {
                  translateX: translateX,
                },
              ],
            },
          ]}
        />
                <Animated.View
          style={[
            styles.slidingTab,
            {
              transform: [
                {
                  translateX: translateX,
                },
              ],
            },
          ]}
        />
        

      </View>
      {routes.map((route, tabIndex) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = index === tabIndex;

        const activeColor = options.tabBarActiveTintColor;
        const inActiveColor = options.tabBarInactiveTintColor;

        if (index === tabIndex) {

        }

        return (
          <TouchableOpacity
            style={styles.tabItem}
            key={label}
            onPress={() => {
                const newBg = !isFocused ? activeColor : inActiveColor
                setSelectBg(newBg || COLORS.white)
              navigation.navigate(route.name);
            }}>
            <TabIcon
              isFocused={isFocused}
              tabIndex={tabIndex}
              index={index}
              color={!isFocused ? activeColor : inActiveColor}
              label={label || ''}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabIcon = ({
  isFocused,
  tabIndex,
  color,
  label,
  index,
}: {
  isFocused: boolean;
  tabIndex: number;
  color: string;
  label: string,
  index: number,
}) => {
  const [translateY] = useState(new Animated.Value(0));
  const translateIcon = (val: number) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-20); // move up
    } else {
      translateIcon(0); // center
    }
  }, [index]);

  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
          {
            translateY: translateY,
          },
        ],
      }}>
                
      <View
        style={{
          backgroundColor: color,
          width: 24 + tabIndex,
          height: 24,
          borderRadius: 24 / (2 + (tabIndex % 2)),
        }}
      />
                  <Text
              style={{
                color: color,
                marginTop: 12
              }}>{`${label}`}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: 60,
    position: 'absolute',
    bottom: MARGIN,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    margin: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: COLORS.grey,
    alignItems: 'center',
  },
  slidingTab: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    bottom: 21,
    borderWidth: 4,
    borderColor: COLORS.gold,
  },
});

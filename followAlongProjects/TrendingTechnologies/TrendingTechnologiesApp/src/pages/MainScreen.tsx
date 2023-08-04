import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PopularScreen from './PopularScreen';
import TrendingScreen from './TrendingScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="popular"
        component={PopularScreen}
        options={{
          tabBarLabel: '最热',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons name={'whatshot'} size={26} style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="trending"
        component={TrendingScreen}
        options={{
          tabBarLabel: '趋势',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={'md-trending-up'} size={26} style={{color}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

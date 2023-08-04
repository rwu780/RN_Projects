import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Tab1 from './Tab1';
import Tab2 from './Tab2';

const TopTab = createMaterialTopTabNavigator();

const PopularScreen = () => {
  return (
    <TopTab.Navigator>
        <TopTab.Screen name='index1' component={Tab1} options={{
            title: 'RN'
        }} />
        <TopTab.Screen name='index2' component={Tab2} options={{
            title: 'Flutter'
        }} />

    </TopTab.Navigator>
  )
}

export default PopularScreen

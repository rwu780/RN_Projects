import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const toDrawerNav = () => {
        navigation.push('DrawerNav')
    }

    const toBottomNav = () => {
      navigation.push('BottomNav')
    }

    const toFabScreen = () => {
      navigation.push('FabMain')
    }

  return (
    <View style={styles.root}>
        
        <Text>Screen 1</Text>
        <Button title='Drawer Navigation With DrawerNavs' onPress={toDrawerNav} />
        <Button title='Drawer Navigation With BottomTab Navs' onPress={toBottomNav} />
        <Button title='Custom Fab' onPress={toFabScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

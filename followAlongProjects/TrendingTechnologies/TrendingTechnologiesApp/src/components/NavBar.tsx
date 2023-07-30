import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextButton from './TextButton';
import { COLORS } from '../constants/color';
import Divider from './Divider';

interface NavBarProps {
  title: string;
  rightString: string;
  onRightClicked: () => void;
}

const NavBar = ({title, rightString, onRightClicked}: NavBarProps) => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.headerTxt} >{title}</Text>
      <TextButton text={'注册'} onClick={onRightClicked} buttonStyle={styles.optionMenu} textStyle={styles.optionTxt}  />
    </View>

  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44
  },
  optionMenu: {
    position: 'absolute',
    right: 20
  },
  headerTxt: {
    fontSize: 20,
    color: COLORS.black
  },
  optionTxt: {
    fontSize: 18
  }
});

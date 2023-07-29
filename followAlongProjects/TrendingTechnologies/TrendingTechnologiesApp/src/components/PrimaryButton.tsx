import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/color';

interface PrimaryButton {
  text: string;
  onClick: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton = ({text, onClick, buttonStyle, textStyle}: PrimaryButton) => {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    padding: 12,
    margin: 20,
    marginTop: 30,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  
});

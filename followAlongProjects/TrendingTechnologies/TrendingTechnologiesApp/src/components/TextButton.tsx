import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/color';

interface TextButton {
  text: string;
  onClick: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const TextButton = ({text, onClick, buttonStyle, textStyle}: TextButton) => {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 12,
    margin: 20,
  },
  text: {
    color: COLORS.primary,
    fontSize: 20,
  },
});

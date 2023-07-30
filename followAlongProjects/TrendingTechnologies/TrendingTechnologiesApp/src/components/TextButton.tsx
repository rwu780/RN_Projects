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
  activeOpacity?: number,
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const TextButton = ({text, onClick, buttonStyle, textStyle, activeOpacity = 0}: TextButton) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onClick} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  text: {
    color: COLORS.primary,
    fontSize: 20,
  },
});

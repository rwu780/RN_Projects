import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Divider from './Divider';

interface Input {
  label: string;
  placeHolder?: string;
  value: string,
  shortLine: boolean;
  secureTxt?: boolean;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle
}

export const Input = ({
  label,
  placeHolder = '',
  secureTxt = false,
  value,
  onChangeText,
  shortLine = false,
  labelStyle
}: Input) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={[styles.label, labelStyle || {}]}>{label}</Text>
        <TextInput
          placeholder={placeHolder}
          value={value}
          secureTextEntry={secureTxt}
          autoCapitalize="none"
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
      <Divider dividerStyle={{ marginLeft: shortLine ? 20 : 0}} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  label: {
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 16,
    width: 90
  },
  input: {
    flex: 1,
    marginEnd: 15,
  }
});

import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  Vibration,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../assets/color';

interface TextInputProps {
  placeHolder?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  editable?: boolean;
}

export const Input: React.FC<TextInputProps> = ({
  placeHolder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  editable = true,
}) => {
  return (
    <TextInput
      placeholder={placeHolder}
      value={value}
      editable={editable}
      style={[styles.root, inputStyle]}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 12,
    borderColor: COLORS.md_theme_light_primaryContainer,
    height: 50,
    fontSize: 16,
    borderWidth: 2,
    backgroundColor: 'white',
    marginBottom: 20
  },
});

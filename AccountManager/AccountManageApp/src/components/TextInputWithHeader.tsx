import {StyleSheet, TextInput, View, Text} from 'react-native';
import { GlobalStyles } from '../theme/styles';

interface TextInputWithHeaderProps {
  titleText: string;
  defaultText: string;
  onTextChanged(text: string): void;
  rootStyle: Object
}

export default ({
  titleText,
  defaultText,
  onTextChanged,
  rootStyle
}: TextInputWithHeaderProps) => {
  return (
    <View style={[stlyes.root, rootStyle]}>
      <Text style={stlyes.titleText}>{titleText}</Text>
      <TextInput
        value={defaultText}
        onChangeText={text => onTextChanged(text)}
        style={stlyes.inputType}
        maxLength={20}
      />
    </View>
  );
};

const stlyes = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'column'
    },
    titleText: {
        width: '80%',
        fontSize: 12,
        color: GlobalStyles.colors.textPasswordColor,
    },
    inputType: {
        height: 40,
        backgroundColor: GlobalStyles.colors.primaryBackgroundColor,
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: GlobalStyles.colors.textPrimaryColor
    }
});

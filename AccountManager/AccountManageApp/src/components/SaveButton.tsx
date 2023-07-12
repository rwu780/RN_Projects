import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { GlobalStyles } from '../theme/styles';

interface SaveButtonProps {
  text: string;
  onClick(): void;
  rootStyle?: Object;
}

export default ({text, onClick, rootStyle}: SaveButtonProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.root, rootStyle]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 44,
        backgroundColor: GlobalStyles.colors.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontSize: 16,
        color: GlobalStyles.colors.whiteTextColor,
        fontWeight: 'bold'
    }

});

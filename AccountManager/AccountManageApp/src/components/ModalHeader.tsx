import {
  View,
  Switch,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles} from '../theme/styles';

interface ModalHeaderProps {
  isModify: boolean;
  onIconClick(): void;
}

export default ({isModify, onIconClick}: ModalHeaderProps) => {
  const icon_close_modal = require('../assets/icon_close_modal.png');

  return (
    <View style={styles.headerStyle}>
      <Text style={styles.titleText}>{isModify ? 'Modify' : 'New'}</Text>
      <TouchableOpacity onPress={onIconClick} style={styles.closeButton}>
        <Image source={icon_close_modal} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    color: GlobalStyles.colors.textPrimaryColor,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 6,
  },
  img: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

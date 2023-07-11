import {View, Switch, StyleSheet, Text} from 'react-native';
import {GlobalStyles} from '../theme/styles';

interface ScreenHeaderProps {
  switchState: boolean;
  setSwitchState(): void;
}

export default ({switchState, setSwitchState}: ScreenHeaderProps) => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.titleText}>Manage Accounts</Text>
      <Switch style={styles.switchStyle} value={switchState} onChange={setSwitchState} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: 46,
    backgroundColor: GlobalStyles.colors.cardBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    color: GlobalStyles.colors.textPrimaryColor,
    fontWeight: 'bold',
  },
  switchStyle: {
    position: 'absolute',
    right: 12,
  },
});

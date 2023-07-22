import {Text, View, StyleSheet, Button} from 'react-native';
import DrawerNav from './DrawerNav';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Home from './screens/Home';
import {useNavigation} from '@react-navigation/native';
import Profile from './screens/Profile';
import { COLORS, ScreensArray, constant } from '../constants';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();

export default () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (<Drawer.Navigator useLegacyImplementation={false}
    screenOptions={{
      drawerType: 'slide',
      overlayColor: 'transparent',
      drawerStyle: styles.drawerStyle,
      drawerActiveBackgroundColor: COLORS.primary, // active background color
      drawerItemStyle: styles.drawerItemStyle, // item style
      drawerActiveTintColor: COLORS.black, // active text color
      drawerLabelStyle: styles.drawerLabelStyles // label style
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    { ScreensArray.map((item, index) => {
      return <Drawer.Screen key={index} name={item.route} component={item.component} options={{
        item,
        
      }} />
    })}
  </Drawer.Navigator>);
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerStyle: {
    width: 240,
  },
  drawerItemStyle: {
    borderRadius: constant.borderRadius
  },
  drawerLabelStyles: {
    fontSize: constant.textFontSize,
  }
});

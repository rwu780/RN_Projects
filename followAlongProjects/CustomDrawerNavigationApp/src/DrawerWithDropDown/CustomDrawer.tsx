import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Container} from './Container';
import {Row} from './Row';
import {COLORS, constant, drawerMenu} from '../constants';
import {
  DrawerNavigationState,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {DrawerItemList} from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {useState} from 'react';

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default (props: Props) => {
  const navigation = useNavigation();

  const [menuIndex, setMenuIndex] = useState(-1);

  return (
    <Container>
      {/* {profile header} */}
      <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
        <View style={styles.headerStyle}>
          <View style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>James</Text>
            <Text>RN Newbie</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      {/* Drawer List */}
      <DrawerItemList {...props} />
      {/* Menu */}
      {drawerMenu.map((item, index) => {
        return (
          <View key={index} style={[styles.menu, { backgroundColor: item.bg + '99'}]}>
            <TouchableOpacity onPress={() => {
                // LayoutAnimation.easeInEaseOut()
                LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'scaleY'))
                setMenuIndex(index)}} activeOpacity={0.8}>
              <Row style={styles.item}>
                <Text style={[styles.menuTxt, {color: menuIndex === index ? COLORS.black : COLORS.grey}]}>{item.title}</Text>
              </Row>
            </TouchableOpacity>
            {menuIndex === index && (
              <View>
                {item.menuList.map((subitem, subindex) => {
                  return (
                    <TouchableOpacity key={subindex}>
                      <View style={[styles.subItem, { backgroundColor: item.bg}]}>
                        <Text>{subitem.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </Container>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: constant.SPACING,
  },
  headerStyle: {
    padding: constant.SPACING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.yellow,
    borderRadius: 25,
  },
  name: {
    fontSize: constant.titleFontSize,
  },
  menu: {
    backgroundColor: '#ccc',
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderRadius: constant.borderRadius,
  },
  item: {
    paddingHorizontal: constant.SPACING / 1.5,
    paddingVertical: constant.SPACING / 1.2,
  },
  menuTxt: {
    fontSize: constant.textFontSize,
    paddingHorizontal: constant.SPACING,
  },
  subItem: {
    paddingHorizontal: constant.SPACING,
    paddingVertical: constant.SPACING / 1.5,
  },
});

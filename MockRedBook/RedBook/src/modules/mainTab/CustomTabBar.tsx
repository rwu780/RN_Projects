import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import icon_tab_publish from '../../assets/icon_tab_publish.png';

type CustomTabBar = {
  prop: BottomTabBarProps;
  launchPublish(): void;
};

export default ({prop, launchPublish}: CustomTabBar) => {
  const {state, descriptors, navigation} = prop;
  const {routes, index} = state;

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route: any, i: number) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = index === i;

        if (i === 2) {
          return (
            <View style={styles.tabItem} key={label}>
              <TouchableOpacity
                // style={styles.tabItem}

                onPress={launchPublish}>
                <Image
                  source={icon_tab_publish}
                  style={styles.icon_tab_publish}
                />
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <View style={styles.tabItem} key={label}>
              <TouchableOpacity
                // style={styles.tabItem}

                onPress={() => {
                  navigation.navigate(route.name);
                }}>
                <Text
                  style={{
                    fontSize: isFocused ? 18 : 16,
                    color: isFocused ? '#333' : '#999',
                    fontWeight: isFocused ? 'bold' : 'normal',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    height: Platform.OS === 'ios' ? 67 : 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});

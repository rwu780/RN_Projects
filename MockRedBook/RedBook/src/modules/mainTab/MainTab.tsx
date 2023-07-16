import {Image, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse
} from 'react-native-image-picker';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

const BottomTab = createBottomTabNavigator();

import icon_tab_home from '../../assets/icon_tab_home_normal.png';
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
import icon_tab_shop from '../../assets/icon_tab_shop_normal.png';
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
import icon_tab_message from '../../assets/icon_tab_message_normal.png';
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
import icon_tab_mine from '../../assets/icon_tab_mine_normal.png';
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';
import CustomTabBar from './CustomTabBar';

export default () => {
  type TabRoute = 'Home' | 'Shop' | 'Message' | 'Mine' | 'Publish';

  const getImageIconBasedOnRoute = (focused: boolean, routeName: TabRoute) => {
    let img;
    switch (routeName) {
      case 'Home':
        return focused ? icon_tab_home_selected : icon_tab_home;
      case 'Shop':
        return focused ? icon_tab_shop_selected : icon_tab_shop;
      case 'Message':
        return focused ? icon_tab_message_selected : icon_tab_message;
      case 'Mine':
        return focused ? icon_tab_mine_selected : icon_tab_mine;
    }
  };

  const launchImagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    },
    (res: ImagePickerResponse) => {
        const { assets } = res;
        if (!assets?.length) {
            console.log('选择图片失败')
            return;
        }
        const {
            uri, width, height, fileName, fileSize, type
        } =  assets[0]
        console.log(
            `${uri}======${width}=======${height}=======${fileName}======${fileSize}========${type}`
        );
    }
    );
  };

  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        // 用系统提供 tabBar 和 tabIcon
        // screenOptions={({route}) => {
        //   return {
        //     tabBarIcon: ({focused, color, size}) => {
        //       let img = getImageIconBasedOnRoute(
        //         focused,
        //         route.name as TabRoute,
        //       );

        //       return (
        //         <Image
        //           style={{
        //             width: size,
        //             height: size,
        //             tintColor: color,
        //           }}
        //           source={img}
        //         />
        //       );
        //     },
        //   };
        // }}
        tabBar={props => (
          <CustomTabBar prop={props} launchPublish={launchImagePicker} />
        )}
    
        >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
          }}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{
            title: '购物',
          }}
        />
        <BottomTab.Screen
          name="Publish"
          component={Message}
          options={{
            title: '发布',
          }}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{
            title: '消息',
          }}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{
            title: '我',
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

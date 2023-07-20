import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  LayoutAnimation,
} from 'react-native';

import { remove } from '../../utils/Storage';

import icon_setting from '../../assets/icon_setting.png';
import icon_service from '../../assets/icon_service.png';
import icon_scan from '../../assets/icon_scan.png';
import icon_find_user from '../../assets/icon_find_user.png';
import icon_draft from '../../assets/icon_draft.png';
import icon_create_center from '../../assets/icon_create_center.png';
import icon_browser_history from '../../assets/icon_browse_history.png';
import icon_packet from '../../assets/icon_packet.png';
import icon_free_net from '../../assets/icon_free_net.png';
import icon_nice_goods from '../../assets/icon_nice_goods.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_coupon from '../../assets/icon_coupon.png';
import icon_wish from '../../assets/icon_wish.png';
import icon_red_vip from '../../assets/icon_red_vip.png';
import icon_community from '../../assets/icon_community.png';
import icon_exit from '../../assets/icon_exit.png';
import {useNavigation} from '@react-navigation/native';

const MENUS = [
  [{icon: icon_find_user, txt: '发现好友'}],
  [
    {icon: icon_draft, txt: '我的草稿'},
    {icon: icon_create_center, txt: '创作中心'},
    {icon: icon_browser_history, txt: '浏览记录'},
    {icon: icon_packet, txt: '钱包'},
    {icon: icon_free_net, txt: '免流量'},
    {icon: icon_nice_goods, txt: '好物体验'},
  ],
  [
    {icon: icon_orders, txt: '订单'},
    {icon: icon_shop_car, txt: '购物车'},
    {icon: icon_coupon, txt: '卡券'},
    {icon: icon_wish, txt: '心愿单'},
    {icon: icon_red_vip, txt: '小红书会员'},
  ],
  [
    {icon: icon_community, txt: '发现好友'},
    {icon: icon_exit, txt: '退出登录'},
  ],
];

const BOTTOM_MENUS = [
  {icon: icon_setting, txt: '设置'},
  {icon: icon_service, txt: '帮助'},
  {icon: icon_scan, txt: '扫一扫'},
];

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CONTENT_WIDTH = SCREEN_WIDTH * 0.8;

export interface SideMenuRef {
  show: () => void;
  hide: () => void;
}

export default forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const navigation = useNavigation();

  const show = () => {
    setVisible(true);
    setTimeout(() => {
      //   LayoutAnimation.linear();
      setOpen(true);
    }, 100);
  };

  const hide = () => {
    setOpen(false);

    setTimeout(() => {
      // LayoutAnimation.linear();
      setVisible(false);
    }, 300);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const onMenuItemPress = useCallback((item: any) => async () => {
    console.log(`${JSON.stringify(item)}`)
      if (item.txt === '退出登录') {
        hide()
        await remove('userInfo');
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
      }
    },
    []);

  const MenuItem = ({
    icon,
    txt,
    onPressed,
  }: {
    icon: any;
    txt: string;
    onPressed: (item: any) => void;
  }) => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
      },
      img: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      txt: {
        fontSize: 16,
        color: '#333',
        marginStart: 14,
      },
    });
    return (
      <TouchableOpacity style={styles.root} onPress={onPressed}>
        <Image source={icon} style={styles.img} />
        <Text style={styles.txt}>{txt}</Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            paddingTop: 72,
            paddingHorizontal: 28,
            paddingBottom: 12,
          }}>
          {MENUS.map((item, index) => {
            return (
              <View key={`${index}`}>
                {item.map((subItem, subIndex) => {
                  return (
                    <MenuItem
                      icon={subItem.icon}
                      txt={subItem.txt}
                      key={`${subIndex}`}
                      onPressed={onMenuItemPress(subItem)}
                    />
                  );
                })}
                <View style={styles.divider} />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.bottomLayout}>
          {BOTTOM_MENUS.map(item => {
            return (
              <TouchableOpacity key={item.txt} style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <Image style={styles.icon} source={item.icon} />
                </View>
                <Text style={styles.menuTxt}>{item.txt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType="fade">
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.root}>
          <View
            style={[styles.content, {marginLeft: open ? 0 : -CONTENT_WIDTH}]}>
            {renderContent()}
          </View>
          <TouchableOpacity style={styles.transparentSpace} onPress={hide} />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000C0',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
  },
  transparentSpace: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  bottomLayout: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 20,
  },
  menuItem: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  menuIcon: {
    width: 46,
    height: 46,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 23,
  },
  icon: {
    width: 26,
    height: 26,
  },
  menuTxt: {
    fontSize: 13,
    color: '#666',
    marginTop: 18,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
});

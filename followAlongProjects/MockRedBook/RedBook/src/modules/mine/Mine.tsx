import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  LayoutChangeEvent,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';

import { SideMenuRef } from './SideMenu';

import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import {ScrollView} from 'react-native-gesture-handler';
import MyNameCard from './MyNameCard';
import UserStore from '../../stores/UserStore';
import AccountInfo from './AccountInfo';
import {observer, useLocalStore} from 'mobx-react';
import MineStore from './MineStore';
import Empty from '../../components/Empty';
import HomeCard from '../home/HomeCard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SideMenu from './SideMenu';

const EMPTY_CONFIG = [
  {icon: icon_no_note, tips: '快去发布吧'},
  {icon: icon_no_collection, tips: '快去收藏作品吧'},
  {icon: icon_no_favorate, tips: '去点赞吧'},
];

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const {userInfo} = UserStore;

  const store = useLocalStore(() => {
    return new MineStore();
  });

  const sideMenuRef = useRef<SideMenuRef>(null)

  const [index, setIndex] = useState(0);

  const [bgImgHeight, setBgImgHeight] = useState<number>(400);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestAll();
  }, []);

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleBarLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuButton: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
        flex: 1,
      },
      menuIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
      sideMenu: {
        height: '100%',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      sideMenuImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        tintColor: 'white',
      },
    });
    return (
      <View style={styles.titleBarLayout}>
        <TouchableOpacity style={styles.menuButton} onPress={() => sideMenuRef.current?.show()}>
          <Image source={icon_menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenu}>
          <Image source={icon_shop_car} style={styles.sideMenuImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenu}>
          <Image source={icon_share} style={styles.sideMenuImg} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabs = (
    currentIndex: number,
    tabPress: (index: number) => void,
  ) => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
      },
      tabButton: {
        // flex: 1,
        paddingHorizontal: 14,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      line: {
        width: '100%',
        height: 2,
        backgroundColor: '#ff2442',
        borderRadius: 1,
        position: 'absolute',
        bottom: 6,
      },
      tabTxt: {
        fontSize: 17,
        color: '#999',
      },
      tabTxtSelected: {
        fontSize: 17,
        color: '#333',
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity onPress={() => tabPress(0)} style={styles.tabButton}>
          <Text
            style={currentIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
            {`笔记`}
          </Text>
          <View style={currentIndex === 0 ? styles.line : {}} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => tabPress(1)} style={styles.tabButton}>
          <Text
            style={currentIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
            {`收藏`}
          </Text>
          <View style={currentIndex === 1 ? styles.line : {}} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => tabPress(2)} style={styles.tabButton}>
          <Text
            style={currentIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
            {`赞过`}
          </Text>
          <View style={currentIndex === 2 ? styles.line : {}} />
        </TouchableOpacity>
      </View>
    );
  };

  const onNavigateToArticle = useCallback(
    (item: ArticleSimple) => () => {
      navigation.push('ArticleDetail', {id: item.id});
    },
    [],
  );

  const renderList = () => {
    const {noteList, collectionList, favorateList} = store;
    const currentList = [noteList, collectionList, favorateList][index];

    console.log(JSON.stringify(currentList));

    if (!currentList?.length) {
      return (
        <Empty
          icon={EMPTY_CONFIG[index].icon}
          tips={EMPTY_CONFIG[index].tips}
        />
      );
    }

    const styles = StyleSheet.create({
      listContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
      },
      item: {
        width: (SCREEN_WIDTH - 18) >> 1,
        backgroundColor: 'white',
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
      },
    });

    return (
      <View style={styles.listContainer}>
        {currentList.map((item, index) => {
          return (
            <View style={styles.item} key={`${item.id}-${index}`}>
              <HomeCard
                item={item}
                onPressed={onNavigateToArticle(item)}
                resizeAbleImage={false}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const {info} = store;

  return (
    <View style={styles.root}>
      <Image
        style={[styles.bgImg, {height: bgImgHeight + 48 + 48}]}
        source={icon_mine_bg}
      />
      {renderTitle()}

      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={store.refreshing} 
        onRefresh={() => {
          store.requestAll()
        }}
        />}>
        <View
          onLayout={(e: LayoutChangeEvent) => {
            const {height} = e.nativeEvent.layout;
            setBgImgHeight(height);
          }}>
          <MyNameCard userInfo={userInfo} />
          <AccountInfo info={info} />
        </View>
        {renderTabs(index, i => setIndex(i))}

        {renderList()}
      </ScrollView>
      <SideMenu ref={sideMenuRef} />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
});

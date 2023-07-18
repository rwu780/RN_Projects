import {useLocalStore} from 'mobx-react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import HomeStore from './HomeStore';
import React, {useCallback, useEffect, useState} from 'react';
import HomeCard from './HomeCard';
import {observer} from 'mobx-react';

import {FlowList} from '../../components/flowlist/FlowList.js';
import TitleLayout from './TitleLayout';
import CategoryListHeader from './CategoryListHeader';
import CategoryModal from './CategoryModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ArticleDetail from '../articleDetails/ArticleDetail';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const store = useLocalStore(() => {
    return new HomeStore();
  });

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);

  const onArticlePress = useCallback(
    (item: ArticleSimple) => () => {
        navigation.push('ArticleDetail', { id: item.id})
    },
    [],
  );

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <View style={styles.flatListItem}>
        <HomeCard
          item={item}
          onPressed={onArticlePress(item)}
        />
      </View>
    );
  };

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const loadMoreData = () => {
    store.requestHomeList();
  };

  const getMyList = store.categoryList.filter(i => i.isAdd);

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <TitleLayout
          currentIndex={tabIndex}
          onIndexClicked={index => setTabIndex(index)}
        />
      </View>
    );
  };

  const Footer = () => {
    return <Text style={styles.footerTxt}>没有更多数据了</Text>;
  };

  const Header = () => {
    return (
      <View style={styles.cateListContainer}>
        <CategoryListHeader
          myList={getMyList}
          allCategoryList={store.categoryList}
          onCategoryChange={category => {}}
        />
      </View>
    );
  };

  return (
    <View style={[styles.outsideContainer, {paddingTop: insets.top}]}>
      <View style={styles.root}>
        {renderTitle()}
        <FlatList
          style={styles.flatList}
          data={store.homeList}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, _) => `${item.id}`}
          extraData={[store.refreshing]}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-evenly',
          }}
          contentContainerStyle={styles.flatListContainer}
          refreshing={store.refreshing}
          onRefresh={refreshNewData}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreData}
          ListFooterComponent={Footer}
          ListHeaderComponent={Header}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  flatListContainer: {
    justifyContent: 'space-evenly',
  },
  flatListItem: {
    flex: 0.5,
    // width: SCREEN_WIDTH - 18 >> 1,
    marginStart: 6,
    marginBottom: 6,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  footerTxt: {
    width: '100%',
    fontSize: 12,
    color: '#999',
    marginVertical: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleLayout: {
    width: '100%',
  },
  cateListContainer: {
    width: '100%',
  },
});

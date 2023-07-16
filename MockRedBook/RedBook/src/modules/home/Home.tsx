import {useLocalStore} from 'mobx-react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import HomeStore from './HomeStore';
import React, {useEffect} from 'react';
import HomeCard from './HomeCard';
import { observer } from 'mobx-react';

export default observer(() => {
  const store = useLocalStore(() => {
    return new HomeStore();
  });

  useEffect(() => {
    store.requestHomeList();
  }, []);

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (<View style={styles.flatListItem}><HomeCard item={item} /></View>)
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.flatList}
        data={store.homeList}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-evenly'
        }}
        contentContainerStyle={styles.flatListContainer}
      />
      
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  flatListContainer: {
    paddingTop: 6,
    justifyContent: 'space-evenly'
  },
  flatListItem: {
    flex: 0.5,
    marginStart: 6,
    marginBottom: 6,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white'
  }
});

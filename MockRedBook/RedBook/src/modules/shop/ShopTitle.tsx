import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import icon_search from '../../assets/icon_search.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';

type Prop = {
    onSearchBarPressed: () => void
}

export default ({onSearchBarPressed}: Prop) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.searchLayout} onPress={onSearchBarPressed}>
        <Image style={styles.searchIcon} source={icon_search} />
        <Text style={styles.searchTxt}>{`商品`}</Text>
      </TouchableOpacity>
      <Image style={styles.menuIcon} source={icon_shop_car} />
      <Image style={styles.menuIcon} source={icon_orders} />
      <Image style={styles.menuIcon} source={icon_menu_more} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchLayout: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  searchTxt: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 6,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
});

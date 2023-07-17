import {View, StyleSheet, Image, Text} from 'react-native';
import React from 'react';

import icon_daily from '../../assets/icon_daily.png';
import icon_search from '../../assets/icon_search.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
    currentIndex: number,
    onIndexClicked(index: number): void
  }

export default ({currentIndex, onIndexClicked} : Props) => {

    const tabPress = (index: number) => {
        onIndexClicked(index)
    }

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image source={icon_daily} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.tabButton}>
        <TouchableOpacity onPress={() => tabPress(0)}>
          <Text style={currentIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>关注</Text>
          <View style={currentIndex === 0 ? styles.line : {}} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabButton}>
        <TouchableOpacity onPress={() => tabPress(1)}>
          <Text style={currentIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>发现</Text>
          <View style={currentIndex === 1 ? styles.line : {}} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabButton}>
        <TouchableOpacity onPress={() => tabPress(2)}>
          <Text style={currentIndex === 2 ? styles.tabTxtSelected: styles.tabTxt}>南京</Text>
          <View style={currentIndex === 2 ? styles.line : {}} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.searchButton}>
        <Image source={icon_search} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  dailyButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: 12,
    marginRight: 42
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingEnd: 12,
    marginStart: 42
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    marginTop: 6
    
  },
  tabTxt: {
    fontSize: 16,
    color: '#999'
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333'
  },
});

import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, LayoutAnimation} from 'react-native';

import icon_search from '../../assets/icon_search.png';
import icon_arrow from '../../assets/icon_arrow.png';
import ShopTitle from '../shop/ShopTitle';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

export default () => {
    const inputRef = useRef<TextInput>(null)
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [showBack, setShowBack] = useState<Boolean>(false);

  useEffect(() => {
    setTimeout(() => {
        LayoutAnimation.easeInEaseOut()
        setShowBack(true)
        inputRef.current?.focus()
    }, 100)
  }, []);

  const onBackPressed = () => {
    
    LayoutAnimation.easeInEaseOut()
    setShowBack(false);
    inputRef.current?.blur()
    setTimeout(() => {
        navigation.pop();

    }, 300)
    
  };

  return (
    <View style={styles.root}>
      <View style={styles.titleLayout}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPressed}>
            <Image style={styles.backIcon} source={icon_arrow} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.searchLayout}>
          <Image style={styles.searchIcon} source={icon_search} />
          <TextInput
            ref={inputRef}
            style={styles.searchTextInput}
            placeholder={`商品名`}
            placeholderTextColor={'#bbb'}
            
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchTxt}>搜索</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchLayout: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginLeft: 16
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
  searchButton: {
    height: 22,
    marginHorizontal: 12,
  },
  inputTxt: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 6,
  },
  searchTxt: {
    fontSize: 16,
    color: '#bbb',
    marginStart: 6,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
  backButton: {
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  searchTextInput: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 0
  }
});

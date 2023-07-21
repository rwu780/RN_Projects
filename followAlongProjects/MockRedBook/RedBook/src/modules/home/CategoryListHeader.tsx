import {ScrollView, StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import icon_arrow from '../../assets/icon_arrow.png';
import CategoryModal, { CategoryModalRef } from './CategoryModal';

type Props = {
  myList: Category[];
  allCategoryList: Category[];
  onCategoryChange(category: Category): void;
};

export default ({myList, allCategoryList, onCategoryChange}: Props) => {
  const [category, setCategory] = useState<Category>();
  const modalRef = useRef<CategoryModalRef>(null);

  const onCategoryPress = (category: Category) => {
    setCategory(category);
    onCategoryChange?.(category);
  };

  useEffect(() => {
    setCategory(myList[0]);
  }, []);

  const onOpenButtonClicked = () => {
    modalRef.current?.show()
  }


  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {myList.map((item: Category, index: number) => {
          const isSelected = item.name === category?.name;
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={`${item.name}-${index}`}
              onPress={() => onCategoryPress(item)}>
              <Text
                style={
                  isSelected ? styles.tabItemSelectedTxt : styles.tabItemTxt
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.open_button} onPress={onOpenButtonClicked}>
        <Image source={icon_arrow} style={styles.icon_arrow} />
      </TouchableOpacity>
      <CategoryModal ref={modalRef} categoryList={allCategoryList} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 36,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 6,
  },
  open_button: {
    width: 36,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_arrow: {
    width: 18,
    height: 18,
    transform: [{rotate: '-90deg'}],
  },
  scrollView: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  tabItem: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemSelectedTxt: {
    fontSize: 16,
    color: '#333',
	fontWeight: 'bold'
  },
});

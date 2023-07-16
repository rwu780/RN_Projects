import {Text, View, Image, StyleSheet} from 'react-native';
import React from 'react';

interface HomeCardProps {
    item: ArticleSimple
}

export default ({item}: HomeCardProps) => {
  return (
    <View style={styles.root}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <Text style={styles.titleTxt}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%'
    },
    itemImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    titleTxt: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 12,
        marginVertical: 4,
    },

})

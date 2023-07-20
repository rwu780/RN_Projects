import {Text, View, Image, StyleSheet} from 'react-native';
import React from 'react';
import ResizeImage from '../../components/ResizeImage';

import icon_heart from '../../assets/icon_heart.png'
import icon_heart_empty from '../../assets/icon_heart_empty.png'
import Heart from '../../components/Heart';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface HomeCardProps {
    resizeAbleImage?: boolean
    item: ArticleSimple,
    onPressed(): void
}

export default ({resizeAbleImage = true ,item, onPressed}: HomeCardProps) => {
  return (
    <View style={styles.root}>
        <TouchableOpacity onPress={onPressed}>
            
        { resizeAbleImage && <ResizeImage uri={item.image} />}
      {!resizeAbleImage && <Image source={{uri: item.image}} style={styles.itemImage} />}
      <Text style={styles.titleTxt}>{item.title}</Text>
      <View style={styles.nameLayout}>
        <Image style={styles.avatarImg} source={{ uri: item.avatarUrl}} />
        <Text style={styles.nameTxt}>{item.userName}</Text>
        <Heart value={item.isFavorite} onValueChanged={(value: boolean) => {}} />
        {/* <Image style={styles.heartImg} source={icon_heart_empty} /> */}
        <Text style={styles.countTxt}>{item.favoriteCount}</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
        // height: '100%'
    },
    itemImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    titleTxt: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 10,
        marginVertical: 4,
    },
    nameLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    avatarImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    nameTxt: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
        flex: 1

    },
    heartImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover'
    },
    countTxt: {
        fontSize: 14,
        color: '#999',
        marginLeft: 4
    }

})

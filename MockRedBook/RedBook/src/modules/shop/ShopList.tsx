import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import React from 'react';

type Prop = {
  data: GoodsSimple[];
  extraData: GoodsCategory[];
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_WIDTH = (SCREEN_WIDTH - 18) >> 1;

export default ({data, extraData}: Prop) => {
  const ListHeader = () => {
    const styles = StyleSheet.create({
      headerContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      categoryItem: {
        width: '20%',
        alignItems: 'center',
        paddingVertical: 16
      },
      itemImg: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      itemTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6

      }
    });

    return (
      <View style={styles.headerContainer}>
        {extraData.map((item, index) => {
          return (
            <View style={styles.categoryItem} key={`${index}`}>
              <Image source={{uri: item.image}} style={styles.itemImg} />
              <Text style={styles.itemTxt}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderItem = ({item, index}: {item: GoodsSimple; index: number}) => {
    return (
      <View style={styles.listItem}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        {!!item.promotion && (
          <Text style={styles.promotionTxt}>{item.promotion}</Text>
        )}
        <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 4}}>
          <Text style={styles.prefix}>
            ￥<Text style={styles.priceTxt}>{item.price}</Text>
            {'    '}
            {!!item.originPrice && (
              <Text
                style={
                  styles.originalPriceTxt
                }>{`原价 ${item.originPrice}`}</Text>
            )}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        extraData={extraData}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    width: ITEM_WIDTH,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 6,
    marginTop: 6,
  },
  itemImage: {
    width: ITEM_WIDTH,
    height: 200,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    marginTop: 6,
    color: '#333',
  },
  priceTxt: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  prefix: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
    textAlignVertical: 'bottom',
  },
  originalPriceTxt: {
    fontSize: 13,
    color: '#999',
    fontWeight: 'normal',
  },
  promotionTxt: {
    fontSize: 12,
    color: '#999',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#bbb',
    textAlign: 'center',
    marginTop: 4,
  },
});

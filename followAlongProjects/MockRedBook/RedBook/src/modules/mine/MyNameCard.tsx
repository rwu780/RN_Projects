import {Image, Pressable, StyleSheet, View, Text} from 'react-native';
import React from 'react';

import icon_add from '../../assets/icon_add.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_male from '../../assets/icon_male.png'
import icon_female from '../../assets/icon_female.png'

type Prop = {
  userInfo: any;
};

export default ({userInfo}: Prop) => {
  return (
    <View style={styles.root}>
      <View style={styles.avatarLayout}>
        <Image style={styles.avatarImg} source={{uri: userInfo.avatar}} />
        <Pressable style={styles.addIcon}>
          <Image source={icon_add} style={styles.addImg} />
        </Pressable>
        <View style={styles.nameLayout}>
          <Text style={styles.nameTxt}>{userInfo.nickName}</Text>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.idTxt}>
              {`小红书号: ${userInfo.redbookId}`}
            </Text>
            <Image source={icon_qrcode} style={styles.qrCode} />
          </View>
        </View>
      </View>
      <Text style={styles.descTxt}>{userInfo.desc}</Text>
      <View style={styles.genderImg}>
        <Image source={userInfo.sex === 'male' ? icon_male : icon_female} style={styles.genderIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  avatarLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  avatarImg: {
    width: 96,
    height: 96,
    resizeMode: 'cover',
    borderRadius: 48,
  },
  addIcon: {
    marginLeft: -28,
    marginBottom: 2,
  },
  addImg: {
    width: 28,
    height: 28,
  },
  nameLayout: {
    marginStart: 20,
    height: '100%',
    flex: 1,
  },
  nameTxt: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  idTxt: {
    fontSize: 12,
    color: '#bbb',
  },
  qrCode: {
    width: 12,
    height: 12,
    marginLeft: 6,
    tintColor: 'white',
  },
  descTxt: {
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 16,
  },
  genderImg: {
    width: 36,
    height: 24,
    backgroundColor: '#ffffff50',
    borderRadius: 12,
    marginTop: 12,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  genderIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain'
  }
});

import {Image, Pressable, StyleSheet, View, Text} from 'react-native';
import React from 'react';


import icon_setting from '../../assets/icon_setting.png'
import { TouchableOpacity } from 'react-native-gesture-handler';


type Prop = {
  info: any;
};

const InfoItem = ({name, count}: {name: string; count: number}) => {
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      paddingHorizontal: 14,
    },
    infoValue: {
        fontSize: 18,
        color: 'white'
    },

    infoLabel: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 8
    },
  });
  return (
    <View style={styles.root}>
      <Text style={styles.infoValue}>{count}</Text>
      <Text style={styles.infoLabel}>{name}</Text>
    </View>
  );
};

export default ({info}: Prop) => {
  return (
    <View style={styles.root}>
      <InfoItem name="关注" count={info.followCount} />
      <InfoItem name="粉丝" count={info.fans} />
      <InfoItem name="获赞与收藏" count={info.favorateCount} />
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.editTxt}>{`编辑资料`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Image style={styles.settingImg} source={icon_setting} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 30,
    marginEnd: 16,
    marginBottom: 36,
    alignItems: 'center',
  },
  infoButton: {
    height: 32,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16
  },
  editTxt: {
    fontSize: 14,
    color: '#ffffff',
  },
  settingImg: {
    width: 20,
    height: 20,
    tintColor: '#ffffff'
  },

});

import {StyleSheet, View, Text, Image} from 'react-native';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Prop = {
    avatarUrl: string,
    userName: string,
    onBackPressed(): void
}

export default ({avatarUrl, userName, onBackPressed} : Prop) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onBackPressed} style={styles.backButton}>
        <Image style={styles.backImg} source={icon_arrow} />
      </TouchableOpacity>
      {!!avatarUrl && <Image source={{uri: avatarUrl}} style={styles.avatarImg} />}
      <Text style={styles.usernameTxt}>{userName}</Text>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followTxt}>{`关注`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Image source={icon_share} style={styles.shareIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',

  },
  backButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20
  },
  avatarImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  usernameTxt: {
    fontSize: 14,
    color: '#333',
    marginLeft: 16,
    flex: 1
  },
  followButton: {
    height: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff2442',
    borderRadius: 16
  },
  followTxt: {
    paddingHorizontal: 16,
    fontSize: 12,
    color: '#ff2442'
  },
  shareButton: {
    marginHorizontal: 16

  },
  shareIcon: {
    width: 28,
    height: 28
  }
});

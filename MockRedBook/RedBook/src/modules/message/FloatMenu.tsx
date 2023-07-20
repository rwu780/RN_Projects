import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, StyleSheet, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import icon_group from '../../assets/icon_group.png';
import icon_create_group from '../../assets/icon_create_group.png';

export interface FloatMenuRef {
  show: (y: number) => void;
  hide: () => void;
}

export default forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [y, setY] = useState<number>(0);

  const show = (y: number) => {
    setY(y);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const renderMenus = () => {
    return (
      <View style={[styles.content, {top: y}]}>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={icon_group} style={styles.menuIcon} />
          <Text style={styles.menuTxt}>{`群聊广场`}</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuButton}>
          <Image source={icon_create_group} style={styles.menuIcon} />
          <Text style={styles.menuTxt}>{`创建群聊`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType="fade">
      <TouchableOpacity style={styles.root} onPress={hide}>
        {renderMenus()}
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: 170,
    position: 'absolute',
    right: 16,
  },
  menuButton: {
    flexDirection: 'row',
    height: 56,
    paddingStart: 20,
    alignItems: 'center',
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
  menuTxt: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  divider: {
    marginLeft: 20,
    marginRight: 16,
    height: 1,
    backgroundColor: '#eee',
  },
});

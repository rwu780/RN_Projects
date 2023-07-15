import { useEffect, useRef } from 'react';
import {Text,  StyleSheet, requireNativeComponent, View, ViewProps, NativeEventEmitter, NativeModules, findNodeHandle, UIManager, Image} from 'react-native';

export const avatarUri = 'https://upload.jianshu.io/users/upload_avatars/19435884/5c30151f-7756-4071-843e-6ee1c755a031.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240';

type NativeInfoViewGroupType = ViewProps | {
    // 自定义属性
    avatar: string,
    name: string,
    desc: string,
    onShapeChanged: (e:any) => void,

}

const NativeInfoViewGroup = requireNativeComponent<NativeInfoViewGroupType>('NativeInfoViewGroup');

export default () => {

  return (<NativeInfoViewGroup style={styles.infoView} >
    

    <View style={styles.content} >
        <Image style={styles.avatarImg} source={{ uri: avatarUri}} />
        <View style={styles.nameLayout}>
            <Text>Name</Text>
            <Text>Desc</Text>
        </View>
        </View>




  </NativeInfoViewGroup>);
};

const styles = StyleSheet.create({
  infoView: {
    width: '100%',
    flexDirection: 'row'
  },
  content: {
    width: '100%',
    height: 150,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10
  },
  avatarImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50
  },
  nameLayout: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16
  },
  nameTxt: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4
  },
  descTxt: {
    fontSize: 16,
    color: '#666',
    marginTop: 8
  }
});

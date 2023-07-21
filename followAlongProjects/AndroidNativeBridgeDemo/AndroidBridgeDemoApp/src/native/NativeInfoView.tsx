import { useEffect, useRef } from 'react';
import {StyleSheet, requireNativeComponent, View, ViewProps, NativeEventEmitter, NativeModules, findNodeHandle, UIManager} from 'react-native';

export const avatarUri = 'https://upload.jianshu.io/users/upload_avatars/19435884/5c30151f-7756-4071-843e-6ee1c755a031.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240';

type NativeInfoViewType = ViewProps | {
    // 自定义属性
    avatar: string,
    name: string,
    desc: string,
    onShapeChanged: (e:any) => void,

}

const NativeInfoView = requireNativeComponent<NativeInfoViewType>('NativeInfoView');

export default () => {

    const ref = useRef(null);
    const sendCommand = (command: string, params: any[]) => {
        const viewId = findNodeHandle(ref.current);

        // @ts-ignore
        const commands = UIManager.NativeInfoView.Commands[command].toString();
        
        UIManager.dispatchViewManagerCommand(viewId, commands, params);
    }

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.NativeInfoView)
        let eventListener = eventEmitter.addListener('onShapeChanged', event => {
            console.log(event.shape)
        })

        return () => {
            eventListener.remove();
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            sendCommand('setShape', ['round'])

        }, 3000)
    }, [])


  return (<NativeInfoView ref={ref} style={styles.infoView} avatar={avatarUri} name='Custom Name' desc='Desc'/>);
};

const styles = StyleSheet.create({
  infoView: {
    width: '100%',
    height: 150,
    backgroundColor: 'red'
  },
});

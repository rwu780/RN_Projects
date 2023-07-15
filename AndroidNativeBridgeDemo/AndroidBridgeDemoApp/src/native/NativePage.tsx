import {Button, View, NativeModules, Text, ScrollView} from 'react-native';
import NativeInfoView from './NativeInfoView';
import NativeInfoViewGroup from './NativeInfoViewGroup';

export default () => {
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Text>Trigger Native Modules</Text>
      </View>

      <View style={{margin: 20}} />

      <Button
        title="Open Gallery"
        onPress={() => {
          const {App} = NativeModules;

          App?.openGallery();
          App?.getVersionName().then((data: string) =>
            console.log(`version name=${data}`),
          );
        }}
      />

      <View style={{margin: 20}} />

      <Button
        title="Get Version Name"
        onPress={() => {
          const {App} = NativeModules;

          App?.getVersionName().then((data: string) =>
            console.log(`version name=${data}`),
          );
        }}
      />

      <View style={{margin: 20}} />

      <Button
        title="Get Native Constants"
        onPress={() => {
          const {App} = NativeModules;

          const {versionName, versionCode} = App;

          console.log(
            `version name=${versionName} ===== version code = ${versionCode}`,
          );
        }}
      />

      

      <View style={{height: 30, width: '100%', marginTop: 100, backgroundColor: 'blue'}} />
      <NativeInfoView />
      <View style={{height: 30, width: '100%', marginTop: 100, backgroundColor: 'blue'}} />
      <NativeInfoViewGroup />

      <View style={{height: 120, width: '100%', marginTop: 100, backgroundColor: 'blue'}} />
    </ScrollView>
  );
};

import {SafeAreaView, StyleSheet, Text, View, Linking} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';
import { helpURL } from '../constants/url';

const LoginPage = () => {
  const [credential, setCredential] = useState({
    userName: '',
    password: '',
  });

  const updateUserName = (input: string) => {
    setCredential(prevState => ({
      ...prevState,
      userName: input,
    }));
  };
  const updatePassword = (input: string) => {
    setCredential(prevState => ({
      ...prevState,
      password: input,
    }));
  };

  const onLoginClicked = () => {

  }

  const onHelpClicked = () => {
    Linking.openURL(helpURL)

  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Input
          label={'用户名'}
          placeHolder="请输入用户名"
          value={credential.userName}
          shortLine={true}
          onChangeText={updateUserName}
        />
        <Input
          label={'密码'}
          value={credential.password}
          placeHolder="请输入密码"
          shortLine={false}
          onChangeText={updatePassword}
          secureTxt={true}
        />
        <PrimaryButton text={'登录'} onClick={onLoginClicked} />
        <TextButton text={'查看帮助'} onClick={onHelpClicked} />
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1,
  },
});

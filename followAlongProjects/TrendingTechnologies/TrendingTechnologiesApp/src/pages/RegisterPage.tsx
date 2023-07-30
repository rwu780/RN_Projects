import {StyleSheet, Text, View, ActivityIndicator, Linking, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Input} from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';
import {helpURL} from '../constants/url';
import Container from '../components/Container';
import {COLORS} from '../constants/color';
import NavBar from '../components/NavBar';
import Divider from '../components/Divider';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useAppDispatch } from '../app/hooks';
import { registerUser } from '../app/auth/authActions';
import { useSelector } from 'react-redux';
import { loadingState, loginErrorState, registerStatus } from '../app/auth/loginSlice';

const RegisterPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const loading = useSelector(loadingState)
  const registrationStatus = useSelector(registerStatus)
  const error = useSelector(loginErrorState)

  const toLoginScreen = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (registrationStatus != null) {
      if (registrationStatus) {
        Alert.alert('Registratoin Status', "注册成功")
      } else {
        Alert.alert('Registratoin Status', error)
      }
    }
  }, [registrationStatus]);

  const [credential, setCredential] = useState<RegisterCredential>({
    userName: '',
    password: '',
    moocId: '11219992',
    orderNumber: '3553',
  });

  const setUserName = (text: string) => {
    setCredential(prevState => ({
      ...prevState,
      userName: text,
    }));
  };

  const setPassword = (text: string) => {
    setCredential(prevState => ({
      ...prevState,
      password: text,
    }));
  };

  const onRegisterClicked = () => {
    dispatch(registerUser(credential))
  };

  const onHelpClicked = () => {
    Linking.openURL(helpURL);
  };

  return (
    <Container>
      <NavBar title="注册" rightString="登录" onRightClicked={toLoginScreen} />
      <Divider />
      <View style={{flex: 1}}>
        <Input
          label={'用户名'}
          placeHolder="请输入用户名"
          value={credential.userName}
          shortLine={true}
          onChangeText={setUserName}
        />
        <Input
          label={'密码'}
          value={credential.password}
          placeHolder="请输入密码"
          shortLine={true}
          onChangeText={setPassword}
          secureTxt={true}
        />
        <Input
          label={'慕课网 ID'}
          value={credential.moocId}
          shortLine={true}
          editable={false}
          secureTxt={true}
          onChangeText={() => {}}
        />
        <Input
          label={'课程订单号'}
          value={credential.orderNumber}
          placeHolder="请输入密码"
          shortLine={false}
          onChangeText={() => {}}
          secureTxt={true}
          editable={true}
        />
        <PrimaryButton text={'注册'} onClick={onRegisterClicked} />
        <TextButton text={'查看帮助'} onClick={onHelpClicked} />

        <ActivityIndicator
          size={'large'}
          color={COLORS.primary}
          animating={loading}
        />
      </View>
    </Container>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({});

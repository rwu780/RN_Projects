import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking,
  StatusBar,
  ActivityIndicator,
  Alert,
  AlertButton,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input} from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';
import {helpURL} from '../constants/url';
import Container from '../components/Container';
import {COLORS} from '../constants/color';
import NavBar from '../components/NavBar';
import Divider from '../components/Divider';
import {increment, incrementByAmount, selectCount} from '../app/countSlice';
import {loadUser, login, registerUser} from '../app/auth/authActions';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {loadingState, loginErrorState, loginState} from '../app/auth/loginSlice';
import { load } from '../utils/Storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const loading: boolean = useAppSelector(loadingState);
  const loginError = useAppSelector(loginErrorState);
  const loginSuccess = useAppSelector(loginState);

  const [credential, setCredential] = useState<LoginCredential>({
    userName: '',
    password: '',
  });

  useEffect(() => {
    if (loginError) {
      const buttons: AlertButton[] = [
        {
          text: 'OK',
          onPress: resetInputs,
        },
      ];
      Alert.alert('Login Error', loginError, buttons);
    }
  }, [loginError]);

  useEffect(() => {
    getUserInfo();
    
  },[])

  useEffect(() => {
    if (loginSuccess) {
      navigation.replace('Home')
    }

  }, [loginSuccess])

  const getUserInfo = async () => {
    dispatch(loadUser())
  }

  const resetInputs = () => {
    setCredential({
      userName: '',
      password: '',
    });
  };

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
    dispatch(login(credential));
  };

  const onHelpClicked = () => {
    Linking.openURL(helpURL);
  };

  const onRegisterClicked = () => {
    navigation.replace('Register')
  };

  return (
    <Container backgroundColor={COLORS.white}>
      <NavBar
        title="登录"
        rightString="注册"
        onRightClicked={onRegisterClicked}
      />
      <Divider />
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

        <ActivityIndicator
          size={'large'}
          color={COLORS.primary}
          animating={loading}
        />
      </View>
    </Container>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  content: {
    paddingTop: 20,
    backgroundColor: COLORS.backgroundColor,
    flexGrow: 1,
  },
  indicator: {
    width: '100%',
    height: '100%',
  },
});

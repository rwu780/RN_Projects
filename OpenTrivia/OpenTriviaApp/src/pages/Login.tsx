import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Container} from '../components/Container';
import {COLORS} from '../assets/color';
import {CommonButton} from '../components/CommonButton';
import {Input} from '../components/TextInput';
import { useRoutes } from '../hooks/useRoutes';
import { RouteNames } from '../routes/index.routes';

const Login = () => {
  const [name, setName] = useState('');
  const { resetToRoute } = useRoutes()

  const onNameEntered = (text: string) => {
    setName(text);
  };

  const onLoginClicked = () => {
    resetToRoute(RouteNames.HOME)
  }

  return (
    <Container>
      <Text
        style={{
          flex: 1,
          color: COLORS.md_theme_light_primary,
          fontSize: 50,
          fontWeight: 'bold',
          marginTop: 150,
          textAlign: 'center',
        }}>
        Open Trivia
      </Text>

      <Input value={name} onChangeText={onNameEntered} placeHolder={`Please enter your name`} />
      <CommonButton title="Contine" onPress={onLoginClicked} buttonStyle={{ marginBottom: 100}}/>
    </Container>
  );
};

export default Login;

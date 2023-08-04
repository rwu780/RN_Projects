import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import {useAppSelector} from '../app/hooks';
import {userData} from '../app/auth/loginSlice';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const HomePage = () => {
  const userProfile: userProfile | null = useAppSelector(userData);

  return (
    <Container backgroundColor={'white'}>
      <Text>{userProfile?.userName}</Text>
      <Text>{userProfile?.imoocId}</Text>
      <Text>{userProfile?.data}</Text>
      <Text>{userProfile?.avatar}</Text>

      <MaterialIcons name={'whatshot'} size={26} style={{color: 'red'}} />
      <Ionicons name={'md-trending-up'} size={26} style={{color: 'red'}} />
      <Entypo name={'user'} size={26} style={{color: 'red'}} />
    </Container>
  );
};

export default HomePage;

const styles = StyleSheet.create({});

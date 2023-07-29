import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import LoginPage from './src/pages/LoginPage';


function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.root}>
      <LoginPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }

});

export default App;

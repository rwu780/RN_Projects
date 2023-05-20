import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import notifee, { EventType } from '@notifee/react-native';
import { displayNotification, scheduleNotification } from './notifications/Notification';

function App(): JSX.Element {

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("User dismissed", detail.notification)
          break;
        case EventType.PRESS:
          console.log("User pressed", detail.notification);
          break;
      }
    })

  }, [])

  function onDisplayNotification() {
    displayNotification("This is Header")
  }

  function scheduleNotificationHandler() {
    scheduleNotification("This is scheduled")

  }

  return (
    <SafeAreaView style={styles.screen}>
      <Pressable style={styles.buttonStyle} onPress={onDisplayNotification}>
        <Text style={styles.textStyle}>Send Notification</Text>
      </Pressable>
      <Pressable style={styles.buttonStyle} onPress={scheduleNotificationHandler}>
        <Text style={styles.textStyle}>Schedule Notification in 5 seconds</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: 'blue',
    padding: 30,
    marginBottom: 30
  },
  textStyle: {
    color: 'white'
  }
});

export default App;

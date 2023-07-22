import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/screens/Main';
import DrawerNav from './src/DrawerWithDropDown/DrawerNav';
import {ScreensArray} from './src/constants';
import BottomNav from './src/BottomNavigation/BottomNav';
import FabMain from './src/FAB/FabMain';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="DrawerNav" component={DrawerNav} />
          <Stack.Screen name="BottomNav" component={BottomNav} />
          <Stack.Screen name="FabMain" component={FabMain} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

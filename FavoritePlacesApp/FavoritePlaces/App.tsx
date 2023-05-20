import React from 'react';
import {StatusBar} from 'react-native';
import AllPlaces from './screens/AllPlaces';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import {Colors} from './assets/colors';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => {
                return (
                  <IconButton
                    iconName="add"
                    size={24}
                    color={tintColor!}
                    onPressed={() => {
                      navigation.navigate('AddPlace');
                    }}
                  />
                );
              },
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={() => ({
              title: 'Add a new Place',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

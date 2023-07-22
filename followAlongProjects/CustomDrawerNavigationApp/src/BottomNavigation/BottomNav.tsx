import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {TabScreensArray} from '../constants';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => {
  const randomValue = () => {
    return Math.floor(Math.random() * 100);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        tabBarLabelPosition: 'below-icon',
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
      }}
      tabBar={props => {
        return <CustomTabBar prop={props} />;
      }}>
      {TabScreensArray.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              title: item.label,
              tabBarActiveTintColor: item.activeColor,
              tabBarInactiveTintColor: item.inActiveColor
              // tabBarLabel: item.label,
            //   tabBarBadge: (index + 1) * randomValue(),
            //   tabBarIcon: ({color, size}) => {
            //     return (
            //       <View
            //         style={{
            //           backgroundColor: color,
            //           width: size + index,
            //           height: size,
            //           borderRadius: size / (2 + (index % 2)),
            //         }}
            //       />
            //     );
            //   },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

import React, {useState} from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, View, Image} from 'react-native';

// Screens
import News from '../screens/News';
import Sms from '../screens/Sms';
import Profile from '../screens/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import CustomHeader from './CustomHeader';

// Icons
const NewsTabIcon = ({focused, color}) => (
  <FontAwesome
    name="newspaper-o"
    size={focused ? 30 : 26}
    color={focused ? '#0096FF' : '#858EA9'}
  />
);

const SmsTabIcon = ({focused, color}) => (
  <AntDesign
    name="message1"
    size={focused ? 30 : 26}
    color={focused ? '#0096FF' : '#858EA9'}
  />
);

const ProfileIcon = ({focused, color}) => (
  <AntDesign
    name="user"
    size={focused ? 30 : 26}
    color={focused ? '#0096FF' : '#858EA9'}
  />
);

const getRouteName = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);
  if (routeName?.includes('Detail')) {
    return 'none';
  }
  return 'flex';
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SMS"
        component={Sms}
        options={{
          headerShown: true,
          title: 'Sms',
          headerTintColor: '#0096FF',
          headerLeft: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: true,
          title: 'Detail',
          headerTintColor: '#0096FF',
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Sms"
        screenOptions={{
          headerShown: true,
          headerTintColor: '#0096FF',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50,
            margin: 0,
            padding: 0,
          },

          tabBarItemStyle: {
            height: 50,
            marginHorizontal: 10,
            marginVertical: 'auto',
            borderRadius: 30,
          },
        }}>
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarIcon: NewsTabIcon,
            headerLeft: () => <CustomHeader />,
          }}
        />
        <Tab.Screen
          name="Sms"
          component={StackNavigator}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: SmsTabIcon,
            tabBarStyle: {display: getRouteName(route)},
            // tabBarBadge: 3,
            // tabBarBadgeStyle: {backgroundColor: '#0096FF'},
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ProfileIcon,
            headerLeft: () => <CustomHeader />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTab;

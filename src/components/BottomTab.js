import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Screens
import News from '../screens/News';
import Sms from '../screens/Sms';
import Profile from '../screens/Profile';

// Icons
const NewsTabIcon = ({focused, color}) => (
  <FontAwesome
    name="newspaper-o"
    size={focused ? 30 : 28}
    color={focused ? '#0096FF' : '#858EA9'}
  />
);

const SmsTabIcon = ({focused, color}) => (
  <AntDesign
    name="message1"
    size={focused ? 30 : 28}
    color={focused ? '#0096FF' : '#858EA9'}
  />
);

const ProfileIcon = ({focused, color}) => (
  <AntDesign
    name="user"
    size={focused ? 30 : 28}
    color={focused ? '#0096FF' : '#858EA9'}
  />
);

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            margin: 0,
            padding: 0,
          },

          tabBarItemStyle: {
            height: 50,
            marginHorizontal: 20,
            marginVertical: 5,
            borderRadius: 100,
          },
        }}>
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarIcon: NewsTabIcon,
          }}
        />
        <Tab.Screen
          name="Sms"
          component={Sms}
          options={{
            tabBarIcon: SmsTabIcon,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{tabBarIcon: ProfileIcon}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTab;

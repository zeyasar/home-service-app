import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import { FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor:'#8E3FFF' 
    }}
  >
    <Tab.Screen
      options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
            Home
          </Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
      name="home"
      component={HomeNavigation}
    />

    <Tab.Screen
      options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
            Booking
          </Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="bookmark-o" size={size} color={color} />
        ),
      }}
      name="booking"
      component={BookingScreen}
    />
    <Tab.Screen
      options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
            Profile
          </Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user" size={size} color={color} />
        ),
      }}
      name="profile"
      component={ProfileScreen}
    />
  </Tab.Navigator>
  )
}
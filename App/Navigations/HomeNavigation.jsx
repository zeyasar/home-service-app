import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessListByCategoryScreen from '../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  

  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown:false,
        }}
    >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="BusinessListByCategory" component={BusinessListByCategoryScreen} />
    <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
  </Stack.Navigator>
  )
}
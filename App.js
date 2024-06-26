/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './src/screen/Home';
import SplashScreen from './src/screen/SplashScreen';
import SearchScreen from './src/screen/Search';
import Menu from './src/screen/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="home-outline" color={color} size={size} />), headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="search-outline" color={color} size={size} />), headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Menu}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="person-outline" color={color} size={size} />), headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

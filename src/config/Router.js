import React from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import OnBoarding from '../modules/onboarding';
import HomeScreen from '../modules/home';
import Reservate from '../modules/reservate';
const AppNavigator = createStackNavigator(
  {
    OnBoarding: {
      screen: OnBoarding,
      navigationOptions: {
        header: null,
        swipeEnabled: false,
        gesturesEnabled: false,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        swipeEnabled: false,
        gesturesEnabled: false,
      },
    },
    Reservate: {
      screen: Reservate,
      navigationOptions: {
        header: null,
        swipeEnabled: false,
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Reservate',
  },
);

export default createAppContainer(AppNavigator);

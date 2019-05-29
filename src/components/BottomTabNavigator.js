// imports 
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

// Configs
const RouteConfig = {
  Test: {
    screen: List,
    navigationOptions: () => ({
      tabBarIcon: () => (
        <Icon
          name="md-home"
          color="red"
          size={25}
        />
      ),
    }),
  }
}
  
const BottomNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: '#6a51ae',
        inactiveTintColor: '#939393',
        showIcon: true,
        showLabel: true,
        labelStyle: {
        fontSize: 10,
    },
    style: {
        borderTopWidth: 1,
        borderTopColor: '#efefef',
        backgroundColor: '#fff',
        height: 56,
        },
    },
};
export default createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);
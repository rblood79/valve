/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator, NavigationEvents, } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import ScanButton from './src/components/ScanButton';
import Login from './src/pages/login';
import Home from './src/pages/home';
import Scan from './src/pages/scan';
import Detail from './src/pages/detail';
import List from './src/pages/list';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  stateLeft: {
    flex: 1,
    padding: 16,
  },
  stateRight: {
    flex: 1,
    padding: 16,
  },
  bigBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a51ae',
    height: 60,  
    width: 60,
    borderRadius: 30,
    marginTop:-20,
    borderWidth: 1,
    borderColor: '#41306c'
  },
})
//type Props = {};
//export default class App extends Component<Props> {


const HomeStack = createStackNavigator({
  HOME: { screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerMode: 'none',
    }),
  },
  
});

const ScanStack = createStackNavigator({
  SCAN: { 
    screen: Scan,
    navigationOptions: ({ navigation }) => ({
      title: 'CODE SCANNING',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        fontSize: 14,
        color:'#fff',
        borderWidth: 0
      },
      headerStyle: {
        backgroundColor: '#6a51ae',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#efefef',
        height: 48,
      },
      headerTintColor: '#41306c',
      headerLeft: (
        <View/>
        //<Icon name='ios-arrow-back' size={25} style={styles.stateLeft}/>
      ),
      headerRight: (
        <Icon name='ios-flash-off' size={25} style={styles.stateRight}/>
      ),
    }),
  },
  DETAIL: { 
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: 'SCAN DETAIL',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        fontSize: 14
      },
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        height: 48
      },
      headerTintColor: '#41306c',
      headerRight: (
        <View/>
      ),
    }),
  },
  
});

const ListStack = createStackNavigator({
  LIST: { 
    screen: List,
    navigationOptions: ({ navigation }) => ({
      title: 'SCAN LIST',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        fontSize: 14,
        color:'#fff',
      },
      headerStyle: {
        backgroundColor: '#6a51ae',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#efefef',
        height: 48
      },
      headerTintColor: '#41306c',
      headerLeft: (
        <View/>
        //<Icon name='ios-arrow-back' size={25} style={styles.stateLeft}/>
      ),
      headerRight: (
        <Icon name='ios-information-circle-outline' size={25} style={styles.stateRight}/>
      ),
    }),
  },
  DETAIL: { 
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: 'SCAN DETAIL',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        fontSize: 14
      },
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        height: 48
      },
      headerTintColor: '#41306c',
      headerRight: (
        <View/>
      ),
    }),
  },
  
});

const RouteConfig = {
  HOME: { 
    screen: HomeStack,
    navigationOptions: () => ({
      //header: null,
      //headerMode: 'none',
      tabBarVisible: false,
    }),
  },
  SCAN: { 
    screen: ScanStack,
    navigationOptions: () => ({
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.navigate('SCAN')
        //navigation.navigate('SCAN', { qrvalue: '' })
        //defaultHandler();
      },
      tabBarButtonComponent: ({navigation}) => (
        <ScanButton/>
      ),
    }),
  },
  LIST: { 
    screen: ListStack,
    navigationOptions: () => ({
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.navigate('LIST')
        //defaultHandler();
      },
      
    }),
  },
  
};

const BottomNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      
      if (routeName === 'HOME') {
        iconName = `md-home`;
      } else if (routeName === 'SCAN') {
        iconName = `ios-qr-scanner`;
      } else if (routeName === 'LIST') {
        iconName = `ios-albums`;
      } else if (routeName === 'SETTING') {
        iconName = `settings`;
      }
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  }),
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

//
const BottomTabNav = createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);
const AppContainer = createAppContainer(BottomTabNav);

export default class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <AppContainer/>
    )
  }
}

//export default createAppContainer(createBottomTabNavigator(RouteConfig, BottomNavigatorConfig));

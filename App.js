/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
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
    marginTop: -20,
    borderWidth: 1,
    borderColor: '#41306c'
  },
})
//type Props = {};
//export default class App extends Component<Props> {


const HomeStack = createStackNavigator({
  HOME: {
    screen: Home,
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
      title: '밸브스캔',
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontSize: 14,
        color: '#fff',
        borderWidth: 0
      },
      headerStyle: {
        backgroundColor: '#d1121a',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#efefef',
        height: 48,
      },
      headerTintColor: '#d1121a',
      headerLeft: (
        <View />
        //<Icon name='ios-arrow-back' size={25} style={styles.stateLeft}/>
      ),
      headerRight: (
        <Icon name='ios-flash' size={25} style={styles.stateRight} />
      ),
    }),
  },
  DETAIL: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: '상세정보',
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
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
      headerTintColor: '#fff',
      headerRight: (
        <View />
      ),
    }),
  },

});

const ListStack = createStackNavigator({
  LIST: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      title: '스캔목차',
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontSize: 14,
        color: '#fff',
      },
      headerStyle: {
        backgroundColor: '#d1121a',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#efefef',
        height: 48
      },
      headerTintColor: '#fff',
      headerLeft: (
        <View />
        //<Icon name='ios-arrow-back' size={25} style={styles.stateLeft}/>
      ),
      headerRight: (
        <Icon name='ios-information-circle-outline' size={25} style={styles.stateRight} />
      ),
    }),
  },
  DETAIL: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: '상세정보',
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontSize: 14,
        color: '#fff',
      },
      headerStyle: {
        backgroundColor: '#d1121a',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        height: 48
      },
      headerTintColor: '#fff',
      headerRight: (
        <View />
      ),
    }),
  },

});

const RouteConfig = {
  시작: {
    screen: HomeStack,
    navigationOptions: () => ({
      //header: null,
      //headerMode: 'none',
      tabBarVisible: false,
    }),
  },
  스캔: {
    screen: ScanStack,
    navigationOptions: () => ({
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.navigate('SCAN')
        //navigation.navigate('SCAN', { qrvalue: '' })
        //defaultHandler();
      },
      /*tabBarButtonComponent: ({navigation}) => (
        <ScanButton/>
      ),*/
    }),
  },
  목차: {
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

      if (routeName === '시작') {
        iconName = `md-home`;
      } else if (routeName === '스캔') {
        iconName = `ios-qr-scanner`;
      } else if (routeName === '목차') {
        iconName = `ios-albums`;
      } else if (routeName === 'SETTING') {
        iconName = `settings`;
      }
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#d1121a',
    inactiveTintColor: '#939393',
    showIcon: true,
    showLabel: true,
    labelStyle: {
      fontSize: 12,
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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContainer />
    )
  }
}

//export default createAppContainer(createBottomTabNavigator(RouteConfig, BottomNavigatorConfig));

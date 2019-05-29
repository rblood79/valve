
import React, { Component } from 'react';
import { AppRegistry, Platform, StatusBar, FlatList, StyleSheet, Text, View, Button } from 'react-native';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default class Order extends Component{
    constructor(props){
        super(props);
    }
    onPressLearnMore() {
      console.log('onPressLearnMore')
    }
    render() {
        return (
          <View style={{padding:16, backgroundColor: '#efefef',flex: 1, alignItems:'center', justifyContent:'center'}} >
            <Text>교체 주문 화면</Text>
            
          </View>
        );
      }
}
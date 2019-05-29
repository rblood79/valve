
import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button } from 'react-native';

export default class Login extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>login</Text>
            </View>
        );
    }
}
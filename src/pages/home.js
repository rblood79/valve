
import React, { Component } from 'react';
import { AppRegistry, Platform, StatusBar, FlatList, StyleSheet, Text, View, Button, TouchableHighlight, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  blockContainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  body : {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  footer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonTouch : {
    borderWidth: 0,
    backgroundColor:'#fff',
    padding:12,
    paddingLeft:32,
    paddingRight:32,
    marginTop:16,
    borderRadius: 32,
  },
  buttonText : {
    borderWidth: 0,
    fontSize:18,
    fontWeight:'bold'
  },
  title : {
    height:76,
    lineHeight:82,
    padding:5,
    color:'#41306c',
    fontSize: 82,
    fontWeight:'bold',
    borderWidth: 0,
  },
  subTitle : {
    color:'#56428b',
    fontSize: 24,
    fontWeight:'bold',
    lineHeight:24,
  },
  copyright: {
    color:'#ccc',
    fontSize: 12,
    paddingBottom:12,
  },

})

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#6a51ae' }]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#6a51ae"
                />
                
                <View style={styles.container}>
                    
                  <View style={styles.blockContainer}>
                    
                  </View>

                  <View style={styles.body}>
                    
                    <Text style={styles.subTitle}>TOTAL</Text>
                    <Text style={styles.title}>VALVE</Text>
                    <Text style={styles.subTitle}>MANAGEMENT</Text>
                    <Text style={styles.subTitle}>SYSTEM</Text>

                    <TouchableHighlight
                      onPress={() => this.props.navigation.navigate('SCAN')}
                      style={styles.buttonTouch}
                      underlayColor="#56428b">
                        <Text style={styles.buttonText}>
                          <Icon name='ios-play' size={18} color='#6a51ae'/>  시작하기
                        </Text>
                    </TouchableHighlight>

                  </View>

                  <View style={styles.footer}>
                    <Text style={styles.copyright}>haemilsoft Co,Ltd</Text>
                  </View>

                </View>

                

            </View>
        );
    }
}
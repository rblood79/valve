
import React, { Component } from 'react';
import { AppRegistry, Platform, StatusBar, FlatList, StyleSheet, Text, View, Image, Button, TouchableHighlight, PermissionsAndroid } from 'react-native';
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
    justifyContent: 'flex-end',
    borderWidth: 0,
  },
  subTop : {
    marginTop: 12
  },
  buttonTouch : {
    borderWidth: 0,
    backgroundColor:'#fff',
    padding:12,
    paddingLeft:32,
    paddingRight:32,
    marginTop:16,
    borderRadius: 6,
    width:200,

  },
  buttonText : {
    borderWidth: 0,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
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
    color:'#fff',
    fontSize: 16,
    lineHeight:16,
    letterSpacing:1
  },
  copyright: {
    color:'#ccc',
    fontSize: 12,
    paddingBottom:12,
  },
  logoImage: {
    alignSelf: 'center',

    height: 85,
  }

})

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#d1121a' }]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#d1121a"
                />
                
                <View style={styles.container}>
                    
                  <View style={styles.blockContainer}></View>

                  <View style={styles.body}>
                    <Image
                        style={styles.logoImage}
                        source={require('../assets/images/logo.png')}
                        resizeMode="contain"
                    />
                    <View style={styles.subTop}>
                      <Text style={styles.subTitle}>TOTAL VALVE</Text>
                      <Text style={styles.subTitle}>MANAGEMENT SYSTEM</Text>
                    </View>
                    <TouchableHighlight
                      onPress={() => this.props.navigation.navigate('SCAN')}
                      style={styles.buttonTouch}
                      underlayColor="#a71f18">
                        <Text style={styles.buttonText}>
                          <Icon name='ios-play' size={18} color='#d1121a'/>  시작하기
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
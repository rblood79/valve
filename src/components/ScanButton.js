import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
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
});

export default class ScanButton extends Component {
  constructor(props){
    super(props);
  }

  handleAddButtonPress = () => {
    console.log('press:', this)
    //this.props.navigation.navigate('SCAN')
  }
  

  render() {
    return(
      <View>
          <TouchableHighlight
            onPress={this.handleAddButtonPress}
            style={style.bigBubble}
            underlayColor="#41306c"          
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
            >
            <Icon
              name="ios-qr-scanner"
              size={25}
              color="#fff"
            />
          </TouchableHighlight>
      </View>
    )
  }
}

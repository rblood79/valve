/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet, Text, View, ScrollView, Dimensions, PixelRatio } from 'react-native';
import { CameraKitCamera, CameraKitCameraScreen, } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  blockContainer : {
    borderWidth: 0,
    borderColor:'transparent',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    width:'100%',
    justifyContent: 'center',
  },
  block : {
    borderWidth:1,
    borderColor:'#efefef',
    width: '33.3%',
    //padding:16,
    aspectRatio: 1,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:-1,
    marginTop:-1,
  },
  empty : {
    borderWidth:0,
    width: '33.3%',
    //padding:16,
    aspectRatio: 1,
  },
  focusContainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  result : {
    position:'absolute', 
    borderWidth:0, 
    width:'100%', 
    height:'100%', 
    textAlign:'center', 
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000000',
    opacity:.6
  },
  footerFix : {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'
  },
  buttonTouch : {
    flex:1,
    borderWidth: 0,
    backgroundColor:'#242424',
    padding:16,
  },
  buttonText : {
    borderWidth: 0,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color:'#fff',
  },
  buttonTouching : {
    flex:1,
    borderWidth: 0,
    backgroundColor:'#ccc',
    padding:16,
  },
});

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrvalue: '',
      opneScanner: false,
    };
    this.onOpneScanner();
  }
  onOpenlink(ID) {
    //Linking.openURL(this.state.qrvalue);
    this.props.navigation.navigate('DETAIL', { ID: ID });
  }
  onBarcodeScan(qrvalue) {
    //console.log('onBarcodeScan',qrvalue)
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }

  render() {
    //console.log('scan')
    //this.onOpneScanner();
    let displayModal;
    let ID = null;
    let MAKEDATE = null;
    let STARTDATE = null;
    //console.log('this.state.opneScanner:',this.state.opneScanner)
    //If qrvalue is set then return this view
    if(this.state.qrvalue){
      let tempArray = this.state.qrvalue.split('/');
      ID = tempArray[0];
      MAKEDATE = tempArray[1] || '정보가 없습니다';
      STARTDATE = tempArray[2] || '정보가 없습니다';

      return (
        <View style={{flex:1}}>
          
          <View style={styles.container}>
            <View style={styles.focusContainer}>
                <View style={{ width: 192, height:192, }}>
                  <Text style={{ width:48, height: 48, borderTopWidth:6, borderLeftWidth:6, borderColor:'#d1121a'}}></Text>
                  <Text style={{ width:48, height: 48, borderTopWidth:6, borderRightWidth:6, borderColor:'#d1121a', position:'absolute', right:0, top:0}}></Text>
                  <Text style={{ width:48, height: 48, borderBottomWidth:6, borderLeftWidth:6, borderColor:'#d1121a', position:'absolute', left:0, bottom:0}}></Text>
                  <Text style={{ width:48, height: 48, borderBottomWidth:6, borderRightWidth:6, borderColor:'#d1121a', position:'absolute', right:0, bottom:0}}></Text>
                  <Text style={styles.result}>{this.state.qrvalue ? ID : ''}</Text>
                </View>
              </View>
          </View>

          <View style={styles.footerFix}>
            
            <View style={styles.blockContainer}>
              
              <View style={styles.block}>
                  <Icon name='ios-barcode' size={25} color='#646464' />
                  <Text style={{fontSize:12, marginTop:6, color:'#d1121a'}}>Tag No</Text>
                  <Text style={{fontSize:12, marginTop:0}}>{tempArray.length > 1 ? ID : '등록되지 않았습니다'}</Text>
              </View>
              <View style={styles.block}>
                  <Icon name='ios-calendar' size={25} color='#646464' />
                  <Text style={{fontSize:12, marginTop:6, color:'#d1121a'}}>제조일</Text>
                  <Text style={{fontSize:12, marginTop:0}}>{tempArray.length > 2 ? MAKEDATE : '정보가 없습니다'}</Text>
              </View>
              <View style={styles.block}>
                  <Icon name='md-speedometer' size={25} color='#646464' />
                  <Text style={{fontSize:12, marginTop:6, color:'#d1121a'}}>운전시작일</Text>
                  <Text style={{fontSize:12, marginTop:0}}>{tempArray.length > 2 ? STARTDATE : '정보가 없습니다'}</Text>
              </View>

              { 
                tempArray.length > 2 ? 
                <TouchableHighlight
                  onPress={() => this.onOpenlink(ID)}
                  underlayColor="#424242"
                  style={styles.buttonTouch}>
                    <Text style={styles.buttonText}>
                      <Icon name='ios-clipboard' size={18} color='#fff' />  상세 정보
                    </Text>
                </TouchableHighlight>
                : null
              }
              {
                <TouchableHighlight
                  onPress={() => this.onOpneScanner()}
                  underlayColor="#424242"
                  style={styles.buttonTouch}>
                    <Text style={styles.buttonText}>
                    <Icon name='ios-refresh' size={18} color='#fff' />  다시 읽기
                    </Text>
                </TouchableHighlight>
              }  
            </View>

          </View>

        </View>
      );
    }else{
      return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <CameraKitCameraScreen
            style={{position:'absolute', width: width, height: height}}
            showFrame={false}
            scanBarcode={true}
            laserColor={'blue'}
            frameColor={'cyan'}
            colorForScannerFrame={'red'}
            onReadCode={event =>
              this.onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
          <View style={styles.container}>
              
              <View style={styles.focusContainer}>
                <View style={{ width: 192, height:192 }}>
                  <Text style={{ width:48, height: 48, borderTopWidth:6, borderLeftWidth:6, borderColor:'#d1121a'}}></Text>
                  <Text style={{ width:48, height: 48, borderTopWidth:6, borderRightWidth:6, borderColor:'#d1121a', position:'absolute', right:0, top:0}}></Text>
                  <Text style={{ width:48, height: 48, borderBottomWidth:6, borderLeftWidth:6, borderColor:'#d1121a', position:'absolute', left:0, bottom:0}}></Text>
                  <Text style={{ width:48, height: 48, borderBottomWidth:6, borderRightWidth:6, borderColor:'#d1121a', position:'absolute', right:0, bottom:0}}></Text>
                  <Text style={styles.result}>QR code 를 화면에 보여주세요</Text>
                </View>
              </View>

          </View>

          <View style={styles.footerFix}>
            <View style={styles.blockContainer}>
              <View style={styles.empty}>
                  
              </View>
              <View style={styles.empty}>
                  
              </View>
              <View style={styles.empty}>
                  
              </View>

              <TouchableHighlight
                underlayColor="#41306c"
                style={styles.buttonTouch}>
                  <Text style={styles.buttonText}>
                  <Icon name='ios-radio' size={18} color='#fff' />  정보를 찾는중 입니다
                  </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    };
    
  }
  
}

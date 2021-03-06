/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet, Text, View, ScrollView, Dimensions, PixelRatio } from 'react-native';
import { CameraKitCamera, CameraKitCameraScreen, } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

export default class Scan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrvalue: '',
			opneScanner: false,
		};
		//this.onOpneScanner();
	}

	openLink = () => {
		Linking.openURL(this.state.qrvalue);
	}

	onOpenlink(ID) {
		this.props.navigation.navigate('DETAIL', { ID: ID });
	}

	onBarcodeScan = (QR_Code) => {
		this.setState({
			qrvalue: QR_Code,
			opneScanner: false
		});
		/*this.setState({ QR_Code_Value: QR_Code });
		this.setState({ Start_Scanner: false });*/
	}

	onBottomButtonPressed(event) {
		/*const captureImages = JSON.stringify(event.captureImages);
		Alert.alert(
			`${event.type} button pressed`,
			`${captureImages}`,
			[
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false }
		)*/
	}

	onOpneScanner() {
		console.log('Platform.OS: ', Platform.OS)
		var that = this;
		if (Platform.OS === 'android') {
			async function requestCameraPermission() {
				try {
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.CAMERA, {
						'title': 'CameraExample App Camera Permission',
						'message': 'CameraExample App needs access to your camera '
					}
					)
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						//If CAMERA Permission is granted
						that.setState({
							qrvalue: '',
							opneScanner: true
						});
					} else {
						alert("CAMERA permission denied");
					}
				} catch (err) {
					alert("Camera permission err", err);
					console.warn(err);
				}
			}
			//Calling the camera permission function
			requestCameraPermission();
		} else {
			console.log(this.state)
			that.setState({
				qrvalue: '',
				opneScanner: true
			});
		};
	}

	render() {
		let displayModal;
		let ID = null;
		let MAKEDATE = null;
		let STARTDATE = null;
		
		console.log('this.state.qrvalue:', this.state.qrvalue, 'this.state.opneScanner:', this.state.opneScanner)
		if (!this.state.opneScanner) {
			let tempArray = this.state.qrvalue.split('/');
			ID = tempArray[0];
			MAKEDATE = tempArray[1] || '정보가 없습니다';
			STARTDATE = tempArray[2] || '정보가 없습니다';

			console.log('a')
			return (
				<View style={{ flex: 1 }}>

					<View style={styles.container}>
						<View style={styles.focusContainer}>
							<View style={{ width: 192, height: 192, }}>
								<View style={{ width: 48, height: 48, borderTopWidth: 6, borderLeftWidth: 6, borderColor: '#d1121a'}}></View>
								<View style={{ width: 48, height: 48, borderTopWidth: 6, borderRightWidth: 6, borderColor: '#d1121a', position: 'absolute', right: 0, top: 0 }}></View>
								<View style={{ width: 48, height: 48, borderBottomWidth: 6, borderLeftWidth: 6, borderColor: '#d1121a', position: 'absolute', left: 0, bottom: 0 }}></View>
								<View style={{ width: 48, height: 48, borderBottomWidth: 6, borderRightWidth: 6, borderColor: '#d1121a', position: 'absolute', right: 0, bottom: 0 }}></View>
								<View style={styles.result}><Text style={styles.resultText}>{this.state.qrvalue ? ID : 'ㅠㅠ'}</Text></View>
							</View>
						</View>
					</View>

					<View style={styles.footerFix}>

						<View style={styles.blockContainer}>

							<View style={styles.block}>
								<Icon name='ios-barcode' size={25} color='#646464' />
								<Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>Tag No</Text>
								<Text style={{ fontSize: 12, marginTop: 0 }}>{tempArray.length > 1 ? ID : '등록되지 않았습니다'}</Text>
							</View>
							<View style={styles.block}>
								<Icon name='ios-calendar' size={25} color='#646464' />
								<Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>제조일</Text>
								<Text style={{ fontSize: 12, marginTop: 0 }}>{tempArray.length > 2 ? MAKEDATE : '정보가 없습니다'}</Text>
							</View>
							<View style={styles.block}>
								<Icon name='md-speedometer' size={25} color='#646464' />
								<Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>운전시작일</Text>
								<Text style={{ fontSize: 12, marginTop: 0 }}>{tempArray.length > 2 ? STARTDATE : '정보가 없습니다'}</Text>
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
			)
		} else {
			console.log('b')
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<CameraKitCameraScreen
						style={{ position: 'absolute', width: width, height: height }}
						showFrame={false}
						scanBarcode={true}
						laserColor={'blue'}
						frameColor={'cyan'}
						colorForScannerFrame={'red'}
						onReadCode={event =>
							this.onBarcodeScan(event.nativeEvent.codeStringValue)
						}
						/*flashImages={{
							on: require('../assets/images/flashOn.png'),
							off: require('../assets/images/flashOff.png'),
							auto: require('../assets/images/flashAuto.png')
						}}*/
					/>
					<View style={styles.container}>
						<View style={styles.focusContainer}>
							<View style={{ width: 192, height: 192, }}>
								<View style={{ width: 48, height: 48, borderTopWidth: 6, borderLeftWidth: 6, borderColor: '#d1121a'}}></View>
								<View style={{ width: 48, height: 48, borderTopWidth: 6, borderRightWidth: 6, borderColor: '#d1121a', position: 'absolute', right: 0, top: 0 }}></View>
								<View style={{ width: 48, height: 48, borderBottomWidth: 6, borderLeftWidth: 6, borderColor: '#d1121a', position: 'absolute', left: 0, bottom: 0 }}></View>
								<View style={{ width: 48, height: 48, borderBottomWidth: 6, borderRightWidth: 6, borderColor: '#d1121a', position: 'absolute', right: 0, bottom: 0 }}></View>
								<View style={styles.result}><Text style={styles.resultText}>code를 화면 가까이</Text></View>
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
			)
		}
		/*return (
			<CameraKitCameraScreen
				actions={{ rightButtonText: 'Ok', leftButtonText: 'back' }}
				onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
				showFrame={true}
				scanBarcode={true}
				laserColor={'blue'}
				frameColor={'cyan'}
				colorForScannerFrame={'red'}
			flashImages={{
				on: require('./../images/flashOn.png'),
				off: require('./../images/flashOff.png'),
				auto: require('./../images/flashAuto.png')
			}}
			cameraFlipImage={require('./../images/cameraFlipIcon.png')}
			captureButtonImage={require('./../images/cameraButton.png')}
			/>
		);*/
	}

}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	blockContainer: {
		borderWidth: 0,
		borderColor: 'transparent',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		justifyContent: 'center',
	},
	block: {
		borderWidth: 1,
		borderColor: '#efefef',
		width: '33.3%',
		//padding:16,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -1,
		marginTop: -1,
	},
	empty: {
		borderWidth: 0,
		width: '33.3%',
		//padding:16,
		aspectRatio: 1,
	},
	focusContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	result: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems:'center'
	},
	resultText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000000',
		opacity: .6,
		alignSelf:'center'
	},
	footerFix: {
		flex: 0,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	buttonTouch: {
		flex: 1,
		borderWidth: 0,
		backgroundColor: '#242424',
		padding: 16,
	},
	buttonText: {
		borderWidth: 0,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff',
	},
	buttonTouching: {
		flex: 1,
		borderWidth: 0,
		backgroundColor: '#ccc',
		padding: 16,
	},
});


import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    blockContainer: {
        borderWidth: 0,
        borderColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center'
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
    graph: {
        width: '100%',
        height: 160,
        borderWidth: 0,
        borderColor: '#d1121a',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoTitle: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#efefef',
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold'
    },
    info: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderColor: '#efefff',
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
    blockGroup: {
        flex: 1
    },
    footerFix: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
}
)

const REQUEST_URL = 'http://172.30.1.27:3000/list/';
//const ID = null;
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const ID = this.props.navigation.state.params.ID;
        //console.log('////',ID)
        fetch(REQUEST_URL + ID, {
            method: "GET",
            dataType: 'json',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: null
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    item: responseJson,
                });
                //console.log(this.state.item)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    order(item) {
        Alert.alert(
            item.ID + ' 교체 주문',
            item.USER + '에서 사용중인 ' + item.BUILDER + '사의 ' + item.MODEL + ' 의 수명이 ' + item.LIFE + '% 남았습니다. 제품을 교체 신청 하시겠습니까?',
            [
                { text: '예' },
                { text: '아니요' }
            ]
        );
    }
    render() {
        //console.log('//detail')
        //const utag = this.props.navigation.state.params.ID || '';
        //lodash - console.log(_.filter(listItem, { ID: utag }));

        /*let findItem = listItem.filter(function (item) {
            return item.ID == utag;
        }).map(function (item) {
            return item;
        });*/

        let findItem = this.state.item;
        let nullText = '정보없음';

        if (findItem.length > 0) {
            findItem = findItem[0];

            let lifeColor = '#0b97c6';
            if (findItem.LIFE < 10) {
                lifeColor = '#d61313';
            } else if (findItem.LIFE < 30) {
                lifeColor = '#0bc675';
            } else if (findItem.LIFE < 50) {
                lifeColor = '#0b97c6';
            }

            //console.log( moment(findItem.STARTDATE, "HH:mm").fromNow() )
            findItem.MAKEDATE = moment(findItem.MAKEDATE).format("YYYY-MM-DD");
            findItem.STARTDATE = moment(findItem.STARTDATE).format("YYYY-MM-DD");

            return (
                /*<View>
                    <Text>{findItem.USER || nullText}</Text>
                </View>*/
                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.container}>

                        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderTopWidth: 0, borderColor: '#efefef', justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', paddingTop: 12, paddingBottom: 12, backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Icon name='ios-barcode' size={25} color='#646464' />
                                <Text style={{ fontSize: 0, marginTop: 6, color: '#d1121a' }}>Tag No</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 0, color: '#d1121a' }}>{findItem.TAG || nullText}</Text>
                            </View>
                        </View>

                        <View style={styles.blockContainer}>
                            <View style={styles.block}>
                                <Icon name='ios-contact' size={25} color='#646464' />
                                <Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>사용자</Text>
                                <Text style={{ fontSize: 12, marginTop: 0 }}>{findItem.USER || nullText}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-build' size={25} color='#646464' />
                                <Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>제조사</Text>
                                <Text style={{ fontSize: 12, marginTop: 0 }}>{findItem.BUILDER || nullText}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-calendar' size={25} color='#646464' />
                                <Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>제조일</Text>
                                <Text style={{ fontSize: 12, marginTop: 0 }}>{findItem.MAKEDATE || nullText}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-timer' size={25} color='#646464' />
                                <Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>운전시간</Text>
                                <Text style={{ fontSize: 12, marginTop: 0 }}>{findItem.USETIME || nullText}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-time' size={25} color='#646464' />
                                <Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>권장운전시간</Text>
                                <Text style={{ fontSize: 12, marginTop: 0 }}>{findItem.SAFETIME || nullText}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='md-speedometer' size={25} color='#646464' />
                                <Text style={{ fontSize: 12, marginTop: 6, color: '#d1121a' }}>운전시작일</Text>
                                <Text style={{ fontSize: 12, marginTop: 0 }}>{findItem.STARTDATE || nullText}</Text>
                            </View>
                        </View>

                        <Text style={styles.infoTitle}>예상수명</Text>
                        <View style={{ flex: 1, borderWidth: 1, borderTopWidth: 0, borderColor: '#efefef', alignItems: 'center' }}>
                            <View style={styles.graph}>
                                <Speedometer
                                    value={findItem.LIFE || 0}
                                    totalValue={100}
                                    //size={250}
                                    outerColor="#ccc"
                                    internalColor={lifeColor}
                                    //showText
                                    //text= {findItem.LIFE}
                                    //textStyle={{ color: 'green' }}
                                    showLabels
                                    //labelStyle={{ color: 'blue' }}
                                    showPercent
                                    percentStyle={{ color: lifeColor }}
                                />
                            </View>

                        </View>

                        <Text style={styles.infoTitle}>서비스 컨디션</Text>
                        <Text style={styles.info}>제조회사 : {findItem.BUILDER || nullText}</Text>
                        <Text style={styles.info}>제조일 : {findItem.MAKEDATE || nullText}</Text>
                        <Text style={styles.info}>운전시간 : {findItem.USETIME || nullText}</Text>
                        <Text style={styles.info}>권장운전시간 : {findItem.SAFETIME || nullText}</Text>
                        <Text style={styles.info}>운전시작일 : {findItem.STARTDATE || nullText}</Text>
                        <Text style={styles.info}>사용자 : {findItem.USER || nullText}</Text>
                        <Text style={styles.info}>테그 넘버 : {findItem.TAG || nullText}</Text>
                        <Text style={styles.info}>주변 온도 : {findItem.TEMPERATURE || nullText}</Text>
                        <Text style={styles.info}>밸브 위치 : {findItem.LOCATION || nullText}</Text>
                        <Text style={styles.info}>유체 타입 : {findItem.SERVICEFLUID || nullText}</Text>
                        <Text style={styles.info}>유량 값 : {findItem.SERVICEFLUIDFLOW || nullText}</Text>
                        <Text style={styles.info}>유체 온도 : {findItem.SERVICEFLUIDTEMP || nullText}</Text>

                        <Text style={styles.infoTitle}>밸브</Text>
                        <Text style={styles.info}>밸브타입 : {findItem.VALVETYPE || nullText}</Text>
                        <Text style={styles.info}>본넷타입 : {findItem.BONNETTYPE || nullText}</Text>
                        <Text style={styles.info}>밸브사이즈 : {findItem.SIZE || nullText}</Text>
                        <Text style={styles.info}>압력 : {findItem.RATING || nullText}</Text>
                        <Text style={styles.info}>엔드 커넥션 : {findItem.ENDCONNECTION || nullText}</Text>
                        <Text style={styles.info}>유록경 타입 : {findItem.BORE || nullText}</Text>
                        <Text style={styles.info}>패킹타입 : {findItem.PACKINGTYPE || nullText}</Text>
                        <Text style={styles.info}>바디-재질 : {findItem.MATERIALBODY || nullText}</Text>
                        <Text style={styles.info}>트림(디스크, 볼)-재질 : {findItem.MATERIALTRIM || nullText}</Text>
                        <Text style={styles.info}>시트-재질 : {findItem.MATERIALSEAT || nullText}</Text>
                        <Text style={styles.info}>패킹-재질 : {findItem.MATERIALPACKING || nullText}</Text>
                        <Text style={styles.info}>유량계수 : {findItem.CV || nullText}</Text>

                        <Text style={styles.infoTitle}>엑츄레이터</Text>
                        <Text style={styles.info}>작동기 타입 : {findItem.OPERATIONTYPE || nullText}</Text>
                        <Text style={styles.info}>작동방법 : {findItem.PERFORMANCE || nullText}</Text>
                        <Text style={styles.info}>페일 포지션 : {findItem.FAILACTION || nullText}</Text>
                        <Text style={styles.info}>핸드휠 : {findItem.HANDWHEELACTUATOR || nullText}</Text>
                        <Text style={styles.info}>모델 : {findItem.MODEL || nullText}</Text>

                        <Text style={styles.infoTitle}>악세서리</Text>
                        <Text style={styles.info}>포지셔너 : {findItem.EPPOSITIONER || nullText}</Text>
                        <Text style={styles.info}>슬레노이드 밸브 : {findItem.SOLENOIDVALVE || nullText}</Text>
                        <Text style={styles.info}>리미트 스위치 : {findItem.LIMITSWITCH || nullText}</Text>
                        <Text style={styles.info}>에어 필터 : {findItem.AIRFILTER || nullText}</Text>
                        <Text style={styles.info}>볼륨 부스터 : {findItem.VOLUMEBOOSTER || nullText}</Text>
                        <Text style={styles.info}>핸드휠 : {findItem.HANDWHEELACCESSORY || nullText}</Text>

                    </ScrollView>
                    <View style={styles.footerFix}>
                        {
                            findItem.LIFE < 50 ?
                                <TouchableHighlight
                                    //onPress={() => this.props.navigation.navigate('ORDER')}
                                    onPress={() => this.order(findItem)}
                                    style={styles.buttonTouch}
                                    underlayColor="#424242">
                                    <Text style={[styles.buttonText]}><Icon name='ios-switch' size={18} color='#fff' />  교체주문 하시겠습니까?</Text>
                                </TouchableHighlight>
                                :
                                <TouchableHighlight
                                    style={styles.buttonTouch}
                                    underlayColor="#424242">
                                    <Text style={[styles.buttonText]}><Icon name='ios-switch' size={18} color='#fff' />  교체 기간이 아닙니다.</Text>
                                </TouchableHighlight>
                        }
                    </View>
                </View>

            )
        } else {
            //console.log('no find item')
            return (
                <View style={{ backgroundColor: '#efefef', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text>등록되지 않은 제품 입니다.</Text>
                </View>
            )
        }
        //console.log('detail params.utag:', utag, 'findItem: ',findItem)

    }

}

//data
/*const listItem = [
    {
        ID: 'TVMSIHMSSSXV201A',
        BUILDER: '유에이자동밸브',
        MAKEDATE: '2019.01.01',
        USETIME: '300Hr',
        SAFETIME: '1000Hr',
        STARTDATE: '2019.03.10',
        USER: '현대제철',
        TAG: 'XV-201A',
        TEMPERATURE: '25',
        LOCATION: '2-DECK',
        SERVICEFLUID: 'AMMONIA',
        SERVICEFLUIDFLOW: '150',
        SERVICEFLUIDTEMP: '30',
        VALVETYPE: 'GLOBE',
        BONNETTYPE: 'MFR',
        SIZE: '65A',
        RATING: 'JIS 10K',
        ENDCONNECTION: 'RF',
        BORE: 'MFR',
        PACKINGTYPE: 'V-PACKING',
        MATERIALBODY: 'SCPH2',
        MATERIALTRIM: '316SS',
        MATERIALSEAT: '316SS',
        MATERIALPACKING: 'PTFE',
        CV: '60',
        OPERATIONTYPE: 'DIAPHRAGM-RA',
        PERFORMANCE: 'CONTROL',
        FAILACTION: 'CLOSE',
        HANDWHEELACTUATOR: 'TOP',
        MODEL: 'ACV',
        EPPOSITIONER: 'Fisher/DVC-6200',
        SOLENOIDVALVE: 'NONR',
        LIMITSWITCH: 'NONE',
        AIRFILTER: 'YT-200',
        VOLUMEBOOSTER: 'NONE',
        HANDWHEELACCESSORY: 'NONE',
        LIFE: 80,
    },
    {
        ID: 'TVMSIHMSSSXV201B',
        BUILDER: '유에이자동밸브',
        MAKEDATE: '2019.01.01',
        USETIME: '400Hr',
        SAFETIME: '1000Hr',
        STARTDATE: '2019.03.10',
        USER: '삼천포 화력발전소',
        TAG: 'XV-201B',
        TEMPERATURE: '35',
        LOCATION: '2-DECK',
        SERVICEFLUID: 'WATER',
        SERVICEFLUIDFLOW: '2000',
        SERVICEFLUIDTEMP: '50',
        VALVETYPE: 'BALL',
        BONNETTYPE: 'TRUNNION',
        SIZE: '100A',
        RATING: 'ANSI 150#',
        ENDCONNECTION: 'RF',
        BORE: 'FULL',
        PACKINGTYPE: 'V-PACKING',
        MATERIALBODY: 'A351-CF8',
        MATERIALTRIM: '316SS',
        MATERIALSEAT: 'RTFE',
        MATERIALPACKING: 'PTFE',
        CV: '100',
        OPERATIONTYPE: 'SPRING RETURN',
        PERFORMANCE: 'ON-OFF',
        FAILACTION: 'OPEN',
        HANDWHEELACTUATOR: 'NONE',
        MODEL: 'AS140',
        EPPOSITIONER: 'NONE',
        SOLENOIDVALVE: 'PARKER/341Y312UNML',
        LIMITSWITCH: 'I-TORK / ITS-100',
        AIRFILTER: 'PARKER / P31EA',
        VOLUMEBOOSTER: 'NONE',
        HANDWHEELACCESSORY: 'AUTOMA / ADG-140N',
        LIFE: 50
    },
    {
        ID: 'TVMSIHMSSSXV201C',
        BUILDER: '유에이자동밸브',
        MAKEDATE: '2019.01.01',
        USETIME: '500Hr',
        SAFETIME: '1000Hr',
        STARTDATE: '2019.03.10',
        USER: '포스코',
        TAG: 'XV-201C',
        TEMPERATURE: '60',
        LOCATION: '2-DECK',
        SERVICEFLUID: 'AIR',
        SERVICEFLUIDFLOW: '2500',
        SERVICEFLUIDTEMP: '15',
        VALVETYPE: 'BUTTERFLY',
        BONNETTYPE: 'HI-PERFORMANCE',
        SIZE: '150A',
        RATING: 'ANSI 150#',
        ENDCONNECTION: 'WAFER',
        BORE: 'MFR',
        PACKINGTYPE: 'V-PACKING',
        MATERIALBODY: 'A216-WCB',
        MATERIALTRIM: '316SS',
        MATERIALSEAT: 'RTFE',
        MATERIALPACKING: 'RTFE',
        CV: '150',
        OPERATIONTYPE: 'DOUBLE',
        PERFORMANCE: 'ON-OFF',
        FAILACTION: 'LOCK',
        HANDWHEELACTUATOR: 'NONE',
        MODEL: 'AD100',
        EPPOSITIONER: 'NONE',
        SOLENOIDVALVE: 'PARKER/341Y312UNML',
        LIMITSWITCH: 'I-TORK / ITS-100',
        AIRFILTER: 'PARKER / P31EA',
        VOLUMEBOOSTER: 'NONE',
        HANDWHEELACCESSORY: 'AUTOMA / ADG-140N',
        LIFE: 13
    }
]*/
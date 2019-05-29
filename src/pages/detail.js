
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    blockContainer : {
        borderWidth: 0,
        borderColor:'transparent',
        flexDirection: 'row', 
        flexWrap: 'wrap',
        width:'100%',
        justifyContent: 'center'
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
    graph: {
        width: '100%',
        height: 160,
        borderWidth: 0,
        borderColor: '#6a51ae',
        backgroundColor:'#fff',
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    infoTitle:{
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderColor:'#efefef',
        backgroundColor:'#efefef',
        marginTop:0,
        fontSize:14,
        fontWeight:'bold'
    },
    info: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderColor:'#efefff',
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
    blockGroup:{
        flex:1
    },
    footerFix : {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', 
    },
  }
)


export default class Detail extends Component{
    constructor(props){
        super(props);
    }
    order(item) {
        Alert.alert(
            item.ID+' 교체 주문',
            item.USER+'에서 사용중인 '+item.BUILDER+'사의 '+item.MODEL+' 의 수명이 '+item.LIFE+'% 남았습니다. 제품을 교체 신청 하시겠습니까?',
            [
              { text: '예' },
              { text: '아니요' }
            ]
        );
    }
    render() {
        //console.log('//detail')
        const utag = this.props.navigation.state.params.ID || '';
        //lodash - console.log(_.filter(listItem, { ID: utag }));
        
        let findItem = listItem.filter(function(item){
            return item.ID == utag;
        }).map(function(item){
            return item;
        });

        if(findItem.length > 0){
            findItem = findItem[0];

            let lifeColor = '#0b97c6';
            if( findItem.LIFE < 10 ){
                lifeColor = '#d61313';
            } else if( findItem.LIFE < 30 ){
                lifeColor = '#0bc675';
            } else if( findItem.LIFE < 50 ){
                lifeColor = '#0b97c6';
            }
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container}>

                        <View style={{flex: 1, flexDirection: 'row', borderWidth:1, borderTopWidth:0, borderColor:'#efefef', justifyContent:'space-between'}}>
                            <View style={{width:'100%',paddingTop:12,paddingBottom:12, backgroundColor: '#fff',flex: 1, alignItems:'center', justifyContent:'center'}} >
                                <Icon name='ios-barcode' size={25} color='#646464' />
                                <Text style={{fontSize:0, marginTop:6, color:'#6a51ae'}}>Tag No</Text>
                                <Text style={{fontSize:18, fontWeight:'bold', marginTop:0, color:'#6a51ae'}}>{findItem.ID}</Text>
                            </View>
                        </View>

                        <View style={styles.blockContainer}>
                            <View style={styles.block}>
                                <Icon name='ios-contact' size={25} color='#646464' />
                                <Text style={{fontSize:12, marginTop:6, color:'#6a51ae'}}>사용자</Text>
                                <Text style={{fontSize:12, marginTop:0}}>{findItem.USER}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-build' size={25} color='#646464' />
                                <Text style={{fontSize:12, marginTop:6, color:'#6a51ae'}}>제조사</Text>
                                <Text style={{fontSize:12, marginTop:0}}>{findItem.BUILDER}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-calendar' size={25} color='#646464' />
                                <Text style={{fontSize:12, marginTop:6, color:'#6a51ae'}}>제조일</Text>
                                <Text style={{fontSize:12, marginTop:0}}>{findItem.MAKEDATE}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-timer' size={25} color='#646464' />
                                <Text style={{fontSize:12, marginTop:6, color:'#6a51ae'}}>운전시간</Text>
                                <Text style={{fontSize:12, marginTop:0}}>{findItem.USETIME}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='ios-time' size={25} color='#646464' />
                                <Text style={{fontSize:12, marginTop:6, color:'#6a51ae'}}>권장운전시간</Text>
                                <Text style={{fontSize:12, marginTop:0}}>{findItem.SAFETIME}</Text>
                            </View>
                            <View style={styles.block}>
                                <Icon name='md-speedometer' size={25} color='#646464' />
                                <Text style={{fontSize:12, marginTop:6, color:'#6a51ae'}}>운전시작일</Text>
                                <Text style={{fontSize:12, marginTop:0}}>{findItem.STARTDATE}</Text>
                            </View>
                        </View>

                        <Text style={styles.infoTitle}>LIFE LIMITED</Text>
                        <View style={{flex: 1, borderWidth:1, borderTopWidth:0, borderColor:'#efefef', alignItems:'center'}}>
                            <View style={styles.graph}>
                                <Speedometer
                                    value={findItem.LIFE}
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
                        
                        <Text style={styles.infoTitle}>SERVICE CONDITIONS</Text>
                        <Text style={styles.info}>사용자 : {findItem.USER}</Text>
                        <Text style={styles.info}>TAG NO : {findItem.ID}</Text>
                        <Text style={styles.info}>Temperature of SITE : {findItem.TEMPERATURE}</Text>
                        <Text style={styles.info}>Location of Valve</Text>
                        <Text style={styles.info}>제조사 : {findItem.BUILDER}</Text>
                        <Text style={styles.info}>Service Fluid : {findItem.SERVICEFLUID}</Text>
                        <Text style={styles.info}>Service Flow Rate : {findItem.SERVICEFLOWRATE}</Text>
                        <Text style={styles.info}>Service Flow Press : {findItem.SERVICEFLOWPRESS}</Text>

                        <Text style={styles.infoTitle}>VALVE</Text>
                        <Text style={styles.info}>Valve Type : {findItem.VALVETYPE}</Text>
                        <Text style={styles.info}>SIZE : {findItem.SIZE}</Text>
                        <Text style={styles.info}>RATING : {findItem.RATING}</Text>
                        <Text style={styles.info}>END Connection : {findItem.ENDCONNECTION}</Text>
                        <Text style={styles.info}>Material BODY : {findItem.MATERIALBODY}</Text>
                        <Text style={styles.info}>Material TRIM : {findItem.MATERIALTRIM}</Text>
                        <Text style={styles.info}>Material SEAT : {findItem.MATERIALSEAT}</Text>
                        <Text style={styles.info}>Material PACKING : {findItem.MATERIALPACKING}</Text>
                        <Text style={styles.info}>Cv : {findItem.CV}</Text>

                        <Text style={styles.infoTitle}>ACTUATOR</Text>
                        <Text style={styles.info}>Operation Type : {findItem.OPERATIONTYPE}</Text>
                        <Text style={styles.info}>Performance : {findItem.PERFORMANCE}</Text>
                        <Text style={styles.info}>Fail Action : {findItem.FAILACTION}</Text>
                        <Text style={styles.info}>Hand Wheel : {findItem.HANDWHEEL}</Text>
                        <Text style={styles.info}>Model : {findItem.MODEL}</Text>

                        <Text style={styles.infoTitle}>ACCESSORY</Text>
                        <Text style={styles.info}>E/P POSITIONER : {findItem.EPPOSITIONER}</Text>
                        <Text style={styles.info}>SOLENOID VALVE : {findItem.SOLENOIDVALVE}</Text>
                        <Text style={styles.info}>LIMIT SWITCH : {findItem.LIMITSWITCH}</Text>
                        <Text style={styles.info}>AIR FILTER : {findItem.AIRFILTER}</Text>
                        <Text style={styles.info}>AIR REGULATOR : {findItem.AIRREGULATOR}</Text>

                    </ScrollView>
                    <View style={styles.footerFix}>
                        {
                        findItem.LIFE < 50 ?
                        <TouchableHighlight
                            //onPress={() => this.props.navigation.navigate('ORDER')}
                            onPress={() => this.order(findItem)}
                            style={styles.buttonTouch}
                            underlayColor="#424242">
                            <Text style={[styles.buttonText]}><Icon name='ios-switch'size={18} color='#fff'/>  교체주문 하시겠습니까?</Text>
                        </TouchableHighlight>
                        : 
                        <TouchableHighlight
                            style={styles.buttonTouch}
                            underlayColor="#424242">
                            <Text style={[styles.buttonText]}><Icon name='ios-switch'size={18} color='#fff'/>  교체 기간이 아닙니다.</Text>
                        </TouchableHighlight>
                        }
                    </View>
                </View>
                
            )
        }else{
            //console.log('no find item')
            return (
                <View style={{backgroundColor: '#efefef',flex: 1, alignItems:'center', justifyContent:'center'}} >
                    <Text>{utag}는 등록되지 않은 제품 입니다.</Text>
                </View>
            )
        }
        //console.log('detail params.utag:', utag, 'findItem: ',findItem)

    }

}

//data
const listItem = [
    {
        ID : 'TVMSIHMSSSXV201A',
        USER : '현대제철',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2019.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2019.03.10',
        LIFE : 91,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSIHMSSSXV201B',
        USER : 'POSCO',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2019.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2019.05.10',
        LIFE : 86,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSIHMSSSXV201C',
        USER : 'POSCO',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2010.11.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2011.05.16',
        LIFE : 46,
        TEMPERATURE : 'AMB2',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSIHMSSSXV202A',
        USER : 'POSCO',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2013.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2013.11.12',
        LIFE : 26,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSIHMSSSXV202B',
        USER : 'POSCO',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2013.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2014.08.21',
        LIFE : 36,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSIHMSSSXV202C',
        USER : '현대제철',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2010.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2011.05.03',
        LIFE : 12,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSIHMSSSXV302C',
        USER : '현대제철',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '2000.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2000.02.28',
        LIFE : 10,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSTRWESSXV302A',
        USER : 'POSCO',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '1979.11.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2001.05.18',
        LIFE : 5,
        TEMPERATURE : 'AMB2',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    },
    {
        ID : 'TVMSZZSCSSXV302C',
        USER : '현대제철',
        BUILDER : 'U.A 밸브',
        MAKEDATE : '1999.01.01',
        USETIME : '300Hr',
        SAFETIME : '1000Hr',
        STARTDATE : '2010.04.21',
        LIFE : 8,
        TEMPERATURE : 'AMB',
        LOCATION :'',
        SERVICEFLUID :'AMMONIA',
        SERVICEFLOWRATE : '242.2 kg/h',
        SERVICEFLOWPRESS : '2.6 kg/cm2g',
        VALVETYPE : 'GLOBE',
        SIZE : '65A',
        RATING : 'JIS 10K',
        ENDCONNECTION : 'RF',
        MATERIALBODY : 'SCPH2',
        MATERIALTRIM : '316SS',
        MATERIALSEAT : '316SS',
        MATERIALPACKING : 'V-PTFE',
        CV : 'TBA',
        OPERATIONTYPE : 'Diaphragm Reverse Action',
        PERFORMANCE : 'CONTROL',
        FAILACTION : 'CLOSE',
        HANDWHEEL : 'TAP',
        MODEL : 'ACV-65',
        EPPOSITIONER : 'empty',
        SOLENOIDVALVE : 'empty',
        LIMITSWITCH : 'empty',
        AIRFILTER : 'empty',
        AIRREGULATOR : 'empty'
    }
]
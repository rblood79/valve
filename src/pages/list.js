
import React, { Component } from 'react';
import { AppRegistry, Platform, StatusBar, FlatList, ListItem, SectionList, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#efefef',
    color: '#939393',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 26,
  },
  UTAG: {
    fontFamily: 'Verdana',
    fontSize: 14,
    color: '#6a51ae'

  },
  location: {
    color: '#ccc',
    fontSize: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //borderWidth:1,
    //borderColor:'red'
  },
  detail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

/*const list = [
  { ID: 'TVMSIHMSSSXV201A', STARTDATE: '2019.03.10' },
  { ID: 'TVMSIHMSSSXV201B', STARTDATE: '2019.05.10' },
  { ID: 'TVMSIHMSSSXV201C', STARTDATE: '2011.05.16' },
  { ID: 'TVMSIHMSSSXV202A', STARTDATE: '2013.11.12' },
  { ID: 'TVMSIHMSSSXV202B', STARTDATE: '2014.08.21' },
  { ID: 'TVMSIHMSSSXV202C', STARTDATE: '2011.05.03' },
]*/

const REQUEST_URL = 'http://172.30.1.27:3000/list';
const extractKey = ({ ID }) => ID

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL, {
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
          list: responseJson,
        });
        //console.log(this.state.list)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressLearnMore(ID) {
    console.log('onPressLearnMore: ', ID)
    this.props.navigation.navigate('DETAIL', { ID: ID })
  }

  renderItem = ({ item }) => {
    item.STARTDATE = moment(item.STARTDATE).format("YYYY-MM-DD");
    return (
      <View style={styles.listItem}>

        <View style={styles.content}>
          <Text style={styles.name}>{item.ID}</Text>
          <Text style={styles.location}>사용 시작일: {item.STARTDATE}</Text>
        </View>
        <TouchableOpacity style={styles.detail} onPress={() => this.onPressLearnMore(item.ID)}>
          <Icon name='ios-arrow-dropright' size={25} color='#cccccc' />
        </TouchableOpacity>

      </View>
    )
  }

  renderSectionHeader = ({ section }) => {
    return (
      <Text style={styles.header}>
        {section.title}
      </Text>
    )
  }

  render() {
    console.log('list')
    /*if (!list2) {
      return (
        <View>
          <Text>lucas!</Text>
        </View>
      );
    } else {
      
    }*/
    return (
      <FlatList
        style={styles.container}
        data={this.state.list}
        renderItem={this.renderItem}
        keyExtractor={item => item.ID}
      />
      /*<SectionList
        style={styles.container}
        sections={this.state.list}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={extractKey}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
      </SectionList>*/
    );
  }

}
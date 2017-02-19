import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import ImageButton from '../components/ImageButton';
import Button from '../components/Button';
import {PAGES} from '../xiaomubiao';
export var BOTTOM_TAB = {
    flag_history: 'historyTab', flag_edit: 'editTab',
    flag_share: 'shareTab',
}

class TopBar extends Component {

  	//点击事件处理
	_onPress = (tab) =>{
		console.log('点击了底栏按钮: ' + tab);
		this.props.handleBottomPress(tab);
	}

  render() {
    console.log('render bottom bar...');
    return(
      <View style={topBarStyles.container}>
        <Text style={topBarStyles.date}>{_date.getFullYear()}年{_date.getMonth()+1}月{_date.getDate()}日{'\n'+this.getXingqi(_date.getDay())}</Text>
        <Text style={topBarStyles.mood}>心情：{xinqingData[_mood]}</Text>
        <Text style={topBarStyles.temprature}>天气：{tianqiData[_temper]}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginLeft: 40,
    // marginRight: 40
  },
  bottomButton: {
    width: 30, height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default TopBar;

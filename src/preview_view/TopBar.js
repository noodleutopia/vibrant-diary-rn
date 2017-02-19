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
import {tianqiData, xinqingData} from '../home_view/DateView';

class TopBar extends Component {

  	//点击事件处理
	_onPress = (tab) =>{
		console.log('点击了底栏按钮: ' + tab);
		this.props.handleBottomPress(tab);
	}

  render() {
    console.log('render preview top bar...');
    let _date = this.props.diary.date;  //这里的date是DateStore中插入的
    let _temper = this.props.diary.temperature; 
    let _mood = this.props.diary.mood;
    return(
      <View style={styles.container}>
        <View style={styles.firstRow}>
        <Text style={styles.date}>{_date.getFullYear()}年{_date.getMonth()+1}月{_date.getDate()}日</Text>
        <Text style={styles.mood}>心情：{_mood}</Text>
        <Text style={styles.temprature}>天气：{_temper}</Text>
        </View>
        <View style={styles.secondRow}>
        <Text style={styles.mood}>主题 {this.props.diary.tagCount}</Text>
        <Text style={styles.temprature}>回答 {this.props.diary.answerCount}</Text>
        </View>
      </View>
    );
  }

  //获得星期数
  getXingqi(day) {
    let xingqi = '';
    switch(day) {
      case 0:xingqi="星期日";break; 
      case 1:xingqi="星期一";break; 
      case 2:xingqi="星期二";break; 
      case 3:xingqi="星期三";break; 
      case 4:xingqi="星期四";break; 
      case 5:xingqi="星期五";break; 
      case 6:xingqi="星期六";break; 
      default:xingqi="系统错误！" 
    }
    return xingqi;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop:10,
    backgroundColor: '#cfcfcf',
  },
  firstRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  secondRow: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomButton: {
    width: 30, height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default TopBar;

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {dateTimeHelper} from '../utils/DateFormatUtil'
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
          <View style={{flexDirection: 'row', paddingTop: 5, flex: 1}}>
            <Text style={styles.date}>{_date.getDate()+ "日"}</Text>
            <View style={{marginLeft: 5, marginTop: 3}}>
              <Text style={styles.dateMin}>{dateTimeHelper.getInstance().xingqi(_date)}</Text>
              <Text style={styles.dateMin}>{_date.getFullYear() + "年" + (_date.getMonth() + 1) + "月"}</Text>
            </View>
          </View>
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={styles.temprature}>{_temper}</Text>
            <Text style={styles.mood}>{_mood}</Text>
          </View>


        </View>
        <View style={styles.secondRow}>
        <Text style={styles.secondText}>{this.props.diary.tagCount+'\n'}主题 </Text>
        <Text style={styles.secondText}>{this.props.diary.answerCount+'\n'}回答</Text>
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
    height: 165,
    justifyContent: 'flex-start',
    backgroundColor: '#F6A623d0',
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 25,
    paddingBottom:12
    // marginTop: 20
  },
  firstRow: {
    flex: 2,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50
    // justifyContent: 'space-around',
  },
  secondRow: {
    flex: 1,
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
  date: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
  dateMin: {
    // flex: 1,
    // textAlign: 'center',
    fontSize: 10,
    color: 'white'
  },
  mood: {
    // flex: 1,
    marginLeft: 35,
    fontSize: 15,
    textAlign: 'center',
    // marginRight: 20,
    color: 'white'
    // fontWeight: 'bold'
  },
  temprature: {
    // flex: 1,
    fontSize: 15,
    // textAlign: 'center',
    color: 'white'
    // fontWeight: 'bold'
  },
  secondText: {
    // flex: 1,
    fontSize: 10,
    // textAlign: 'center',
    color: 'white'
    // fontWeight: 'bold'
  },

});

export default TopBar;

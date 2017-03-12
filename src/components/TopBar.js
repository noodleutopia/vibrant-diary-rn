import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import DateStore from '../stores/DateStore';
import Reflux from 'reflux';
import {tianqiData, xinqingData} from '../home_view/DateView';
import {dateTimeHelper} from '../utils/DateFormatUtil'

class TopBar extends Reflux.Component {

  constructor(props)
	{
		super(props);
		this.state = {
			// selectedTags: [],
		}; // our store will add its own state to the component's
		this.store = DateStore;
	}
  
  render() {
    let _date = this.state.date;  //这里的date是DateStore中插入的
    let _temper = this.state.temperature; 
    let _mood = this.state.mood;
    let opacity = this.props.disabled ? 1 : 0.5;
    return(
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.handleTopPress}
        style={[topBarStyles.container, this.props.style]}>
          <View style={{flexDirection: 'row', paddingTop: 5, alignItems: 'center',}}>
            <Text style={topBarStyles.date}>{_date.getDate()+ "日"}</Text>
            <View style={{justifyContent: 'center', marginLeft: 5, marginTop: 1}}>
              <Text style={topBarStyles.dateMin}>{dateTimeHelper.getInstance().xingqi(_date)}</Text>
              <Text style={topBarStyles.dateMin}>{_date.getFullYear() + "年" + (_date.getMonth() + 1) + "月"}</Text>
            </View>
          </View>
          <View style={{position: 'absolute', flexDirection: 'row', right: 20, bottom: 20}}>
            <Text style={topBarStyles.temprature}>{tianqiData[_temper]}</Text>
            <Text style={topBarStyles.mood}>{xinqingData[_mood]}</Text>
          </View>

      </TouchableOpacity>
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

TopBar.propTypes = {
  handleTopPress: React.PropTypes.func.isRequired,
  style: View.propTypes.style,
  disabled: React.PropTypes.bool, 
};

TopBar.defaultProps = {
  disabled: false
};

var topBarStyles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 105,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#F6A623d0',
    paddingLeft: 25
    // marginTop: 20
  },
  date: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  dateMin: {
    // flex: 1,
    // textAlign: 'center',
    fontSize: 10
  },
  mood: {
    // flex: 1,
    marginLeft: 15,
    fontSize: 15,
    textAlign: 'center',
    // fontWeight: 'bold'
  },
  temprature: {
    // flex: 1,
    fontSize: 15,
    textAlign: 'center',
    // fontWeight: 'bold'
  },
});

export default TopBar;
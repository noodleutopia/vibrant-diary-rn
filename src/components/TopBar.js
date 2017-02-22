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
        style={[this.props.style]}>
        <View style={topBarStyles.container}>
          <Text style={topBarStyles.date}>{dateTimeHelper.getInstance().format(_date)+'\n'+dateTimeHelper.getInstance().xingqi(_date)}</Text>
          <Text style={topBarStyles.mood}>心情：{xinqingData[_mood]}</Text>
          <Text style={topBarStyles.temprature}>天气：{tianqiData[_temper]}</Text>
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
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#ddfdfd',
    // marginTop: 20
  },
  date: {
    flex: 1,
    textAlign: 'center',
  },
  mood: {
    flex: 1,
    textAlign: 'center',
  },
  temprature: {
    flex: 1,
    textAlign: 'center',
  },
});

export default TopBar;
import React, {Component} from 'react';
import{
  View,
  Text,
  StyleSheet,
  Switch,
  AsyncStorage,
  Linking,
  PushNotificationIOS,
  Platform
} from 'react-native';
const KEY_CLOCK_TIME = 'clock_time';
import Button from '../components/Button';
import {PushNotification} from '../utils/NotificationUtil'
import DateTimePicker from 'react-native-modal-datetime-picker';

class SettingView extends Component {

  constructor() {
    super();
  }

  handlePressEmail(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    console.log('render SettingView view here...');
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Button style={{ position: 'absolute', width: 60, left: 0, margin:0, marginTop: 30, padding: 0, backgroundColor: 'transparent'}} text={"返回"} onPress={this.props.quit}/>
          <Text style={{textAlign:'center', fontSize: 17,}}>设置</Text>
        </View>
        <View style={{flex: 1, marginTop: 10, marginLeft: 20, marginRight: 20}}>
          <ClockView />
          <View style={{height:1, backgroundColor: 'black'}} />
          <View style={[styles.item, {justifyContent: 'space-between'}]}>
            <Text>联系我们</Text>
            <Text onPress={()=>this.handlePressEmail('mailto:vibrantdiary@outlook.com')}>vibrantdiary@outlook.com</Text>
          </View>
          <View style={{height:1, backgroundColor: 'black'}} />
        </View>
      </View>
    )
  }
}

SettingView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

class ClockView extends React.Component {

  state = {
    isDateTimePickerVisible: false,
    switchOn : false,
    time: new Date(),
  };

  componentDidMount() {
    AsyncStorage.getItem(KEY_CLOCK_TIME).then((time)=>{
      if(time!=null && time != 'close') {
        this.setState({time: new Date(time), switchOn: true});
      }
    }).catch().done();
  }

  setNotify(time) {
    let now = new Date();
    let temp = new Date(time.setSeconds(0));
    let date = time < now ? new Date(temp.setDate(time.getDate()+1)): time;
    console.log('设定闹钟： ',  time, date);

    if(Platform.OS == "ios") {
      PushNotificationIOS.scheduleLocalNotification(
        {
          fireDate : date,
          alertBody : "写一篇日记来记录今天的活动和心得吧~",
          repeatInterval : 'day'
        }
      );
    } else {
      PushNotification.localNotificationSchedule({
        message: "写一篇日记来记录今天的活动和心得吧~", // (required)
        date: date,
        repeatType: 'day',
        // repeatTime: 10000
      });
    }

  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (time) => {
    console.log('A time has been picked: ', time.toLocaleDateString() +
      ' ' +
      time.toLocaleTimeString())
    AsyncStorage.setItem(KEY_CLOCK_TIME, time.toString()).then(()=>{
      this._hideDateTimePicker();
      this.setState({time: time});
      this.setNotify(time);
    }).catch((error)=>{
      console.log('AsyncStorage error: ' + error.message);
    }).done();
  }

  render() {
    return (
      <View style={styles.item}>
        <Text>每日提醒</Text>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          {this.renderTime()}
          <Switch
            onValueChange={(value) => this.handleSwitch(value)}
            value={this.state.switchOn} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            mode="time"
            is24Hour={true}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>

      </View>
    );
  }

  renderTime() {
    if(this.state.switchOn) {
      return(<Text style={{flex: 2, textAlign:'right', paddingRight: 10}}>{this.state.time.getHours()+'时'+this.state.time.getMinutes()+'分'}</Text>);
      // AsyncStorage.getItem(KEY_CLOCK_TIME)
      //   .then((time)=>{
      //     if(time == null) time = new Date();
      //     return(<Text style={{flex: 2}}>{time}</Text>);
      //   })
      //   .catch((error)=> {
      //   console.log('AsyncStorage error: ' + error.message);}).done();
    }
  }

  handleSwitch(on) {
    if(on) {
      //显示Date Picker
      this.setState({isDateTimePickerVisible: true, switchOn: on, time: new Date(),});
    } else {
      this.setState({switchOn: on});
      if(Platform.OS == "ios") {
        PushNotificationIOS.cancelAllLocalNotifications();
      } else {
        PushNotification.cancelAllLocalNotifications(); //关闭提醒
      }
      AsyncStorage.setItem(KEY_CLOCK_TIME, 'close').then(()=>{
      }).catch((error)=>{
        console.log('AsyncStorage error: ' + error.message);
      }).done();
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  top: {
    height: 70,
    paddingTop:22,
    backgroundColor: '#F6A623d0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  itemTitle: {
    flex: 1,
  },
});

export default SettingView;
import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import Button from '../components/Button';
import GridView from '../components/GridView';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DateActions} from '../AllActions';
import Reflux from 'reflux';
import DateStore from '../stores/DateStore';
import SelectableItem from '../components/SelectableItem';

const itemsPerRow = 4;

// Use data from an array...
export const tianqiData = ['晴','阴','雨','雪','多云','霾','大风','雾'];

export const xinqingData = ['开心','忧虑','平淡','伤心','愤怒','惊讶','尴尬','无奈'];
  
class DateView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.state = {
      // date: new Date(),
      isDateTimePickerVisible: false,
    };
    this.store = DateStore;
    console.log('wid, hei: ', wid, hei);

  }

   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.toLocaleDateString() +
            ' ' +
            date.toLocaleTimeString())
    this._hideDateTimePicker()
    DateActions.updateDate(date);
  }

  // _onPress = this.props.quit;
    _onPress(name) {
      switch(name){
        case 'date':
        return this._showDateTimePicker;
        break;
        case 'done':
        DateActions.writeAll();
        return this.props.quit;
      }
    };

    onSelected(name, itemId) {
      switch(name) {
        case 'tianqi':
        DateActions.updateTemperature(itemId);
        break;
        case 'xinqing':
        DateActions.updateMood(itemId);
        break;
      }
    }

  render() {
    console.log('render DateView view here...');
    let _date = this.state.date;  //这里的date是DateStore中插入的
    let _selectedTianqi = this.state.temperature;
    let _selectedXinqing = this.state.mood;
    return(
      <ScrollView contentContainerStyle={styles.container}>
        <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onPress('date')}>
          <View style={styles.dateContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 15, height: 15}} source={require('../../res/images/date_clock.png')} />
              <Text style={styles.dateText}>{_date.getFullYear()}年{_date.getMonth()+1}月{_date.getDate()}日</Text>
            </View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>天气</Text>
        <GridView
          itemStyle={styles.list}
          rowStyle={styles.row}
          data={tianqiData}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            return (
               <SelectableItem item={item} itemId={itemID} setSelected={()=>this.onSelected('tianqi', itemID)} selectedId={_selectedTianqi}/>
            );
        }}/>
        <Text style={styles.title}>心情</Text>
        <GridView 
          itemStyle={styles.list}
          rowStyle={styles.row}
          data={xinqingData}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            return (
               <SelectableItem item={item} itemId={itemID} setSelected={()=>this.onSelected('xinqing', itemID)} selectedId={_selectedXinqing}/>
            );
        }}/>
        <Button style={{backgroundColor:'#F6A623d0', alignSelf:'flex-end', marginTop: hei/20, marginRight: wid/10}} text={'完成'} onPress={this._onPress('done')}/>
        </View>
      </ScrollView>
    );
  }
}

DateView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};
const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const WID = 750/2;
const HEI = 1334/2;
var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: 15,
    marginTop: 10*hei/HEI,
    marginBottom: 10*hei/HEI
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 40*wid/WID,
    paddingRight: 40*wid/WID,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 60*hei/HEI
  },
  title: {
    // flex: 1,
    marginTop: 40*hei/HEI,
    marginBottom: 20*hei/HEI,
    textAlign: 'center',
    color: '#4B4B4B'
  },
  dateContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 5*wid/WID,
    color: '#4B4B4B'
  }
});

export default DateView;
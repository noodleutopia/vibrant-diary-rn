import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Button from '../components/Button';
import GridView from '../components/GridView';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DateActions} from '../AllActions';
import Reflux from 'reflux';
import DateStore from '../stores/DateStore';
import SelectableItem from '../components/SelectableItem';

const itemsPerRow = 3;

// Use data from an array...
export const tianqiData = ['晴','阴','雨','雪','多云'];

export const xinqingData = ['开心','忧虑','平淡','伤心','愤怒'];
  
class DateView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.state = {
      // date: new Date(),
      isDateTimePickerVisible: false,
    };
    this.store = DateStore;
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
      <View style={styles.container}>
        <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onPress('date')}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>日期：{_date.getFullYear()}年{_date.getMonth()+1}月{_date.getDate()}日</Text>
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
          data={xinqingData}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            return (
               <SelectableItem item={item} itemId={itemID} setSelected={()=>this.onSelected('xinqing', itemID)} selectedId={_selectedXinqing}/>
            );
        }}/>
        </View>
				<Button style={{position:'absolute', bottom:70, right:20}} text={'完成'} onPress={this._onPress('done')}/>
      </View>
    );
  }
}

DateView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#00a600',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 40
  },
  title: {
    // flex: 1,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  dateContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateText: {
    backgroundColor: '#008800',

  }
});

export default DateView;
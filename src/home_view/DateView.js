import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Button from '../components/Button';
import GridView from '../components/GridView';
import DateTimePicker from 'react-native-modal-datetime-picker'

const itemsPerRow = 3;

// Use data from an array...
const data = Array(20)
  .fill(null)
  .map((item, index) => index + 1);
  
class DateView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      
      isDateTimePickerVisible: false
    }
    console.log('today: ' + this.state.date);
  }

   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.toLocaleDateString() +
            ' ' +
            date.toLocaleTimeString())
    this._hideDateTimePicker()
    this.setState({date: date});
  }

  // _onPress = this.props.quit;
    _onPress(name) {
      switch(name){
        case 'date':
        return this._showDateTimePicker;
        break;
        case 'done':
        return this.props.quit;
      }
    };


  render() {
    console.log('render DateView view here...');
    let _date = this.state.date;
    console.log('date here: ' + _date);
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
          data={data}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            return (
              <View style={{ flex: 1, backgroundColor: '#8F8', borderWidth: 1 }}>
                <Text>{`${item} (${sectionID}-${rowID}-${itemIndex}-${itemID})`}</Text>
              </View>
            );
        }}/>
        <Text style={styles.title}>心情</Text>
        <GridView 
          data={data}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            return (
              <View style={{ flex: 1, backgroundColor: '#8F8', borderWidth: 1 }}>
                <Text>{`${item} (${sectionID}-${rowID}-${itemIndex}-${itemID})`}</Text>
              </View>
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
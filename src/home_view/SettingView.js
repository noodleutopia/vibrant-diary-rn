import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
class SettingView extends Component {

  render() {
    console.log('render SettingView view here...');
    return(
      <View style={diaryStyles.container}>
        <Text style={diaryStyles.title}>This is a setting view page.</Text>
        <Button onPress={this.props.quit}/>
      </View>
    )
  }
}

SettingView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

var diaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f10000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default SettingView;
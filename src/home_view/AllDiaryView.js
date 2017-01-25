import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
class AllDiaryView extends Component {

  render() {
    console.log('render AllDiaryView view here...');
    return(
      <View style={diaryStyles.container}>
        <Text style={diaryStyles.title}>This is a all diary view page.</Text>
        <Button onPress={this.props.quit}/>
      </View>
    )
  }
}

AllDiaryView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

var diaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00e700',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AllDiaryView;
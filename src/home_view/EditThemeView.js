import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
class EditThemeView extends Component {

  render() {
    console.log('render EditThemeView view here...');
    return(
      <View style={diaryStyles.container}>
        <Text style={diaryStyles.title}>This is a edit theme view page.</Text>
        <Button onPress={this.props.quit}/>
      </View>
    )
  }
}

EditThemeView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

var diaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000f3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default EditThemeView;
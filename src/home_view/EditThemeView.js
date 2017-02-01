import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
import Reflux from 'reflux';
import TagStore from '../stores/TagStore';

class EditThemeView extends Reflux.Component {

    constructor(props) {
    super(props);
    console.log('EditThemeView');
    this.store = TagStore; // <- just assign the store class itself
  }

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
import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
class TagEditView extends Component {

  render() {
    console.log('render TagEditView view here...');
    return(
      <View style={styles.container}>
        <Text style={styles.title}>This is a tag edit view page.</Text>
        <Button onPress={this.props.quit}/>
      </View>
    )
  }
}

TagEditView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a600',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default TagEditView;
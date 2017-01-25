import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
class ShareView extends Component {

  render() {
    console.log('render DataAnalyzeView view here...');
    return(
      <View style={styles.container}>
        <Text style={styles.title}>This is a share view page.</Text>
        <Button onPress={this.props.navigator.pop}/>
      </View>
    )
  }
}

ShareView.propTypes = {
  
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

export default ShareView;
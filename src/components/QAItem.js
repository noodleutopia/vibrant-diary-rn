/**
 * 问答框
 */
import React, {Component} from 'react';
import ReactNative, {
	View,
	Text,
	StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Keyboard,
  Dimensions,
  Image,
  } from 'react-native'

  class QAItem extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return(
        <View style={styles.container}>
          <Text style={styles.question}> {this.props.itemId+1}.{this.props.qaItem.question}</Text>
          <Text style={styles.answer}>{this.props.answer} </Text>
        </View>
        
        // <TouchableWithoutFeedback onPress={this._empty()}>
        // <View style={[styles.toolBar, this.props.style]}>
        // <Button text={'字体'} style={styles.toolButton} onPress={this._empty()}/>
        // <Button text={'图片'} style={styles.toolButton} onPress={this._empty()}/>
        // </View>
        // </TouchableWithoutFeedback>
      );
    }
  }

  var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  question: {
    flex: 2,
    marginLeft: -3,
    marginTop: 2,
  },
  answer: {
    flex: 5,
    marginTop: 5,

  },

});

  export default QAItem;
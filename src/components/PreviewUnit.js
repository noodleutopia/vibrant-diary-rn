/**
 * 日记预览中的正文单元，包括一个主题标签和下面的若干问题、回答。
 */
import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  WebView,
} from 'react-native';

class PreviewUnit extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;  //数据单元数组
  }
  render() {
    console.log('render PreviewUnit here...');
    return(
      <View style={styles.container}>
        <Text style={styles.tag}>{this.data.tag}</Text>
        {this.renderItem(this.data.questions, this.data.answers)}
      </View>
    )
  }
  renderItem(questions, answers) {
    let array = [];
    for(let i=0; i<questions.length; ++i) {
      array.push(
      <View  key={i}>
        <Text style={styles.question}> {questions[i]} </Text>
        <Text style={styles.answer}> {answers[i]} </Text>
      </View>
      );
    }
    return array;
  }

}
var styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#0aaacf',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 10
  },
  QAContainer: {
    // flex: 1,
    backgroundColor: '#0aaacf',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  tag: {
    // flex: 1,
    fontSize: 30,
    justifyContent: 'center',
    // alignItems: 'center'
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 15,
  },
  question: {
    // flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    // alignItems: 'center'
    fontWeight: 'bold'
  },
  answer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
    marginTop: 10,
  },
});
export default PreviewUnit;
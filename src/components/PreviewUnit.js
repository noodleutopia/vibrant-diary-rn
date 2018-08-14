/**
 * 日记预览中的正文单元，包括一个主题标签和下面的若干问题、回答。
 */
import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  WebView,
  Platform
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
      <View  style={styles.QAContainer} key={i}>
        <Text style={styles.question}>{questions[i]}</Text>
        <Text style={styles.answer}>{answers[i]}</Text>
      </View>
      );
    }
    return array;
  }

}
var styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20
  },
  QAContainer: {
    // flex: 1,
    // backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center'
    marginTop: 10,
    marginBottom: 15
  },

  tag: {
    // flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    color: '#4B4B4B',
    // alignItems: 'center'
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 10,
  },
  question: {
    // flex: 1,
    fontSize: 17,
    color: '#4B4B4B',
    lineHeight: 25,
    // justifyContent: 'center',
    // alignItems: 'center'
    fontWeight: Platform.OS == "ios"? 'normal':'bold'
  },
  answer: {
    // flex: 1,
    fontSize: 17,
    justifyContent: 'center',
    color: '#4B4B4B',
    // alignItems: 'center'
    fontWeight: '100',
    lineHeight: 25,
    marginTop: 6,
  },
});
export default PreviewUnit;
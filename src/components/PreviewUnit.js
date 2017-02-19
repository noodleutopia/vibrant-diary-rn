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

var WEBVIEW_REF = 'webview';
class PreviewUnit extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;  //数据单元数组
  }
  render() {
    console.log('render PreviewView view here...');
    return(
      <View style={{flex: 1}}>
      {
        for() {

        }
      }
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000cf',
    justifyContent: 'center',
    alignItems: 'center'
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default PreviewView;
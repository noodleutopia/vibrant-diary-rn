import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import ImageButton from '../components/ImageButton';
import Button from '../components/Button';
import {PAGES} from '../xiaomubiao';
export var BOTTOM_TAB = {
    flag_history: 'historyTab', flag_edit: 'editTab',
    flag_share: 'shareTab',
}

class BottomBar extends Component {

  	//点击事件处理
	_onPress = (tab) =>{
		console.log('点击了底栏按钮: ' + tab);
		this.props.handleBottomPress(tab);
	}

  render() {
    console.log('render bottom bar...');
    return(
      <View style={styles.container}>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/Fill 61.png')}
      onPress={()=>this._onPress(BOTTOM_TAB.flag_edit)} text="编辑"/>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/diary-list.png')}
      onPress={()=>this._onPress(BOTTOM_TAB.flag_history)} text="日记列表"/>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/Fill 108.png')}
      onPress={()=>this._onPress(BOTTOM_TAB.flag_share)} text="分享"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginLeft: 40,
    // marginRight: 40
  },
  bottomButton: {
    width: 25, height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: Image.resizeMode.center,
  },

});

export default BottomBar;

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
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/ic_polular.png')}
      onPress={()=>this._onPress(BOTTOM_TAB.flag_edit)}/>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/ic_trending.png')}
      onPress={()=>this._onPress(BOTTOM_TAB.flag_history)}/>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/ic_favorite.png')}
      onPress={()=>this._onPress(BOTTOM_TAB.flag_share)}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginLeft: 40,
    // marginRight: 40
  },
  bottomButton: {
    width: 30, height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default BottomBar;

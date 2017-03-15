import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import ImageButton from './ImageButton';
import Button from './Button';
import {PAGES} from '../xiaomubiao';
// export var FLAG_TAB = {
//     flag_historyTab: 'historyTab', flag_editThemeTab: 'editThemeTab',
//     flag_dataTab: 'dataTab', flag_settingTab: 'settingTab'
// }

class BottomBar extends Component {

  	//点击事件处理
	_onPress (tab){
		console.log('点击了底栏按钮: ' + tab);
		this.props.handleBottomPress(tab);
	}

/*注意，下面的ImageButton属性中，onPress的定义如果不用箭头符号，会导致BottomBar渲染时就调用_onPress，导致错误 */
  render() {
    console.log('render bottom bar...');
    return(
      <View style={[styles.container, this.props.style]}>
        <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/Path Copy 2.png')}
                     onPress={()=>this._onPress(PAGES.page_all_diary)} text="历史"/>
        <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/Group@3x.png')}
        onPress={()=>this._onPress(PAGES.page_edit_theme)} text="编辑主题"/>
        <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/ic_unstar_navbar.png')}
        onPress={()=>this._onPress(PAGES.page_data_analyze)} text="成就"/>
        <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/setting.png')}
        onPress={()=>this._onPress(PAGES.page_setting)} text="设置"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fcfcfccc',
    // marginLeft: 40,
    // marginRight: 40
  },
  subContainer: {
    height: 50,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 40,
    // marginRight: 40
  },
  bottomButton: {
    width: 23, height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 7,
    marginTop: 5,
  },

});

export default BottomBar;

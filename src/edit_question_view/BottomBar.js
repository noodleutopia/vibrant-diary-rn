import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import ImageButton from '../components/ImageButton';
import colors from '../styles/colors';
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
      <View style={styles.container}>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/圆叉.png')}
      onPress={()=>this._onPress('back')}/>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/add.png')}
      onPress={()=>this._onPress('add')}/>
      <ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/圆对勾.png')}
      onPress={()=>this._onPress('done')}/>
      {/*<ImageButton imageStyle={styles.bottomButton} source={require('../../res/images/ic_my.png')}
      onPress={()=>this._onPress(PAGES.page_setting)}/>*/}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.mango,
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

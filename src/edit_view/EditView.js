/**
 * 问答框编辑视图
 * 遗留问题：键盘弹出时的滚动
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
    Platform,
  } from 'react-native'

import Button from '../components/Button'
import dismissKeyboard from 'dismissKeyboard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const toolBarHeight=40;

class EditView extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      keyboardShow: false,
      keyboardHeight: 0,
      text: this.props.answer,};
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
  }

  componentWillMount () {
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
  }

  _keyboardDidShow = (e) =>{
    // alert('Keyboard Shown');
    // this.state.keyboardShow = true;
    
     console.log('_keyboardDidShow!'+ e.duration);
     this.setState({keyboardShow: true, keyboardHeight: e.endCoordinates.screenY});
  }

  _keyboardDidHide =()=> {
    // alert('Keyboard Hidden');
    this.setState({keyboardShow: false});
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _onPress= () =>{
    dismissKeyboard();
    let answer = this.state.text;
    if(answer != this.props.answer) {
      //这里更新answer
      this.props.getAnswer(answer);
      // QuestionActions.editQuestion(this.props.question, this.props.question.question, answer);
    }
    this.props.navigator.pop();
  }

  _onBlur = ()=> {
    console.log('blur!');
    this.setState({keyboardShow: false});
    dismissKeyboard();
  }

  _onFocus() {
    console.log('focus!');
  }

  _scrollToInput(name){
    return ()=>console.log('press!');
  // Add a 'scroll' ref to your ScrollView
  // this.setTimeout(() => {
  //    this.refs.scroll.scrollToPosition(0, 0, true);
  //   }, 200)
  
  // this.refs.scroll.scrollToFocusedInput(reactNode)
  }

  _showView() {
    console.log('showView?: ' + this.state.keyboardShow);
    if(this.state.keyboardShow){
          return(
            <TextToolBar style={{top:(Platform.OS == 'android' ? this.state.keyboardHeight-toolBarHeight-20
              : this.state.keyboardHeight-toolBarHeight)}} />
            );
        }
  }

  render() {
    //插入图片区域，先不做
    //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //   <Image
    //   style={[{width: 24, height: 24}, this.props.imageStyle]}
    //   source={require('../../res/images/ic_favorite.png')}
    //   />
    //   <Image
    //   style={[{width: 24, height: 24}, this.props.imageStyle]}
    //   source={require('../../res/images/ic_trending.png')}
    //   />
    // </View>
    return(
      <TouchableWithoutFeedback
      onPress={this._onBlur}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{paddingLeft:10, flex:3}}>
              <Text style={{ marginBottom:5}}>{this.props.question.question}</Text>
            </View>
            <Button style={{flex:1, marginRight: 10}}text={'完成'} onPress={this._onPress}/>
          </View>
          <KeyboardAwareScrollView 
          ref='scroll' 
          enableAutoAutomaticScroll={false}
          extraHeight={-100}
          extraScrollHeight={toolBarHeight}
          contentContainerStyle={{flex:1}}>
            <View style={{flex:1}}>
            <TextInput 
            placeholder="在这里写下答案"
            autoFocus={false}
            multiline={true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            // onBlur={this._onBlur}
            onFocus={this._onFocus}
            autoCorrect={false}
            style={styles.editText}/>
            </View>
          </KeyboardAwareScrollView>
           {this._showView()}
        </View>
       
      </TouchableWithoutFeedback>
    );
  }
}

class TextToolBar extends Component {

  _empty(){
    return ()=>console.log('press empty!');
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={this._empty()}>
      <View style={[styles.toolBar, this.props.style]}>
      <Button text={'字体'} style={styles.toolButton} onPress={this._empty()}/>
      <Button text={'图片'} style={styles.toolButton} onPress={this._empty()}/>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
  },
  title: {

  },
  editText: {
    // height: 500,
    flex: 1,
    margin: 5,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 3,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  toolBar: {
    width: Dimensions.get('window').width,
    height: toolBarHeight,
    backgroundColor: 'gray',
    flexDirection: 'row',
    position:'absolute', 
    alignItems: 'center',
  },
  toolButton: {
    margin:0, 
    padding:10, 
    height:toolBarHeight,
  }
});



export default EditView;
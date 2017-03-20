import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
	ScrollView,
  Dimensions,
} from 'react-native'

import Button from '../components/Button';
import ImageButton from '../components/ImageButton';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import TagsGridView from '../components/TagsGridView';
import colors from '../styles/colors';
import DiaryStore from '../stores/DiaryStore';
import DateStore from '../stores/DateStore';
// import TagStore from '../stores/TagStore';
import {TagActions} from '../AllActions';
import Reflux from 'reflux';
import {PAGES} from '../xiaomubiao';


var selectedTags = [];
class HomeView extends Reflux.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			// selectedTags: [],
		}; // our store will add its own state to the component's
		// this.store = DiaryStore;
		// this.storeKeys = ['diarys'];
	}

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState, this.props.navigator.getCurrentRoutes());
    //不可见时，不渲染
		let routes = this.props.navigator.getCurrentRoutes();
		if(routes[routes.length-1] != 'home') {
    	return false;
		}
		return this.state != nextState;
		// return nextState.diarys != this.state.diarys;
  }

  componentWillUnmount() {
		super.componentWillUnmount();
		console.log('componentWillUnmount');
  }

	//点击事件处理
	_onPress(){
		console.log('点击了完成按钮');
		// console.log('选择的标签有： ' + this.refs.tagsGridView.getAllSelectedTags().length);
		// this.setState({selectedTags: this.refs.tagsGridView.getAllSelectedTags()});
		selectedTags = this.refs.tagsGridView.getAllSelectedTags().slice();
		if(selectedTags.length > 0) {
			console.log('此时选择的tags: ' ,selectedTags);
			this.props.createNewDiary(selectedTags);
		} else {
			alert('请选择至少一个标签');
		}

	}

	onPressBottom(tab){
		console.log('进入homeview: ' + tab);
    this.props._onPBottom(tab);
    // if(tab == 'allDiary' && this.state.diarys.length<1){
			// alert("您还没有任何历史日记哟！");
    // } else {
    //   this.props._onPBottom(tab);
    // }
	}

	onPressTop = () =>{
		this.props._onPTop();
	}

	_addTag(){
		console.log('添加新标签');
		// TagActions.createTag('heheda');
    this.props.navigator.push({
      name: PAGES.page_new_tag,
      data: {
        // question: question,
        // answer: this.props.answers[itemID],
        // getAnswer:(newAnswer)=>{
        //   this.props.addAnswer(this.props.index, itemID, newAnswer);
        // }
      }
    });
	}

	render() {
		console.log('render home view here...');
		return(
			<View style={{flex: 1}}>
				<TopBar handleTopPress={this.onPressTop}/>
				<View style={homeStyles.container}>
					<ScrollView>
					<TagsGridView ref='tagsGridView'/>
					<View style={{justifyContent: 'center',alignItems: 'center',marginBottom:14}}>
						<ImageButton onPress={()=>this._addTag()} style={homeStyles.addButton} imageStyle={{width: 20, height: 20}}
												 source={require('../../res/images/plus.png')}/>
					</View>
					</ScrollView>
					<Button style={homeStyles.doneButton} text={'进入编辑'} onPress={()=>this._onPress()}/>
					<BottomBar style={{width: Dimensions.get('window').width, position:'absolute', bottom:0, right:0}} handleBottomPress={(tab)=>this.onPressBottom(tab)}/>
				</View>

			</View>
		);
	}
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // opacity: 0.5,
    // justifyContent: 'center',
    // alignItems: 'center',
		// marginTop: 80,
  },
	title: {
		// flex: 1,
		justifyContent: 'center',
	},
	addButton: {
    padding: 0,
    margin: 0,
		marginBottom: 50,
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCC',
    backgroundColor: '#F6F6F6',
	},
  doneButton: {
    position:'absolute',
		bottom:70,
		right:20,
    backgroundColor: '#F6A623f0',
  },
  text: {
    // flex: 1,
		fontSize: 80,
		marginBottom: 5,
    textAlign: 'center',
  },
});

export default HomeView;
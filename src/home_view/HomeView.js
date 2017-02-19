import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native'

import Button from '../components/Button';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import TagsGridView from '../components/TagsGridView';
import colors from '../styles/colors';
import DiaryStore from '../stores/DiaryStore';
import DateStore from '../stores/DateStore';
// import TagStore from '../stores/TagStore';
import {TagActions} from '../AllActions';
import Reflux from 'reflux';

var selectedTags = [];
class HomeView extends Reflux.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			// selectedTags: [],
		}; // our store will add its own state to the component's
		this.store = DiaryStore;
		this.storeKeys = ['diarys'];
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
	}

	onPressTop = () =>{
		this.props._onPTop();
	}

	_addTag(){
		console.log('添加新标签');
		TagActions.createTag('heheda');
	}

	render() {
		// console.log('render home view here...' + 'all diarys: ' + this.state.diarys.length);
		return(
			<View style={{flex: 1}}>
				<TopBar handleTopPress={this.onPressTop}/>
				<View style={homeStyles.container}>
					<ScrollView>
					<TagsGridView ref='tagsGridView'/>
					<View style={{justifyContent: 'center',alignItems: 'center',}}>
						<Button onPress={()=>this._addTag()} style={homeStyles.addButton}/>
					</View>
					</ScrollView>
					<Button style={{position:'absolute', bottom:70, right:20}} text={'完成'} onPress={()=>this._onPress()}/>
				</View>
				<BottomBar handleBottomPress={(tab)=>this.onPressBottom(tab)}/>
			</View>
		);
	}
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff00',
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
		padding: 10,
    margin: 10,
    width: 130,
    height: 130,
    backgroundColor: colors.blue,
	}
});

export default HomeView;
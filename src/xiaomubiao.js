import React, {Component} from 'react';
import {
  View,
  Navigator,
	StyleSheet,
} from 'react-native';

import HomeView from './home_view/HomeView'
import AllDiaryView from './home_view/AllDiaryView'
import DataAnalyzeView from './home_view/DataAnalyzeView'
import EditThemeView from './home_view/EditThemeView'
import SettingView from './home_view/SettingView'
import NewDiaryView from './new_diary_view/NewDiaryView'
import DateView from './home_view/DateView'
import PreviewView from './preview_view/PreviewView'
import EditView from './edit_view/EditView'
import ShareView from './preview_view/ShareView'
import EditQuestionView from './edit_question_view/EditQuestionView'
import NewTagView from './edit_question_view/NewTagView'
import EditDiaryView from './edit_diary_view/EditDiaryView'

export var PAGES = { page_new_diary: 'newDiary', page_all_diary: 'allDiary',
							page_edit_theme: 'editTheme', page_data_analyze: 'dataAnalyze',
							page_setting: 'setting', page_date: 'date', page_preview: 'preview',
						page_edit: 'edit', page_share: 'share', page_edit_question: 'editQuestion', 
					page_new_tag: 'newTag', page_edit_diary: 'editDiary'};

var Xiaomubiao = React.createClass({

  componentWillMount() {
    console.log('will mount ...');
    if (!__DEV__) {
      global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
      };
    }
  },

  componentDidMount() {
    console.log('did mount.');
  },

	//创建新日记
	_createNewDiary(tags){
		this.refs.navigator.push({
      name: PAGES.page_new_diary,
      data: {
        tags: tags,
      }
    });
	},

	//查看历史日记
	_allDiary(){
		this.refs.navigator.push({
      name: PAGES.page_all_diary,
      data: {
        message: 'I am a new diary!'
      }
    });
	},

	//编辑主题
	_editTheme(){
		this.refs.navigator.push({
      name: PAGES.page_edit_theme,
      data: {
        message: 'I am a new diary!'
      }
    });
	},

	//数据分析
	_dataAnalyze(){
		this.refs.navigator.push({
      name: PAGES.page_data_analyze,
      data: {
        message: 'I am a new diary!'
      }
    });
	},

	//设置页
	_settingPage(){
		this.refs.navigator.push({
      name: PAGES.page_setting,
      data: {
        message: 'I am a new diary!'
      }
    });
	},

	//日期心情页
	_datePage(){
		this.refs.navigator.push({
      name: PAGES.page_date,
      data: {
        message: 'I am a new diary!'
      }
    });
	},

	//日记预览页
	_previewDiary(id, backFunc) {
		console.log('back content: ' + id);
		this.refs.navigator.replace({
			name: PAGES.page_preview,
			data: {
				diaryId: id,
				callback: backFunc
			}
		})
	},

	goHome() {
    this.refs.navigator.popToTop();
  },

	_onHandleBottom(tab) {
		switch(tab) {
			case PAGES.page_all_diary:
				this._allDiary();
				break;
			case PAGES.page_edit_theme:
				this._editTheme();
				break;
			case PAGES.page_data_analyze:
				this._dataAnalyze();
				break;
			case PAGES.page_setting:
				this._settingPage();
				break;
			default:
     		console.error('Encountered unexpected route: ' + route.name);
		}
	},

	_onHandleTop() {
		this._datePage();
	},

  _renderSence(route, navigator) {
    switch (route.name) {
      case 'home':
			  console.log('navigater home view.');
				return <HomeView createNewDiary={this._createNewDiary} _onPBottom={this._onHandleBottom} navigator={navigator}
				_onPTop={this._onHandleTop}/>;
			case PAGES.page_new_diary:
			 	console.log('navigater newDiary view.');
				return <NewDiaryView quit={this.goHome} preview={this._previewDiary} navigator={navigator} route={route}/>;
			case PAGES.page_all_diary:
				return <AllDiaryView quit={this.goHome} preview={this._previewDiary}/>;
			case PAGES.page_data_analyze:
				return <DataAnalyzeView quit={this.goHome}/>;
			case PAGES.page_edit_theme:
				return <EditThemeView quit={this.goHome} navigator={navigator}/>;
			case PAGES.page_setting:
				return <SettingView quit={this.goHome}/>;
			case PAGES.page_date:
				return <DateView quit={this.goHome}/>;
			case PAGES.page_preview:
				console.log('diary id: ' + route.data.diaryId);
				return <PreviewView quit={this.goHome} {...route.data} navigator={navigator}/>;
			case PAGES.page_edit:
				console.log('QA id: ' + route.data.question.question);
				return <EditView quit={this.goHome} {...route.data} navigator={navigator}/>;
			case PAGES.page_share:
				return <ShareView navigator={navigator}/>;
			case PAGES.page_edit_question:
				return <EditQuestionView navigator={navigator} {...route.data}/>;
			case PAGES.page_new_tag:
				return <NewTagView navigator={navigator} {...route.data}/>;
      case PAGES.page_edit_diary:
        return <EditDiaryView navigator={navigator} {...route.data} preview={this._previewDiary}/>;
			default:
     		console.error('Encountered unexpected route: ' + route.name);
    }
  },

  render() {
    console.log('render here...');
    return (
			<View style={styles.container}>
				<Navigator
					ref = 'navigator'
					initialRoute = {{name: 'home'}}
					renderScene = {this._renderSence}/>
			</View>
		);
  }

});

	var styles = StyleSheet.create({
		container: {
			flex: 1
		}
	})
export default Xiaomubiao;
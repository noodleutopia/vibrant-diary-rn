import React, {Component} from 'react';
import {
  View,
  Navigator,
	StyleSheet,
  InteractionManager,
  AsyncStorage,
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
import {achieveKeys} from './home_view/DataAnalyzeView'

export var PAGES = { page_new_diary: 'newDiary', page_all_diary: 'allDiary',
							page_edit_theme: 'editTheme', page_data_analyze: 'dataAnalyze',
							page_setting: 'setting', page_date: 'date', page_preview: 'preview',
						page_edit: 'edit', page_share: 'share', page_edit_question: 'editQuestion', 
					page_new_tag: 'newTag', page_edit_diary: 'editDiary'};

var Xiaomubiao = React.createClass({

  componentWillMount() {
    // console.log('will mount ...');
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
    //这里统计使用天数
    this.getCount().done();
    // this.deleteCount().done();
  },

  async getCount() {
    try{
      let lastDay = await AsyncStorage.getItem(achieveKeys.KEY_ACHIEVE_LAST_DAY);
      let lastDayCount = await AsyncStorage.getItem(achieveKeys.KEY_ACHIEVE_DAY);
      console.log('after mount.', lastDay, lastDayCount);

      let date = new Date();
      if(lastDay != null){
        let lastDate = new Date(parseInt(lastDay));
        console.log('lastdate', lastDate);
        if(!(lastDate.getFullYear() == date.getFullYear() && lastDate.getMonth() == date.getMonth()
          && lastDate.getDate() == date.getDate()) && lastDay < date.getTime()) {
          //非同一天才统计
          await AsyncStorage.setItem(achieveKeys.KEY_ACHIEVE_LAST_DAY, date.getTime().toString());
          let temp = lastDayCount ? (parseInt(lastDayCount)+1): 1;
          await AsyncStorage.setItem(achieveKeys.KEY_ACHIEVE_DAY, temp.toString());
        } else {
        	console.log('同一天非第一次打开');
          // await AsyncStorage.setItem(achieveKeys.KEY_ACHIEVE_DAY, '56');
				}
      }else{
        //第一次使用
        await AsyncStorage.setItem(achieveKeys.KEY_ACHIEVE_LAST_DAY, date.getTime().toString());
        await AsyncStorage.setItem(achieveKeys.KEY_ACHIEVE_DAY, '1');
        console.log('first time', date);
      }
    }catch(error){
      console.log('AsyncStorage错误'+error.message);
    }
	},

	async deleteCount() {
  	try{
  		await AsyncStorage.removeItem(achieveKeys.KEY_ACHIEVE_LAST_DAY);
  		await AsyncStorage.removeItem(achieveKeys.KEY_ACHIEVE_DAY);
		} catch(e) {}
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
      }
    });
	},

	//编辑主题
	_editTheme(){
		this.refs.navigator.push({
      name: PAGES.page_edit_theme,
      data: {
      }
    });
	},

	//数据分析
	_dataAnalyze(){
		this.refs.navigator.push({
      name: PAGES.page_data_analyze,
      data: {
      }
    });
	},

	//设置页
	_settingPage(){
		this.refs.navigator.push({
      name: PAGES.page_setting,
      data: {
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
        // InteractionManager.runAfterInteractions(() => {
          // ...long-running synchronous task...
          this._allDiary();
        // });
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
				return <AllDiaryView quit={this.goHome} preview={this._previewDiary} navigator={navigator}/>;
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
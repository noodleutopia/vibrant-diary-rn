import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import Button from '../components/Button';
import BottomBar from './BottomBar'
import {PAGES} from '../xiaomubiao'
import DiaryStore from '../stores/DiaryStore';
import {DiaryActions} from '../AllActions';
import Reflux from 'reflux';
import {BOTTOM_TAB} from './BottomBar'
import {DATE_KEY,TEMPER_KEY,MOOD_KEY} from '../stores/DateStore'
import TopBar from './TopBar';
import PreviewUnit from '../components/PreviewUnit'
class PreviewView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.content = Object.create(null);  //整个日记内容
    this.store = DiaryStore;
    this.storeKeys = ['currentDiary'];
  }

  componentWillMount() {
    super.componentWillMount();
    DiaryActions.getDiary(this.props.diaryId);
  }

  onPressBottom = (tab) =>{
		console.log('preview bottom: ' + tab);
    switch(tab) {
      case BOTTOM_TAB.flag_edit:
        if(this.props.callback != null) {
          this.props.callback(this.state.currentDiary.id);
        }
        this.props.navigator.replace({
          name: PAGES.page_edit_diary,
          data: {
            diaryId: this.state.currentDiary.id,
          }
        });
        break;
      case BOTTOM_TAB.flag_share:
        this.props.navigator.push({
          name: PAGES.page_share,
          data: {
            diaryId: this.props.diaryId,
          }
        });
        break;
      case BOTTOM_TAB.flag_history:
        this.props.navigator.replace({name: PAGES.page_all_diary});
        break;
    }
	}

  render() {
    this.content = JSON.parse(this.state.currentDiary.content);
    console.log('转化的日记：', this.content);
    console.log('render PreviewView view here...', this.state.currentDiary);
    return(
      <View style={{flex: 1}}>
        <TopBar diary={this.state.currentDiary} />
        <ScrollView>
        <View style={styles.container}>
          {this.renderUnits(this.state.currentDiary)}
        </View>
        </ScrollView>
        <BottomBar handleBottomPress={this.onPressBottom}/>
      </View>
    )
  }

  renderUnits(diary) {
    let units = [];
    for(let i=0; i<diary.tagCount; ++i) {
      units.push(
        <PreviewUnit key={i} data={this.content[i]}/>
      );
    }
    return units;
  }
}

PreviewView.propTypes = {
  quit: React.PropTypes.func.isRequired,
  diaryId: React.PropTypes.number.isRequired,
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default PreviewView;
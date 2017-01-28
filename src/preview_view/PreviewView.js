import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
import BottomBar from './BottomBar'
import {PAGES} from '../xiaomubiao'
import DiaryStore from '../stores/DiaryStore';
import Reflux from 'reflux';
import {BOTTOM_TAB} from './BottomBar'
class PreviewView extends Component {

  constructor(props) {
    super(props);
    // this.store = DiaryStore;
  }

  onPressBottom = (tab) =>{
		console.log('preview bottom: ' + tab);
    switch(tab) {
      case BOTTOM_TAB.flag_edit:
        this.props.navigator.pop();
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
    console.log('render DataAnalyzeView view here...');
    // console.log('all diarys: ' + this.state.diarys.length);

    return(
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>This is a diary preview view page.</Text>
          <Text style={styles.title}>diary id is: {this.props.diaryId}.</Text>
          <Button onPress={this.props.quit}/>
        </View>
        <BottomBar handleBottomPress={this.onPressBottom}/>
      </View>
    )
  }
}

PreviewView.propTypes = {
  quit: React.PropTypes.func.isRequired,
  diaryId: React.PropTypes.number.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000cf',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default PreviewView;
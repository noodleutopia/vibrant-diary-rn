import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TabPageView from '../components/TabPageView';
import {DiaryActions} from '../AllActions';

class NewDiaryView extends Component {
// class NewDiaryView extends Component {

  constructor(props) {
    super(props);
    console.log('新日记的tags: ' + this.props.route.data.tags.length);
    this.tags = this.props.route.data.tags;
    this.allQuestions = [];
    this.state = {};
  }

  _onPress(name){
    switch(name) {
      case 'done':
        //这里写入新日记
        DiaryActions.createDiary(this.tags, this.allQuestions, 'temp answer');
        this.props.preview(123);
        break;
      case 'back':
        this.props.navigator.pop();
        break;
    }
  }

  _onChangeTab(tab) {
    console.log('_onChangeTab' + tab.i);
    this.currentTab = tab.ref.props.tagId;
  }

  // renderTabs() {
  //   let tabs = [];
  //   for(let i=0; i<this.tags.length; i++) {
  //     let tag = this.tags[i];
  //     tabs.push(<TabPageView key={i} tagId={tag.id} tabLabel={tag.tagName} {...this.props}/>);
  //   }
  //   return tabs;
  // }

  render() {
    //     <TabPageView {...this.props} tabLabel='Tab #1'/>
    // <Text tabLabel='Tab #2 word word'>favorite</Text>
    // <Text tabLabel='Tab #3 word word word'>project</Text>
    // <Text tabLabel='Tab #4 word word word word'>favorite</Text>
    // <Text tabLabel='Tab #5'>project</Text>

    //        {this.tags.map((tag, index) => <TabPageView key={index} tagId={tag.id} tabLabel={tag.tagName} {...this.props} getQuestions={this._getQuestions}/>)}
    console.log('render NewDiary view here...');
    // console.log('props: ' + this.props);
    return (
      <View style={styles.container}>
        <ScrollableTabView
        style={{paddingTop: 20, }}
        initialPage={this.props.initialPage || 0}
        renderTabBar={() => <ScrollableTabBar />}
        onChangeTab={this._onChangeTab}
        // locked={true}
        // scrollWithoutAnimation={true}
        >
        {this.tags.map((tag, index) => <TabPageView key={index} tagId={tag.id} tabLabel={tag.tagName} {...this.props} />)}
        </ScrollableTabView>
        <Button style={{position:'absolute', bottom:70, right:20}} text={'完成'} onPress={()=>this._onPress('done')}/>
        <Button style={{position:'absolute', bottom:70, left:20}} text={'返回'} onPress={()=>this._onPress('back')}/>
      </View>
    );
  }
}

NewDiaryView.propTypes = {
  quit: React.PropTypes.func.isRequired,
  preview:React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default NewDiaryView;
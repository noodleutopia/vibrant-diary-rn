/**
 * Created by zhangyafei on 2017/3/15.
 */
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
import DiaryStore from '../stores/DiaryStore';
import {PAGES} from '../xiaomubiao';
import Reflux from 'reflux';

class EditDiaryView extends Reflux.Component {

  constructor(props) {
    super(props);
    console.log('日记的id: ' ,this.props.diaryId);
    this.tags = [];
    this.questions = [];
    this.allQuestions = [];
    this.allAnswers = [];
    this.questionFlags = Array(this.tags.length).fill(false);
    this.state = {
      answers: new Array([]),
    };
    this.content = Object.create(null);  //整个日记内容
    this.store = DiaryStore;
    this.storeKeys = ['currentDiary'];
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentWillMount');
    DiaryActions.getDiary(this.props.diaryId);
  }

  componentDidMount() {
    this.content = JSON.parse(this.state.currentDiary.content);
    this.tags = Object.values(this.content).map(v=>v.tag);
    this.questions = Object.values(this.content).map(v=>v.questions);
    console.log('日记的tags: ' ,this.tags);
    //这里先将所有回答置空
    let temp = new Array(this.tags.length);
    for(let i=0;i<this.tags.length;++i) {
      if(this.content[i].answers == null || this.content[i].answers.length < 1) {
        temp[i] = new Array(this.questions[i].length).fill('');
      } else {
        temp[i] = this.content[i].answers.slice();
      }
    }
    this.setState({answers: temp});
    console.log('answers & questions', this.state.answers, this.questions);
  }

  _onPress(name){
    switch(name) {
      case 'done':
        //这里写入修改后的日记
        let jsonObjs = Array(this.tags.length);
        let questionCount = this.state.currentDiary.questionCount;
        let answerCount = this.state.currentDiary.answerCount;
        for(let i=0;i<this.tags.length;++i) {
          jsonObjs[i] = Object.create(null);
          jsonObjs[i].tag = this.tags[i];
          jsonObjs[i].questions = this.questions[i];
          // questionCount += jsonObjs[i].questions.length;
          jsonObjs[i].answers = this.state.answers[i];
          // answerCount += this.state.answers[i].length;
        }
        let newDiary = Object.create(null);
        let content = JSON.stringify(jsonObjs);
        newDiary.content = content;
        newDiary.tagCount = this.tags.length;
        newDiary.questionCount = questionCount;
        newDiary.answerCount = answerCount;
        //判断是否是新日记，新日记则新建，旧日记则修改
        console.log('修改旧日记', this.props.diaryId);
        DiaryActions.editDiary(this.props.diaryId, newDiary, this.onCreateDone);
        break;
      case 'back':
        this.props.navigator.pop();
        break;
    }
  }

  //写入日记后回调，执行跳转
  onCreateDone=(isSuccess, id)=> {
    console.log('写入回调', isSuccess);
    if(isSuccess) {
      this.props.navigator.replacePrevious({
        name: PAGES.page_preview,
        data: {
          diaryId: id,
        }
      });
      this.props.navigator.pop();
    } else {
      alert("保存日记时发生错误");
    }
  }

  _onChangeTab(tab) {
    console.log('_onChangeTab' + tab.i);
    this.currentTab = tab.ref.props.tagId;
  }

  addQuestions=(index, questions)=> {
    console.log('addQuestions before: ', index, questions);
    if(!this.questionFlags[index]) {
      this.questionFlags[index] = true;
      Array.prototype.push.apply(this.allQuestions, questions);
    }
    console.log('addQuestions after: ',  this.allQuestions);
  }

  addAnswer=(index, itemID, answer)=> {
    console.log('addAnswer:', index, itemID, answer, this.state.answers);
    let temp = this.state.answers.slice();
    console.log('before: ', temp);
    temp[index][itemID] = answer;
    console.log('after: ', temp);
    this.setState( {
      answers: temp,
    })
  }

  render() {
    console.log('render NewDiary view here...');
    console.log('all questions: ', this.questions);
    console.log('render answers', this.state.answers);
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
          {this.tags.map((tag, index) => <TabPageView key={index} index={index} tabLabel={tag} questions={this.questions[index].slice()} answers={this.state.answers[index]} addQuestions={this.addQuestions} addAnswer={this.addAnswer} {...this.props} />)}
        </ScrollableTabView>
        <Button style={{position:'absolute', bottom:70, right:20}} text={'完成'} onPress={()=>this._onPress('done')}/>
        <Button style={{position:'absolute', bottom:70, left:20}} text={'返回'} onPress={()=>this._onPress('back')}/>
      </View>
    );
  }
}

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

export default EditDiaryView;
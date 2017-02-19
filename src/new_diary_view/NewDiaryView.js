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
import QuestionStore from '../stores/QuestionStore';
import AnswerStore from '../stores/AnswerStore';
import {QuestionActions} from '../AllActions';
import Reflux from 'reflux';

class NewDiaryView extends Reflux.Component {

  constructor(props) {
    super(props);
    console.log('新日记的tags: ' ,this.props.route.data.tags);
    this.tags = this.props.route.data.tags;
    // this.allTagGroups = new Array(this.tags.length);
    //[{"tag":"heheda","questions":["first q","second q","third q"],"answers":[null]},{"tag":"heheda","questions":[],"answers":[null]}]
    this.allQuestions = [];
    this.allAnswers = [];
    this.questionFlags = Array(this.tags.length).fill(false);
    this.state = {
      answers: new Array([]),
    };
    this.store = QuestionStore;
    this.storeKeys = ['questions'];
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentWillMount');
    QuestionActions.getAllQuestions(this.tags);
  }

  componentDidMount() {
    //这里先将所有回答置空
    let temp = new Array(this.tags.length);
    for(let i=0;i<this.tags.length;++i) {
      temp[i] = new Array(this.state.questions[i].length).fill('');
    }
    this.setState({answers: temp});
    console.log('answers', this.state.answers);
  }

  _onPress(name){
    switch(name) {
      case 'done':
        //这里写入新日记
        let jsonObjs = Array(this.tags.length);
        let questionCount = 0;
        let answerCount = 0;
        for(let i=0;i<this.tags.length;++i) {
          jsonObjs[i] = Object.create(null);
          jsonObjs[i].tag = this.tags[i].tagName;
          jsonObjs[i].questions = Object.values(this.state.questions[i]).map(v=>v.question);
          questionCount += jsonObjs[i].questions.length;
          jsonObjs[i].answers = this.state.answers[i];
          answerCount += this.state.answers[i].length;
        }
        let newDiary = Object.create(null);
        let content = JSON.stringify(jsonObjs);
        newDiary.content = content;
        newDiary.tagCount = this.tags.length;
        newDiary.questionCount = questionCount;
        newDiary.answerCount = answerCount;
        DiaryActions.createDiary(newDiary, this.onCreateDone);
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
      this.props.preview(id);
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
    console.log('all questions: ', this.state.questions);
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
        {this.tags.map((tag, index) => <TabPageView key={index} index={index} tagId={tag.id} tabLabel={tag.tagName} questions={this.state.questions[index].slice()} answers={this.state.answers[index]} addQuestions={this.addQuestions} addAnswer={this.addAnswer} {...this.props} />)}
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
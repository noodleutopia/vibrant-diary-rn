/**
 * 每个标签tab下的问答框页面
 */
import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import GridView from '../components/GridView';
import {PAGES} from '../xiaomubiao';
import Reflux from 'reflux';
import QuestionStore from '../stores/QuestionStore';
import AnswerStore from '../stores/AnswerStore';
import DiaryStore from '../stores/DiaryStore';
// import TagStore from '../stores/TagStore';
import {QuestionActions} from '../AllActions';
import QAItem from '../components/QAItem';

const itemsPerRow = 2;
var clickItem = -1;
class TabPageView extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state={
      // data: [],
      answers: [],
    };
    this.data = [];
    console.log('加载问题的tag: ' + props.tagId + props.tabLabel);
    // QuestionActions.createQuestion(props.tagId, "first question ? "+ props.tagId);
    this.stores = [QuestionStore, AnswerStore];
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
    QuestionActions.getAllQuestions(this.props.tagId);
    this.setState({answers: Array(this.state.questions.length).fill('')});
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps, nextkey: ' + nextProps);
    QuestionActions.getAllQuestions(this.props.tagId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //通过此处判断是否需要更新页面数据，只有当前Tab展示新数据
    return nextState.tagId == this.props.tagId;
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');

  // }

  _onPress(question, itemID) {
    this.props.navigator.push({
      name: PAGES.page_edit,
      data: {
        question: question,
        answer: this.state.answers[itemID],
        getAnswer:(newAnswer)=>{
          let temp = this.state.answers;
          temp[itemID] = newAnswer;
            this.setState({
             answers:temp
            });
        }
      }
    });
  }

  getAllQuestions() {
    return this.data.slice();
  }

  render() {
    if(this.state.questions && Array.prototype.slice.call(this.state.questions)){
      this.data=Array.prototype.slice.call(this.state.questions);
    }
    // console.log('props: ' + this.props);
    return(
      <GridView
          // data={Array.prototype.slice.call(this.state.questions)}
          itemStyle={styles.container}
          data={this.data}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            // console.log('render questions: ' + item.tagId);
            return (
              <TouchableOpacity
              onPress={()=>this._onPress(item, itemID)}
              >
              <View style={styles.grid}>
                <QAItem qaItem={item} itemId={itemID} answer={this.state.answers[itemID]}/>  
              </View>
              </TouchableOpacity>
            );
        }}/>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // marginTop: 10,
    // marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
    padding: 8,
    // margin: 10,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#F6F6F6',
    // alignItems: 'center',
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: '#CCC'
  }
});

export default TabPageView;
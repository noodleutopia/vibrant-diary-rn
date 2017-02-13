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
import {QuestionActions} from '../AllActions';
import QAItem from '../components/QAItem';

const itemsPerRow = 2;
var clickItem = -1;
class TabPageView extends Component {
  constructor(props) {
    super(props);
    this.state={
      // answers: [],
    };
    this.data = [];
    console.log('加载问题的tag: ' + props.tagId + props.tabLabel);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.questions);
    //这里先将所有回答置空
    // this.setState({answers: Array(this.props.questions.length).fill('')});
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps, nextkey: ' ,nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // 通过此处判断是否需要更新页面数据，只有当前Tab展示新数据
  //   return nextState.tagId == this.props.tagId;
  // }

  _onPress(question, itemID) {
    this.props.navigator.push({
      name: PAGES.page_edit,
      data: {
        question: question,
        answer: this.props.answers[itemID],
        getAnswer:(newAnswer)=>{
          this.props.addAnswer(this.props.index, itemID, newAnswer);
        }
      }
    });
  }

  getAllQuestions() {
    return this.data.slice();
  }

  render() {
    return(
      <GridView
          itemStyle={styles.container}
          data={this.props.questions}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            // console.log('render questions: ' + item.tagId);
            return (
              <TouchableOpacity
              onPress={()=>this._onPress(item, itemID)}
              >
              <View style={styles.grid}>
                <QAItem qaItem={item} itemId={itemID} answer={this.props.answers[itemID]}/>  
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
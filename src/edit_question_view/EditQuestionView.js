import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import GridView from '../components/GridView';
import Button from '../components/Button';
import Reflux from 'reflux';
import QuestionStore from '../stores/QuestionStore';
import {QuestionActions} from '../AllActions';
import BottomBar from './BottomBar'

const itemsPerRow = 2;
class EditQuestionView extends Reflux.Component {

  constructor(props) {
    super(props);
    console.log('EditThemeView');
    this.store = QuestionStore; // <- just assign the store class itself
    this.storeKeys = ['questionsByTag'];
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentWillMount');
    QuestionActions.getQuestions(this.props.tag.id);
  }

  render() {
    console.log('render EditThemeView view here...', this.state.questionsByTag);
    return(
      <View style={styles.container}>
        <Text style={styles.top}>{this.props.tag.tagName}</Text>
        <GridView
          itemStyle={styles.container}
          data={this.state.questionsByTag}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            console.log('render question: ' + item.question);
            return (
              <View >
                <TextInput style={styles.grid}
                  autoFocus={false}
                  multiline={true}
                  defaultValue={item.question}
                  autoCorrect={false}
                />
              </View>
            );
        }}/>
        <BottomBar handleBottomPress={this.onBottomPress}/>
      </View>
    )
  }

  onBottomPress=(flag) => {
    switch(flag) {
      case 'back':
        this.props.navigator.pop();
        break;
      case 'add':
        this.addNewQuestion();
        break;
      case 'done':
        this.saveQuestions();
        break;
    }
  }

  //增加一个问题
  addNewQuestion() {
    let newQuestion = {};
    newQuestion.question = "随机问题";
    newQuestion.tagId = this.props.tag.id;
    let temp = this.state.questionsByTag;
    temp.push(newQuestion);
    this.setState({questionsByTag: temp});
  }

  saveQuestions() {

  }

  _onPress(tag, itemID) {
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
}

// EditThemeView.propTypes = {
//   quit: React.PropTypes.func.isRequired,
// };

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
      
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // marginTop: 10,
    // marginBottom: 20,
  },
  top: {
    paddingTop: 22,  
    paddingLeft: 30,
    height: 60,
    fontSize: 20,
    backgroundColor: '#ffffff',
  },
  grid: {
    justifyContent: 'center',
    padding: 8,
    // margin: 10,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: '#CCC'
  }
});

export default EditQuestionView;
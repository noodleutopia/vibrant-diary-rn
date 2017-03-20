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
import ImageButton from '../components/ImageButton';
import Button from '../components/Button';
import Reflux from 'reflux';
import QuestionStore from '../stores/QuestionStore';
import {QuestionActions} from '../AllActions';
import BottomBar from './BottomBar'

const itemsPerRow = 2;
class EditQuestionView extends Reflux.Component {

  constructor(props) {
    super(props);
    console.log('EditQuestionView');
    this.store = QuestionStore; // <- just assign the store class itself
    this.storeKeys = ['questionsByTag'];
    this.state = {
      data: []
    }
    this.deleteList = [];//删除的数据库中的问题
    this.editList = [];//编辑的数据库中的问题
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentWillMount');
    QuestionActions.getQuestions(this.props.tag.id);
  }

  componentDidMount() {
    let temp = this.state.questionsByTag;
    let data = [];
    for(let i in temp) {
      let obj = {};
      obj.id = temp[i].id;
      obj.question = temp[i].question;
      obj.tagId = temp[i].tagId;
      data.push(obj);
    }
    console.log('componentDidMount', data);
    this.setState({data: data});
  }

  render() {
    console.log('render EditThemeView view here...', this.state.data);
    return(
      <View style={styles.container}>
        <View style={{backgroundColor: 'white', paddingTop: 22, height: 60, justifyContent: 'center'}}>
          <Text style={styles.top}>{this.props.tag.tagName}</Text>
        </View>
        <GridView
          itemStyle={styles.container}
          data={this.state.data}
          dataSource={null}
          itemsPerRow={itemsPerRow}
          renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
            console.log('render question: ',item, itemID);
            return (
              <QuestionItem item={item} itemID={itemID} deleteQuestion={this._deleteQuestion}
              editQuestion={this._editQuestion}/>
            );
        }}/>
        <BottomBar handleBottomPress={this.onBottomPress}/>
      </View>
    )
  }

  _deleteQuestion=(item, itemID)=> {
    console.log('想要删除问题：', itemID, item);
    console.log('此时的数组：', this.state.data);
    let temp = this.state.data;
    temp.splice(itemID, 1);
    //如果是数据库中的问题，加入列表
    if(item.id != undefined) {
      this.deleteList.push(item);
      console.log('加入删除列表问题：', item);
    }
    this.setState({data: temp});
  }

  _editQuestion=(item, itemID, text)=> {
    let temp = this.state.data;
    //如果是数据库中的问题，加入列表
    // if(item.id != undefined) {
    //   this.editList.push(item);
    //   console.log('加入删除列表问题：', item);
    // }
    temp[itemID].question = text;
    this.setState({data: temp});
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
    let temp = this.state.data;
    temp.push(newQuestion);
    this.setState({data: temp});
  }

  saveQuestions() {
    QuestionActions.editQuestionsByTag(this.props.tag.id, this.deleteList, this.state.data, this.callback);
  }

  callback=()=> {
    this.props.navigator.pop();
  }

}

class QuestionItem extends Component {
  
  render() {
    return(
      <View style={styles.questionItem}>
        <ImageButton style={{width: 25, height:25}} imageStyle={styles.button} source={require('../../res/images/Fill 143.png')} 
        onPress={()=>this.props.deleteQuestion(this.props.item, this.props.itemID)}/>
        <TextInput style={styles.grid}
          autoFocus={false}
          multiline={true}
          defaultValue={this.props.item.question}
          onChangeText={(text) => this.props.editQuestion(this.props.item, this.props.itemID, text)}
          value={this.props.item.question}
          autoCorrect={false}
        />
      </View>
    );
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
    // paddingTop: 22,
    marginLeft: 30,
    fontSize: 20,
    backgroundColor: '#ffffff',
  },
  questionItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    width: Dimensions.get('window').width / 2-10,
    height: Dimensions.get('window').width / 3,
    backgroundColor: '#ffffff',
    margin: 5
  },
  grid: {
    flex: 1,
    padding: 5,
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    height: 15,
    width: 15,
  },
});

export default EditQuestionView;
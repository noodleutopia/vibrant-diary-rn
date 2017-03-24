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
import Reflux from 'reflux';
import QuestionStore from '../stores/QuestionStore';
import {TagActions, QuestionActions} from '../AllActions';
import BottomBar from './BottomBar'


const itemsPerRow = 2;
class NewTagView extends Reflux.Component {

  constructor(props) {
    super(props);
    console.log('NewTagView');
    this.store = QuestionStore; // <- just assign the store class itself
    // this.storeKeys = ['questionsByTag'];
    this.state = {
      tagName: '',
      data: []
    }
  }

  render() {
    console.log('render NewTagView view here...', this.state.data);
    return(
      <View style={styles.container}>
        <TextInput 
          style={styles.top} 
          placeholder='主题名称'
          onChangeText={(text) => this.setState({tagName: text})}
          value={this.state.tagName} />
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
    this.setState({data: temp});
  }

  _editQuestion=(item, itemID, text)=> {
    let temp = this.state.data;
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
    // newQuestion.tagId = this.props.tag.id;
    let temp = this.state.data;
    temp.push(newQuestion);
    this.setState({data: temp});
  }

  saveQuestions() {
    if(this.state.tagName == '') {
      alert("请输入主题名称");
    } else {
      TagActions.createTag(this.state.tagName, this.getNewTagId);
    }
  }

  getNewTagId=(success, tagId)=>{
    console.log('getNewTagId', success, tagId);
    if(success) {
      QuestionActions.editQuestionsByTag(tagId, [], this.state.data, this.callback);
    }
    
  }

  callback=()=> {
    this.props.navigator.pop();
  }
}

class QuestionItem extends Component {
  
  render() {
    return(
      <View style={styles.questionItem}>
        <ImageButton style={{width: 25, height:25}} imageStyle={styles.button} source={require('../../res/images/edit_theme_delete.png')}
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
    paddingTop: 22,  
    paddingLeft: 30,
    height: 60,
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

export default NewTagView;
import Question from './../data/AllSchema';
import Reflux from 'reflux';
import _ from 'lodash';
import {QuestionActions} from './../AllActions';
import Realm from 'realm';
import React from 'react-native';
import {QuestionSchema, TagSchema} from './../data/AllSchema'

const QUESTION_KEY = 'xiaomubiao-question';

var realm = null;
var val = null;
class QuestionStore extends Reflux.Store{
  constructor(props){
    super(props);
    console.log('QuestionStore');
    realm = new Realm({schema: [TagSchema, QuestionSchema]});
    //路径："/Users/zhangyafei/Library/Developer/CoreSimulator/Devices/80DF32C9-62D3-4B11-B817-869BFF5A8592/data/Containers/Data/Application/88C70E3C-F37A-4A23-9EEF-F3934F3A418A/Documents/default.realm"
    this.state = {
      questions: [],
      tagId: -1
    }; // <- set store's default state much like in React
    this._questions = [];
    // this.createTag('testTag-1');
    this.loadQuestions();
    this.maxId = -1;
    this.listenTo(QuestionActions.getAllQuestions, this.getAllQuestions);
    this.listenTo(QuestionActions.createQuestion, this.createQuestion); // listen to the statusUpdate action
    this.listenTo(QuestionActions.deleteQuestion, this.deleteQuestion);
    this.listenTo(QuestionActions.editQuestion, this.editQuestion);
  }

  loadQuestions() {
    try {
      val = realm.objects(QuestionSchema.name);
      if (val !== null && val.length > 0) {
        console.info('all questions: ' + val.length);
        let sortedQuestions = val.sorted('id');
        this.maxId = val.length>0 ? sortedQuestions[val.length-1].id : -1; //maxId 是当前最大的ID，再加入新tag则自增
        console.info('maxId: ' + this.maxId);
        // this.emit();
      }
      else {
        console.info(` ${QUESTION_KEY} not found on disk.`);
      }
    }
    catch (error) {
      console.error('loadQuestions error: ', error.message);
    }
  }

  getAllQuestions(tagId) {
    try {
    // this.createQuestion(tagId, "first question ? "+ tagId);
      // this.deleteAllQuestions();
      // var val = await AsyncStorage.getItem(TAG_KEY);
      // this.realm = new Realm({schema: TagSchema});
      // var val = this.realm.objects(QuestionSchema.name);
      let questions = val.filtered('tagId == '+tagId);
      if (questions !== null && questions.length > 0) {
        this._questions = questions;
        // this.emit();
      }
      else {
        console.info('tagId: '+tagId+` ${QUESTION_KEY} not found on disk.`);
        this._questions = [];
      }
      this.emit(tagId);
    }
    catch (error) {
      console.error('getAllQuestions error: ', error.message);
    }
  }

  // async _writeCards() {
  //   try {
  //     // await AsyncStorage.setItem(CARD_KEY, JSON.stringify(this._tags));
  //     var realm = this.realm;
  //     realm.write(() => {
  //       for (var i = 0; i < tags.length; i++) {
  //           var obj = tags[i];
  //           realm.create(TagSchema.name, obj);
  //       }
  //     });
  //   catch (error) {
  //     console.error('AsyncStorage error: ', error.message);
  //   }
  // },

  deleteAllQuestions() {
    // this._tags = [];
    // var realm = this.realm;
    realm.write(() => {
      let allQuestions = realm.objects(QuestionSchema.name);
      realm.delete(allQuestions); // Deletes all books
      this.maxId = -1;
      this.emit();
    });
  }

  deleteQuestion(id) {
    // this._tags = [];
    console.log('want to delete Question: ', id);
    // let realm = this.realm;
    try{
      realm.write(() => {
        console.log('限制条件: '+'id == '+id);
        let questions = realm.objects(QuestionSchema.name);
        if(questions) {
          let question = questions.filtered('id == '+id);
          console.log('delete questions: ', question.length);
          realm.delete(question);
          this.emit();
        }
      });
    } catch (error) {
      console.error('deleteQuestion error:', error.message);
    }
  }

  editQuestion(question, newQuestion) {
    realm.write(() => {
      // Create a book object
      realm.create(QuestionSchema.name, {id: question.id, question: newQuestion}, true);
    });
    this.emit();
  }

  createQuestion(tagId, question) {
    console.log('将插入问题：' + question + ' tagId: '+tagId);
    // var realm = this.realm;
    try{
      realm.write(() => {
        let newQuestion = realm.create(QuestionSchema.name, {
          id: this.maxId+1,
          tagId: tagId,
          question: question,
        });
      });
      this.maxId ++;
      // this._tags.push(new Card(front, back, deckID));
      console.log('after create: ' + realm.objects(Questionchema.name).length);
      this.emit();
    } catch (error) {
      console.error('createQuestion error: ', error.message);
    }
  }

  emit(tagId) {
    // this._writeCards().done();
    // this.trigger(this._tags);
    console.log('emit tag: ' + this.state.tagId);
    this.setState({questions: this._questions.slice(), tagId: tagId});
  }
}

export default QuestionStore;

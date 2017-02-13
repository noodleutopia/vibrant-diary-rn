import Question from './../data/AllSchema';
import Reflux from 'reflux';
import _ from 'lodash';
import {AnswerActions} from './../AllActions';
import Realm from 'realm';
import React from 'react-native';
import {AnswerSchema} from './../data/AllSchema';
import {realm} from './../Utils';

const ANSWER_KEY = 'xiaomubiao-answer';

class AnswerStore extends Reflux.Store{
    constructor(props){
    super(props);
    console.log('AnswerStore');
    this.state = {
      answers: [],
      tagId: -1
    }; // <- set store's default state much like in React
    this._answers = [];
    this.maxId = -1;
    this.loadAnswers();
    this.listenTo(AnswerActions.createAnswer, this.createAnswer);
  }

  loadAnswers() {
    try {
      val = realm.objects(AnswerSchema.name);
      if (val !== null && val.length > 0) {
        console.info('all answers: ' , val);
        this._answers = val;
        let sortedAnswers = val.sorted('id');
        this.maxId = val.length>0 ? sortedAnswers[val.length-1].id : -1; //maxId 是当前最大的ID，再加入新tag则自增
        console.info('maxId: ' + this.maxId);
        // this.emit();
      }
      else {
        console.info(` ${ANSWER_KEY} not found on disk.`);
      }
    }
    catch (error) {
      console.error('loadQuestions error: ', error.message);
    }
  }
  
  createAnswer(diaryId, questionId, answer) {
    console.log('将插入答案：' + answer + ' questionId: '+questionId);
    try{
      realm.write(() => {
        let newAnswer = realm.create(AnswerSchema.name, {
          id: this.maxId+1,
          diaryId: tagId,
          questionId: questionId,
          answer: answer
        });
      });
      this.maxId ++;
      console.log('after create: ' + realm.objects(Questionchema.name).length);
      this.emit();
    } catch (error) {
      console.error('createQuestion error: ', error.message);
    }
  }

  emit(tagId) {
    this.setState({answers: this._answers.slice(), tagId: tagId});
  }
}

export default AnswerStore;
import Diary from './../data/AllSchema';
import Reflux from 'reflux';
import _ from 'lodash';
import {DiaryActions} from './../AllActions';
import Realm from 'realm';
import { AsyncStorage } from 'react-native';
import {QuestionSchema, TagSchema, DiarySchema} from './../data/AllSchema'
import {realm} from './../Utils';
import {tianqiData, xinqingData} from '../home_view/DateView';

const DAIRY_KEY = 'xiaomubiao-diary';

const DATE_KEY = 'xiaomubiao-date';
const TEMPER_KEY = 'xiaomubiao-temperature';
const MOOD_KEY = 'xiaomubiao-mood';

class DiaryStore extends Reflux.Store {
  constructor()
  {
    super();
    console.log('DiaryStore');
    // realm = new Realm({schema: [TagSchema, QuestionSchema, DiarySchema]});
    this.state = {diarys: []}; // <- set store's default state much like in React
    this._diarys = [];
    // this.createTag('testTag-1');
    this.maxId = -1;
    this._loadDiarys();
    this.listenTo(DiaryActions.createDiary, this.createDiary); // listen to the statusUpdate action
    // this.listenTo(DiaryActions.deleteTag, this.deleteTag);
    // this.listenTo(DiaryActions.getAllDiaries, this._loadTags);
    // this.deleteTag(1);
    // this.createTag('testTag-1');

    // this.emit();
  }

   _loadDiarys() {
    try {
      // var val = await AsyncStorage.getItem(TAG_KEY);
      // this.realm = new Realm({schema: TagSchema});
      var val = realm.objects(DiarySchema.name);
      if (val !== null && val.length > 0) {
        this._diarys = val;
        console.info('all diarys: ' + val.length);
        let sortedDiarys = val.sorted('id');
        this.maxId = val.length>0 ? sortedDiarys[val.length-1].id : -1; //maxId 是当前最大的ID，再加入新tag则自增
        console.info('maxId: ' + this.maxId);
        this.emit();
      }
      else {
        console.info(`${DAIRY_KEY} not found on disk.`);
      }
    }
    catch (error) {
      console.error('_loadDiarys error: ', error.message);
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

  // deleteAllTags() {
  //   // this._tags = [];
  //   // var realm = this.realm;
  //   realm.write(() => {
  //     let allTags = realm.objects(TagSchema.name);
  //     realm.delete(allTags); // Deletes all books
  //     this.maxId = -1;
  //     this.emit();
  //   });
  // }

  // deleteTag(id) {
  //   // this._tags = [];
  //   console.log('want to delete tag: ', id);
  //   // let realm = this.realm;
  //   try{
  //     realm.write(() => {
  //       console.log('限制条件: '+'id == '+id);
  //       let tags = realm.objects(TagSchema.name);
  //       console.log('delete tag: '+ tags.length);
  //       let tag = tags.filtered('id == '+id);
  //       console.log('delete tag: ', tag.length);
  //       realm.delete(tag);
  //       this.emit();
  //     });
  //   } catch (error) {
  //     console.error('deleteTag error:', error.message);
  //   }
  // }

  // editCard(newCard) {
  //   // Assume newCard.id corresponds to an existing card.
  //   let match = _.find(this._tags, (card) => {
  //     return card.id === newCard.id;
  //   });
  //   match.setFromObject(newCard);
  //   this.emit();

  // }

  //需要传入问题数组
  /**
   *  id: "int",
        date: "date",
        temperature: "string",
        mood: "string",
        tags: {type: 'list', objectType: 'Tag'},
        questions: {type: 'list', objectType: 'Question'},
        answers: {type: 'list', objectType: 'Answer'}
   */
  async createDiary(tags, questions, answers) {
    console.log('将插入日记：',this.maxId+1, this);
    // var realm = this.realm;
    try{
      let date = await AsyncStorage.getItem(DATE_KEY);
      console.log('date: ', date);
      let mood = await AsyncStorage.getItem(MOOD_KEY);
      var temper = await AsyncStorage.getItem(TEMPER_KEY);
      realm.write(() => {
        let newDiary = realm.create(DiarySchema.name, {
          id: this.maxId+1,
          date: new Date(date),
          //这里天气心情暂时写死，后面加入AsyncStorage
          temperature: tianqiData[temper],
          mood: xinqingData[mood],
          tags: tags,
          questions: questions,
          answers: answers
        });
      });
      this.maxId++;
      console.log('after create: ' + realm.objects(DiarySchema.name).length);
      this.emit();
    } catch (error) {
      console.error('createDiary error: ', error.message);
    }
  }

  emit() {
    // this._writeCards().done();
    // this.trigger(this._tags);
    this.setState({diarys: this._diarys});
  }
}

export default DiaryStore;

import Tag from './../data/AllSchema';
import Reflux from 'reflux';
import _ from 'lodash';
import {TagActions} from './../AllActions';
import Realm from 'realm';
import React from 'react-native';
import {QuestionSchema, TagSchema} from './../data/AllSchema'

var { AsyncStorage } = React;

const TAG_KEY = 'xiaomubiao-tag';

var realm = null;
class TagStore extends Reflux.Store {
  constructor()
  {
    super();
    console.log('TagStore');
    realm = new Realm({schema: [TagSchema, QuestionSchema]});
    this.state = {tags: []}; // <- set store's default state much like in React
    this._tags = [];
    // this.createTag('testTag-1');
    this._loadTags().done();
    this.listenTo(TagActions.createTag, this.createTag); // listen to the statusUpdate action
    this.listenTo(TagActions.deleteTag, this.deleteTag);
    this.listenTo(TagActions.getAllTags, this._loadTags);
    // this.deleteTag(1);
    // this.createTag('testTag-1');
    // this.emit();
  }

  async _loadTags() {
    try {
      // var val = await AsyncStorage.getItem(TAG_KEY);
      // this.realm = new Realm({schema: TagSchema});
      var val = await realm.objects(TagSchema.name);
      if (val !== null) {
        this._tags = val;
        console.info('all tags: ' + val.length);
        let sortedTags = val.sorted('date');
        this.maxId = val.length>0 ? sortedTags[val.length-1].id : -1; //maxId 是当前最大的ID，再加入新tag则自增
        console.info('maxId: ' + this.maxId);
        this.emit();
      }
      else {
        console.info(`${TAG_KEY} not found on disk.`);
      }
    }
    catch (error) {
      console.error('_loadTags error: ', error.message);
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

  deleteAllTags() {
    // this._tags = [];
    // var realm = this.realm;
    realm.write(() => {
      let allTags = realm.objects(TagSchema.name);
      realm.delete(allTags); // Deletes all books
      this.maxId = -1;
      this.emit();
    });
  }

  deleteTag(id) {
    // this._tags = [];
    console.log('want to delete tag: ', id);
    // let realm = this.realm;
    try{
      realm.write(() => {
        console.log('限制条件: '+'id == '+id);
        let tags = realm.objects(TagSchema.name);
        console.log('delete tag: '+ tags.length);
        let tag = tags.filtered('id == '+id);
        console.log('delete tag: ', tag.length);
        realm.delete(tag);
        this.emit();
      });
    } catch (error) {
      console.error('deleteTag error:', error.message);
    }
  }

  // editCard(newCard) {
  //   // Assume newCard.id corresponds to an existing card.
  //   let match = _.find(this._tags, (card) => {
  //     return card.id === newCard.id;
  //   });
  //   match.setFromObject(newCard);
  //   this.emit();

  // }

  createTag(name) {
    console.log('将插入标签：' + name);
    // var realm = this.realm;
    try{
      realm.write(() => {
        let newTag = realm.create(TagSchema.name, {
          id: this.maxId+1,
          tagName: name,
          date: new Date(),
        });
      });
      this.maxId ++;
      // this._tags.push(new Card(front, back, deckID));
      console.log('after create: ' + realm.objects(TagSchema.name).length);
      this.emit();
    } catch (error) {
      console.error('createTag error: ', error.message);
    }
  }

  emit() {
    // this._writeCards().done();
    // this.trigger(this._tags);
    this.setState({tags: this._tags});
  }
}

export default TagStore;

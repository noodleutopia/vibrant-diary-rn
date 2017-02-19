import Reflux from 'reflux'
import { AsyncStorage } from 'react-native';
import {DateActions} from '../AllActions';

export const DATE_KEY = 'xiaomubiao-date';
export const TEMPER_KEY = 'xiaomubiao-temperature';
export const MOOD_KEY = 'xiaomubiao-mood';

class DateStore extends Reflux.Store {
  constructor() {
    super();
    console.log('DateStore');

    this.state = {
      date: null,
      temperature: 0,
      mood: 0,
    };
    this._date = new Date();
    this._temperature=0;
    this._mood=0;
    this.listenTo(DateActions.updateDate, this.updateDate);
    this.listenTo(DateActions.updateTemperature, this.updateTemperature);
    this.listenTo(DateActions.updateMood, this.updateMood);
    this.listenTo(DateActions.writeAll, this.emit);
    this.init();  //一开始赋默认值
  }

  // async _loadDate() {
  //   try {
  //     var val = await AsyncStorage.getItem(DATE_KEY);
  //     if (val !== null) {
  //       this._decks = JSON.parse(val).map((deckObj) => {
  //         return Deck.fromObject(deckObj);
  //       });
  //       this.emit();
  //     }
  //     else {
  //       console.info(`${DECK_KEY} not found on disk.`);
  //     }
  //   }
  //   catch (error) {
  //     console.error('AsyncStorage error: ', error.message);
  //   }
  // },

  async _writeDate() {
    try {
      console.log('将要写入日期： ' + this._date.toLocaleDateString() +
            ' ' +
            this._date.toLocaleTimeString());
      await AsyncStorage.setItem(DATE_KEY, this._date.toString());
    }
    catch (error) {
      console.error('AsyncStorage error: ', error.message);
    }
  }

  async _writeTemp() {
    try {
      console.log('将要写入天气： ' + this._temperature);
      await AsyncStorage.setItem(TEMPER_KEY, this._temperature.toString());
    }
    catch (error) {
      console.error('AsyncStorage error: ', error.message);
    }
  }

  async _writeMood() {
    try {
      console.log('将要写入心情： ' + this._mood);
      await AsyncStorage.setItem(MOOD_KEY, this._mood.toString());
    }
    catch (error) {
      console.error('AsyncStorage error: ', error.message);
    }
  }

  // updateAll(newDate, newTemperature, newMood) {
  //   this._date = newDate;
  //   this._temperature = newTemperature;
  //   this._mood = newMood;
  //   this.emit();
  // }

  updateDate(newDate) {
    this._date = newDate;
    this.setState({
      date: this._date,
    });
  }

  updateTemperature(newTemperature) {
    this._temperature = newTemperature;
    this.setState({
      temperature: this._temperature,
    });
  }

  updateMood(newMood) {
    this._mood = newMood;
    this.setState({
      mood: this._mood,
    });
  }

  emit() {
    this._writeDate().done();
    this._writeTemp().done();
    this._writeMood().done();
  }

  init() {
    this.emit();
    this.setState({
      date: this._date,
      temperature: this._temperature,
      mood: this._mood,
    });
  }

}

export default DateStore;
import Reflux from 'reflux';
import {DiaryActions} from './../AllActions';

import {
  ListView,
  AsyncStorage,
  InteractionManager} from 'react-native';
import {DiarySchema} from './../data/AllSchema'
import {realm} from './../Utils';
import {tianqiData, xinqingData} from '../home_view/DateView';
import {achieveKeys} from '../home_view/DataAnalyzeView'

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
    // 初始化getSectionData
    var getSectionData = (dataBlob, sectionID) => {
         return dataBlob[sectionID];
        };
    // 初始化getRowData
    var getRowData = (dataBlob, sectionID, rowID) => {
          return dataBlob[sectionID + ':' + rowID];
        };
    this.state = {
      diarys: [],
      // 初始化数据源
      dataSource: new ListView.DataSource({
        getSectionData : getSectionData,
        getRowData : getRowData,
        rowHasChanged : (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2
      }),
      currentDiary: null,
      showLoading: true,
    }; // <- set store's default state much like in React
    this._diarys = [];
    // this.createTag('testTag-1');
    this.maxId = -1;
    this._loadDiarys();
    this.listenTo(DiaryActions.createDiary, this.createDiary); // listen to the statusUpdate action
    this.listenTo(DiaryActions.getDiary, this.getDiary); 
    this.listenTo(DiaryActions.editDiary, this.editDiary);
    this.listenTo(DiaryActions.deleteDiary, this.deleteDiary);
    this.listenTo(DiaryActions.loadData, this.loadData);
    this.listenTo(DiaryActions.setCount, this.setCount);
    this.sectionList = [];
    // this.listenTo(DiaryActions.getAllDiaries, this._loadTags);
    // this.deleteTag(1);
    // this.createTag('testTag-1');

    // this.emit();
  }

   _loadDiarys() {
    try {
      var val = realm.objects(DiarySchema.name);
      if (val !== null) {
        this._diarys = val.sorted('date', true);
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

  deleteDiary(id) {
    console.log('want to delete diary: ', id);
    // this.setState({showLoading: true});
    try{
      realm.write(() => {
        console.log('限制条件: '+'id == '+id);
        let diarys = realm.objects(DiarySchema.name);
        let diary = diarys.filtered('id == '+id);
        console.log('限制后： ', diary);
        realm.delete(diary[0]);
      });
      InteractionManager.runAfterInteractions(() => {
        this.loadData();
      });
    } catch (error) {
      console.error('deleteTag error:', error.message);
    }
  }

  async createDiary(diary, callback) {
    console.log('将插入日记：',this.maxId+1, diary);
    try{
      let tempDiary = {
        id: this.maxId+1,
        tagCount: diary.tagCount,
        questionCount: diary.questionCount,
        answerCount: diary.answerCount,
        content: diary.content
      };
      const date = await AsyncStorage.getItem(DATE_KEY);
      const mood = await AsyncStorage.getItem(MOOD_KEY);
      const temper = await AsyncStorage.getItem(TEMPER_KEY);
      tempDiary.date = new Date(date);
      tempDiary.mood = xinqingData[mood];
      tempDiary.temperature = tianqiData[temper];
      realm.write(() => {
        let newDiary = realm.create(DiarySchema.name, tempDiary);
        this.maxId++;
        this.emit();
        //回调
        callback(true, this.maxId);
      });
    } catch (error) {
      //回调
      callback(false);
      console.error('createDiary error: ', error.message);
    }
  }

  async getDiary(id) {
    if(id == -1) id=this.maxId+1;
    try{
      let diarys = realm.objects(DiarySchema.name);
      let temp = diarys.filtered('id == '+id);
      if(temp != null && temp.length > 0) {
        let diary = temp[0];
        console.log('get diary: ', diary);
        this.setState({currentDiary: diary});
      }
    } catch (error) {
      console.error('createDiary error: ', error.message);
    }
  }

  editDiary(diaryId, diary, callback) {
    console.log('将修改日记：', diaryId);
    try{
      realm.write(() => {
        realm.create(DiarySchema.name, {id: diaryId, content: diary.content}, true);
      });
      //回调
      callback(true, diaryId);
    } catch (error) {
      //回调
      callback(false);
      console.error('editDiary error: ', error.message);
    }
  }

    // 加载数据
  loadData() {
    this.sectionList = [];
      var allData = this._diarys;
    // var allData = realm.objects(DiarySchema.name).sorted('date', true);
      console.log('allData', allData);
      // 定义变量
      var dataBlob = {},
          sectionIDs = [],
          rowIDs = [],
          icons = [];
      if(allData.length > 0) {
        let date = new Date(0);
        console.log('date', allData[0].date);
        let ii=-1, jj=0;
        while(jj< allData.length) {
          if(allData[jj].date.getFullYear() == date.getFullYear() &&
            allData[jj].date.getMonth() == date.getMonth()) {
            this.sectionList[ii]++;
          } else {
            date = allData[jj].date;
            this.sectionList[++ii] = 1;
          }
          jj++;
        }
        let index = 0;

        // 遍历数组中对应的数据并存入变量内
        for (let i = 0; i<this.sectionList.length; i++){
          // 将组号存入 sectionIDs 中
          sectionIDs.push(i);
          // 将每组头部需要显示的内容存入 dataBlob 中
          if(i>0)index = index + this.sectionList[i-1];
          let d = new Date(allData[index].date);
          dataBlob[i] = d.getFullYear() + '年' + (d.getMonth()+1) + '月';
          // 取出该组所有的 icon
          rowIDs[i] = [];
          // 遍历所有 icon
          for (var j = 0; j<this.sectionList[i]; j++){
            // 设置标识
            rowIDs[i].push(j);
            // 根据标识,将数据存入 dataBlob
            dataBlob[i + ':' + j] = allData[index+j];
          }
        }
        console.log('after init:', dataBlob);
      }

      // 刷新dataSource状态
      this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        showLoading: false
      });
  }

  emit() {
    this.setState({diarys: this._diarys.slice()});
  }

  async setCount() {
    try{
      await AsyncStorage.setItem(achieveKeys.KEY_ACHIEVE_DIARY, this._diarys.length.toString());
      console.log('diaryCount', this._diarys.length);
    } catch (e) {
      console.log('diaryStore', e);
    }
  }

}

export default DiaryStore;

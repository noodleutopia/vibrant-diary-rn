import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  ListView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Button from '../components/Button';
import Reflux from 'reflux';
import DiaryStore from '../stores/DiaryStore';
import {DiaryActions} from '../AllActions';
import {dateTimeHelper} from '../utils/DateFormatUtil'

class AllDiaryView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = DiaryStore;
    this.storeKeys = ['dataSource'];
    this.diaryList = [];
    this.sectionList = [];
    this.sections = [];
  }

  componentDidMount() {
    console.log('componentDidMount');
    if(this.state.dataSource == null || this.state.dataSource._dataBlob == null) {
      DiaryActions.loadData();
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps, nextkey: ' ,nextProps);
  // }

  // // 加载数据
  // loadData() {
  //     var allData = this.state.diarys;
  //     // 定义变量
  //     var dataBlob = {},
  //         sectionIDs = [],
  //         rowIDs = [],
  //         icons = [];
  //     let date = new Date(0);
  //     console.log('date', allData[0].date);
  //     let ii=-1, jj=0;
  //     while(jj< allData.length) {
  //       if(allData[jj].date.getFullYear() == date.getFullYear() && 
  //       allData[jj].date.getMonth() == date.getMonth()) {
  //         this.sectionList[ii]++;
  //       } else {
  //         date = allData[jj].date;
  //         this.sectionList[++ii] = 1;
  //       }
  //       jj++;
  //     }
  //     let index = 0;
     
  //     // 遍历数组中对应的数据并存入变量内
  //     for (let i = 0; i<this.sectionList.length; i++){
  //         // 将组号存入 sectionIDs 中
  //         sectionIDs.push(i);
  //         // 将每组头部需要显示的内容存入 dataBlob 中
  //         if(i>0)index = index + this.sectionList[i-1];
  //         let d = new Date(allData[index].date);
  //         dataBlob[i] = d.getFullYear() + '年' + (d.getMonth()+1) + '月';
  //         // 取出该组所有的 icon
  //         rowIDs[i] = [];
  //         // 遍历所有 icon
  //         for (var j = 0; j<this.sectionList[i]; j++){
  //             // 设置标识
  //             rowIDs[i].push(j);
  //             // 根据标识,将数据存入 dataBlob
  //             dataBlob[i + ':' + j] = allData[index+j];
  //         }
  //     }
  //     console.log('after init:', dataBlob);
  //     // 刷新dataSource状态
  //     this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
  //     });
  // }

  deleteDiary(id) {
    Alert.alert('温馨提醒','确定删除这篇日记吗?',[
      {text:'取消',onPress:()=>console.log('你点击了取消')},
      {text:'确定',onPress:()=>{
        console.log('你点击了确定');
        //这里删除一篇日记
        DiaryActions.deleteDiary(id);}
      },
    ]);
  }

  render() {
    console.log('render AllDiaryView view here...', this.state.dataSource);

    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Button style={{ position: 'absolute', width: 60, left: 0, margin:0, marginTop: 30, padding: 0, backgroundColor: 'transparent'}} text={"返回"} onPress={this.props.quit}/>
          <Text style={{textAlign:'center', fontSize: 17,}}>日记列表</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => <DiaryListItem rowData={rowData} sectionID={sectionID} 
            rowID={rowID} deleteDiary={this.deleteDiary} preview={this.props.preview}/>}
          renderSeparator={this._renderSeperator}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  renderSectionHeader(sectionData, sectionID){
    console.log('sectionData: ' , sectionData);
      return(
        <View style={{height: 30, alignItems: 'center', flexDirection: 'row', backgroundColor:'#cfcfcf', paddingLeft: 10}}>
          <Text>{sectionData}</Text>
        </View>

      );
    }
}

AllDiaryView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

class DiaryListItem extends Component {
  constructor(props) {
    super(props);
    console.log('item属性：', this.props);
  }

  _onPress (item) {
    console.log('你点击了Item：', item);
    this.props.preview(item.id);
  }

  render() {
    return(
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.rowData)}
        onLongPress={()=>this.props.deleteDiary(this.props.rowData.id)}
        style={styles.listItem}>

          <Text>{dateTimeHelper.getInstance().format(this.props.rowData.date) + " "
            + dateTimeHelper.getInstance().xingqi(this.props.rowData.date)}</Text>
          <Text style={{marginLeft: 20}}>{this.props.rowData.mood}</Text>

      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#00e700',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  top: {
    height: 70,
    paddingTop:22,
    backgroundColor: '#F6A623d0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingLeft: 10
    // padding: 10,
  },
});

export default AllDiaryView;
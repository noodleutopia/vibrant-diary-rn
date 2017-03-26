import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  ListView,
  TouchableOpacity,
  Alert,
  InteractionManager,
} from 'react-native';

import Button from '../components/Button';
import Reflux from 'reflux';
import DiaryStore from '../stores/DiaryStore';
import {DiaryActions} from '../AllActions';
import {dateTimeHelper} from '../utils/DateFormatUtil'
import Spinner from 'react-native-loading-spinner-overlay';
import {PAGES} from '../xiaomubiao'

class AllDiaryView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = DiaryStore;
    this.storeKeys = ['dataSource', 'showLoading'];
    this.sectionList = [];
    // this.state = {
    //   visible: true
    // }
    this.navigator = this.props.navigator;
    // this.empty = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2,});
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentWillMount');
    this.setState({showLoading: true}, ()=>{
      //这里删除一篇日记
      console.log('after show: ', this.state.showLoading);
      InteractionManager.runAfterInteractions(() => {
        // ...long-running synchronous task...
        DiaryActions.loadData();
      });
    });

  }

  componentDidMount() {
    console.log('componentDidMount');
    // InteractionManager.runAfterInteractions(() => {
    //   // ...long-running synchronous task...
    //   DiaryActions.loadData();
    // });
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevState.showLoading);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.timer && clearTimeout(this.timer);
  }


  deleteDiary=(id)=> {
    Alert.alert('温馨提醒','确定删除这篇日记吗?',[
      {text:'取消',onPress:()=>console.log('你点击了取消')},
      {text:'确定',onPress:()=>{
        console.log('你点击了确定');
        InteractionManager.runAfterInteractions(() => {

          this.setState({showLoading: true}, ()=>{
            this.timer = setTimeout(
              () => {
                //这里删除一篇日记
                console.log('after show: ', this.state.showLoading);
                DiaryActions.deleteDiary(id);
              },
              500
            );
          });
        });
        }
      },
    ]);
  }

  render() {
    console.log('render AllDiaryView view here...', this.state.dataSource, this.state.showLoading);

    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Button style={{ position: 'absolute', width: 60, left: 0, margin:0, marginTop: 30, padding: 0, backgroundColor: 'transparent'}}
                  text={"<返回"} onPress={this.props.navigator.popToTop}/>
          <Text style={{textAlign:'center', fontSize: 17,}}>日记列表</Text>
        </View>
        <Spinner visible={this.state.showLoading} textContent={""} textStyle={{color: '#FFF'}} />
        {/*{this.renderLoading()}*/}
        {/*{this.renderListView()}*/}
        <ListView
          initialListSize={1}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => <DiaryListItem rowData={rowData} sectionID={sectionID}
            rowID={rowID} deleteDiary={this.deleteDiary} navigator={this.props.navigator}/>}
          renderSeparator={this._renderSeperator}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }

  // renderListView() {
  //   if(this.state.showLoading) {
  //     return(<Text>无数据</Text>);
  //   } else {
  //     return(
  //       <ListView
  //         initialListSize={1}
  //         dataSource={this.state.dataSource}
  //         renderRow={(rowData, sectionID, rowID) => <DiaryListItem rowData={rowData} sectionID={sectionID}
  //           rowID={rowID} deleteDiary={this.deleteDiary} navigator={this.props.navigator}/>}
  //         renderSeparator={this._renderSeperator}
  //         renderSectionHeader={this.renderSectionHeader}
  //       />
  //     );
  //   }
  // }
  //
  // preview(id) {
  //   console.log('preview ' + id);
  //   this.navigator.push({
  //     name: PAGES.page_preview,
  //     data: {
  //       diaryId: id,
  //       // callback: backFunc
  //       from: 'all'
  //     }
  //   })
  // }

  renderLoading() {
    // if(this.state.dataSource == null || this.state.dataSource._cachedRowCount == 0) {
    console.log('visible? ' ,this.state.showLoading);
    if(this.state.showLoading) {
      return(
        <Spinner visible={true} textContent={""} textStyle={{color: '#FFF'}} />
      );
    }
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
    // this.props.preview(item.id);
    console.log('preview ' + item.id);
    this.props.navigator.push({
      name: PAGES.page_preview,
      data: {
        diaryId: item.id,
        // callback: backFunc
        from: 'all'
      }
    })
  }

  temp(id) {
    this.props.deleteDiary(id);
  }

  render() {
    return(
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.rowData)}
        onLongPress={()=>this.temp(this.props.rowData.id)}
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
    backgroundColor: 'white',
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
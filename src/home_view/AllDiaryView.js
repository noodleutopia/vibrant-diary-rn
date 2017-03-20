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

class AllDiaryView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = DiaryStore;
    this.storeKeys = ['dataSource'];
    this.sectionList = [];
    this.state = {
      visible: true
    }
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('componentDidMount');
    InteractionManager.runAfterInteractions(() => {
      // ...long-running synchronous task...
      DiaryActions.loadData(this.callback);
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

  deleteDiary(id) {
    Alert.alert('温馨提醒','确定删除这篇日记吗?',[
      {text:'取消',onPress:()=>console.log('你点击了取消')},
      {text:'确定',onPress:()=>{
        console.log('你点击了确定');
        this.setState({visible: true}, function () {
          //这里删除一篇日记
          DiaryActions.deleteDiary(id, this.callback);
        });
        }
      },
    ]);
  }

  callback = () =>{
    this.setState({visible: false});
  }

  render() {
    console.log('render AllDiaryView view here...', this.state.dataSource);

    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Button style={{ position: 'absolute', width: 60, left: 0, margin:0, marginTop: 30, padding: 0, backgroundColor: 'transparent'}}
                  text={"返回"} onPress={this.props.navigator.pop}/>
          <Text style={{textAlign:'center', fontSize: 17,}}>日记列表</Text>
        </View>
        {this.renderLoading()}
        <ListView
          initialListSize={1}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => <DiaryListItem rowData={rowData} sectionID={sectionID} 
            rowID={rowID} deleteDiary={()=>this.deleteDiary(rowData.id)} preview={this.props.preview}/>}
          renderSeparator={this._renderSeperator}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }

  renderLoading() {
    // if(this.state.dataSource == null || this.state.dataSource._cachedRowCount == 0) {
    console.log('visible? ' ,this.state.visible);
    if(this.state.visible) {
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
    this.props.preview(item.id);
  }

  render() {
    return(
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.rowData)}
        onLongPress={this.props.deleteDiary}
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
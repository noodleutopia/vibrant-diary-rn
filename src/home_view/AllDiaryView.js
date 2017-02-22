import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  ListView,
  TouchableOpacity,
} from 'react-native';

import Button from '../components/Button';
import Reflux from 'reflux';
import DiaryStore from '../stores/DiaryStore';
import {dateTimeHelper} from '../utils/DateFormatUtil'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class AllDiaryView extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = DiaryStore;
    this.storeKeys = ['diarys'];
  }

  render() {
    console.log('render AllDiaryView view here...', this.state.diarys);

    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Button style={{ position: 'absolute', width: 60, left: 0, margin: 0, padding: 0}} text={"返回"} onPress={this.props.quit}/>
          <Text style={{textAlign:'center', fontSize: 15,}}>日记列表</Text>
        </View>
        <ListView
          dataSource={ds.cloneWithRows(this.state.diarys)}
          renderRow={(rowData) => <DiaryListItem rowData={rowData}/>}
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
          <Text style={{backgroundColor:'yellow'}}>Section</Text>
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
    // this.props.preview(this.props.itemId);
  }

  render() {
    return(
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.rowData)}
        style={styles.listItem}>
        <View>
          <Text>{dateTimeHelper.getInstance().format(this.props.rowData.date) + " " 
            + dateTimeHelper.getInstance().xingqi(this.props.rowData.date)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    // backgroundColor: '#00e700',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  top: {
    height: 30,
    backgroundColor: '#00e700',
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
    height: 40,
    padding: 10,
  },
});

export default AllDiaryView;
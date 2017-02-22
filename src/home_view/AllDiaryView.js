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
        <ListView
          dataSource={ds.cloneWithRows(this.state.diarys)}
          renderRow={(rowData) => <DiaryListItem rowData={rowData}/>}
        />
      </View>
    )
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
    this.props.preview(this.props.itemId);
  }

  render() {
    return(
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.item)}
        style={styles.listItem}>
        <View>
          <Text>{_date.getFullYear()}年{_date.getMonth()+1}月{_date.getDate()}日{'\n'+this.getXingqi(_date.getDay())}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00e700',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  title: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AllDiaryView;
/**
 * 首页的标签表格布局
 */
import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'

import GridView from './GridView';
import Reflux from 'reflux';
import TagStore from '../stores/TagStore';
import QuestionStore from '../stores/QuestionStore';

import {TagActions} from '../AllActions';

const itemsPerRow = 2;
var selectedTags = new Map();

class TagsGridView extends Reflux.Component {
  constructor(props) {
    super(props);
    // const ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      // dataSource: ds.cloneWithRows([
      //   'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'Jackson', 'Jillian', 'Julie', 'Devin'
      // ]),
      // tags: props.tags,
      // selectedTags: [1,2,3],

    };
    this.data = [];
    // this.selectedTags = new Map();
    console.log('TagsGridView');
    this.store = TagStore; // <- just assign the store class itself
  }

  componentDidMount() {
    console.log('componentDidMount');
    // if(this.state.tags && Array.prototype.slice.call(this.state.tags)) {
    //   this.setState(Array.prototype.slice.call(this.state.tags));
    // }
  }

  componentWillReceiveProps() {
    console.log('homeview will update');
    // TagActions.getAllTags();
  }

  addTag(id) {
    console.log('addTag: ' + id);
    if(selectedTags.has(id)) {
      selectedTags.delete(id);
    } else {
      selectedTags.set(id, true);
    }
  }

  render() {
    this.data = Array.prototype.slice.call(this.state.tags);
    if(this.data == null) {
      this.data = [];
      console.log('tag get PROS');
    }
    this.test();
    return (
      <GridView
        // contentContainerStyle={styles.list}
        itemStyle={styles.list}
        //这里的tags是TagStore传来的。将具有length属性的对象转成数组
        data={this.data}
        dataSource={null}
        renderItem={this.renderRow}
        itemsPerRow={itemsPerRow}
      />
    );
  }

  test(){
    // let test = Array.prototype.slice.call(this.state.tags);
        let test = this.state.tags;

    console.log('tags will render' + test.length);
  }
  
  renderRow = (item, sectionID, rowID, itemIndex, itemID) =>{
    console.log('item: ' + item.tagName + ' row: ' + rowID + ' itemID: ' + itemID + ' itemIndex: ' + itemIndex);
    return (
      <View >
        <Tag addTag={this.addTag} item={item} itemId={itemID}/>
      </View>
      );
  }

  getAllSelectedTags(){
    let array = [];
    let tags = this.state.tags;
    for(let key of selectedTags.keys()) {
      if(tags[key]) {
        console.log('已选择'+ key);
        array.push(tags[key]);
      }
    }
    return array;
  }
}

class Tag extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      item: props.item,
      itemId: props.itemId,
    };
  }
  _getTagIdx = () => {
    return 1;
  };

  _onPress (item) {
    console.log('你点击了标签：' + item.tagName + " " + item.id);
    let temp = this.state.selected ? false : true;
    this.setState({selected: temp});
    this.props.addTag(this.state.itemId);
  };

  state = {tagIndex: this._getTagIdx(), dir: 'row'};

render() {
    return (
      <TouchableOpacity
        onPress={()=>this._onPress(this.state.item)}
        style={styles.tag}>
        <Text  style={{textAlign: 'center'}}>
        测试标签+{this.state.item.tagName}
        </Text>
        {this.selectTag()}
      </TouchableOpacity>
    );
  }

  //是否显示选择标记
  selectTag() {
    console.log('标记' + this.state.selected);
    if(this.state.selected) {
      return (<Image
        style={[{width: 24, height: 24, alignSelf: 'flex-end', marginTop: 15, marginRight: 5}, this.props.imageStyle]}
        source={require('../../res/images/ic_polular.png')}
        />);
    }
  }
  
}

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  tag: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    // alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});

export default TagsGridView;

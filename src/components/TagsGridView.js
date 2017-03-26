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
  Dimensions
} from 'react-native'

import GridView from './GridView';
import Reflux from 'reflux';
import TagStore from '../stores/TagStore';
import QuestionStore from '../stores/QuestionStore';

import {TagActions} from '../AllActions';

const itemsPerRow = 2;
// var selectedTags = new Map();

class TagsGridView extends Reflux.Component {
  constructor(props) {
    super(props);
    // const ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      selected: [],
      deletable: [],
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
    let len = this.state.tags.length;
    this.setState({
      selected: Array(len).fill(false),
      deletable: Array(len).fill(false),
    });
  }

  // componentWillReceiveProps() {
  //   console.log('homeview will update');
  //   // TagActions.getAllTags();
  // }

  addTag=(id)=> {
    console.log('addTag: ' + id, this.state);
    let temp = this.state.selected.slice();
    if(temp[id]) {
      temp[id] = false;
    } else {
      temp[id] = true;
    }
    this.setState({selected: temp, deletable: Array(temp.length).fill(false)});
  }

  deleteFlag=(id)=> {
    let temp = this.state.deletable.slice();
    if(temp[id]) {
      temp[id] = false;
    } else {
      temp[id] = true;
    }
    this.setState({deletable: temp});
  }

  deleteTag=(id, itemId)=> {
    //这里注意将两个标记状态数组更新
    let tempDelete = this.state.deletable;
    tempDelete.splice(itemId, 1);
    let tempSelect = this.state.selected;
    tempSelect.splice(itemId, 1);
    TagActions.deleteTag(id);
    this.setState({selected: tempSelect, deletable: tempDelete});
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
        style={{marginTop:13, marginBottom: 10}}
        // contentContainerStyle={styles.list}
        itemStyle={styles.list}
        rowStyle={styles.row}
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
    // console.log('item: ' + item.tagName + ' row: ' + rowID + ' itemID: ' + itemID + ' itemIndex: ' + itemIndex);
    console.log(item);
    return (
      <View >
        <Tag addTag={this.addTag} deleteFlag={this.deleteFlag} deleteTag={this.deleteTag} item={item} itemId={itemID} 
        isSelected={this.state.selected[itemID]}
        isDeletable={this.state.deletable[itemID]}/>
      </View>
      );
  }

  getAllSelectedTags(){
    let array = [];
    let tags = this.state.tags;
    for(let i=0; i<this.state.selected.length; ++i) {
      if(this.state.selected[i]) {
        array.push(tags[i]);
      }
    }
    return array;
  }
}

class Tag extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deletable: false,
    };
  }

  _onPress (item) {
    console.log('你点击了标签：' + item.tagName + " " + item.id);
    this.props.addTag(this.props.itemId);
  }

  _onLongPress(item) {
    console.log('你长按了标签：' + item.tagName + " " + item.id);
    if(this.props.isDeletable) {
      return;
    }
    this.props.deleteFlag(this.props.itemId);
  }

  _onDelete(item) {
    console.log('你删除了标签：' + item.tagName + " " + item.id);
    // TagActions.deleteTag(item.id);
    this.props.deleteTag(item.id, this.props.itemId)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.item != nextProps.item) {
      
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   //通过此处判断是否需要更新页面数据，只有当前Tab展示新数据
  //   let result = false;
  //   try {
  //     result = nextProps.item.id == this.props.item.id;
  //   } catch (error) {
      
  //   }
  //   return result;
  // }


render() {
    console.log(this.state,this.props.item.id)
    return (
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.item)}
        onLongPress={()=>this._onLongPress(this.props.item)}
        style={styles.tag}>
        <Text  style={{textAlign: 'center', fontSize: 16}}>
        {this.props.item.tagName}
        {/*{this.props.item.id}*/}
        </Text>
        {this.selectTag()}
        {this.deleteTag()}
      </TouchableOpacity>
    );
  }

  //是否显示选择标记
  selectTag() {
    // if(this.state.selected) {
    if(this.props.isSelected) {
      return (<Image
        style={[{position: 'absolute', right: 10, bottom: 10, width: wid/6, height: wid/6, alignSelf: 'flex-end'}, this.props.imageStyle]}
        source={require('../../res/images/tag_select.png')}
        />);
    }
  }

  //是否显示删除按钮
  deleteTag() {
    if(this.props.isDeletable) {
      return (
        <TouchableOpacity
        onPress={()=>this._onDelete(this.props.item)}
        style={{position: 'absolute', right: 10, top: 10,}}>
          <Image
          style={[{ width: wid/6, height: wid/6, alignSelf: 'flex-end'}, this.props.imageStyle]}
          source={require('../../res/images/tag_delete.png')}
          />
        </TouchableOpacity>);
    }
  }
  
}
const wid = Dimensions.get('window').width / 2-60;
const hei = wid/3*2;
var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15
  },
  tag: {
    width: wid,
    height: hei,
    justifyContent: 'center',
    // padding: 5,
    margin: 10,
    // width: 140,
    // height: 85,
    backgroundColor: '#F6F6F6',
    // alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCC'
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});

export default TagsGridView;

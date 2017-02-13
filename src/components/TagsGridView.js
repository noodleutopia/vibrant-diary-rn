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
      selected: [],
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
    this.setState({selected: Array(len).fill(false)});
  }

  // componentWillReceiveProps() {
  //   console.log('homeview will update');
  //   // TagActions.getAllTags();
  // }

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
    // console.log('item: ' + item.tagName + ' row: ' + rowID + ' itemID: ' + itemID + ' itemIndex: ' + itemIndex);
    console.log(item);
    return (
      <View >
        <Tag addTag={this.addTag} item={item} itemId={itemID} isSelected={this.state.selected[item]}/>
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
      // item: props.item,
      // itemId: props.itemId,
      deletable: false,
    };
  }

  _onPress (item) {
    console.log('你点击了标签：' + item.tagName + " " + item.id);
    let temp = this.state.selected ? false : true;
    if(this.state.deletable) {
      this.setState({deletable: false});
    } else {
      this.setState({selected: temp});
      this.props.addTag(this.props.itemId);
    }
    
  }

  _onLongPress(item) {
    console.log('你长按了标签：' + item.tagName + " " + item.id);
    if(this.state.deletable) {
      return;
    }
    let temp = this.state.deletable ? false : true;
    if(this.state.selected) {
      this.props.addTag(this.props.itemId);
    }
    this.setState({selected: false, deletable: temp});
  }

  _onDelete(item) {
    console.log('你删除了标签：' + item.tagName + " " + item.id);
    // this.setState({deletable: false});
    TagActions.deleteTag(item.id);
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
        <Text  style={{textAlign: 'center'}}>
        测试标签+{this.props.item.tagName}+{this.props.item.id}
        </Text>
        {this.selectTag()}
        {this.deleteTag()}
      </TouchableOpacity>
    );
  }

  //是否显示选择标记
  selectTag() {
    console.log('标记' + this.state.selected);
    if(this.state.selected) {
      return (<Image
        style={[{position: 'absolute', right: 10, bottom: 10, width: 24, height: 24, alignSelf: 'flex-end'}, this.props.imageStyle]}
        source={require('../../res/images/ic_polular.png')}
        />);
    }
  }

  //是否显示删除按钮
  deleteTag() {
    if(this.state.deletable) {
      return (
        <TouchableOpacity
        onPress={()=>this._onDelete(this.props.item)}
        style={{position: 'absolute', right: 10, top: 10,}}>
          <Image
          style={[{ width: 24, height: 24, alignSelf: 'flex-end'}, this.props.imageStyle]}
          source={require('../../res/images/ic_trending.png')}
          />
        </TouchableOpacity>);
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

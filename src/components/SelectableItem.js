import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
class SelectableItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // selected: false,
    };
  }

  _onPress (item) {
    console.log('你点击了标签：' + item);
    // let temp = this.state.selected ? false : true;
    // this.setState({selected: temp});
    this.props.setSelected(this.props.itemId);//回调父组件
  };

render() {
    return (
      <TouchableOpacity
        onPress={()=>this._onPress(this.props.item)}
        style={styles.tag}>
        <Text  style={{textAlign: 'center'}}>
        测试标签+{this.props.item}
        </Text>
        {this.selectTag()}
      </TouchableOpacity>
    );
  }

  //是否显示选择标记
  selectTag() {
    // console.log('标记' + this.state.selected);
    if(this.props.itemId == this.props.selectedId) {
      return (<Image
        style={[styles.flag, this.props.imageStyle]}
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
    width: 80,
    height: 80,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  flag: {
    position: 'absolute', 
    right: 10, bottom: 10, 
    width: 24, height: 24, 
    // alignSelf: 'flex-end'
  },
});

export default SelectableItem;
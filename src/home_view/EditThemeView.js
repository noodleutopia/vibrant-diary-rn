import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import GridView from '../components/GridView';
import Button from '../components/Button';
import Reflux from 'reflux';
import TagStore from '../stores/TagStore';
import {PAGES} from '../xiaomubiao';

const itemsPerRow = 2;
class EditThemeView extends Reflux.Component {

  constructor(props) {
    super(props);
    console.log('EditThemeView');
    this.store = TagStore; // <- just assign the store class itself
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return nextState.tags != this.state.tags;
  }


  render() {
    console.log('render EditThemeView view here...');
    return(
      <View style={{flex:1}}>
        <View style={styles.top}>
          <Text style={{textAlign:'center', fontSize: 17,}}>编辑主题</Text>
        </View>
      <GridView
        itemStyle={styles.container}
        data={this.state.tags}
        dataSource={null}
        itemsPerRow={itemsPerRow}
        renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
          // console.log('render questions: ' + item.tagId);
          return (
            <TouchableOpacity
            onPress={()=>this._onPress(item, itemID)}
            >
            <View style={styles.grid}>
              <Text style={{fontSize: 18}}>{item.tagName}</Text>
            </View>
            </TouchableOpacity>
          );
      }}/>
      <Button style={{position:'absolute', bottom:70, right:20, backgroundColor: '#F6A623d0',}} text={'完成'} onPress={this.props.quit}/>
      </View>
    )
  }

  _onPress(tag, itemID) {
    this.props.navigator.push({
      name: PAGES.page_edit_question,
      data: {
        tag: tag,
      }
    });
  }
}

EditThemeView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // marginTop: 10,
    // marginBottom: 20,
  },
  top: {
    paddingTop: 22,  
    height: 70,
    // fontSize: 15,
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6A623d0',
  },
  grid: {
    justifyContent: 'center',
    padding: 8,
    // margin: 10,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2-30,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: '#CCC'
  }
});

export default EditThemeView;
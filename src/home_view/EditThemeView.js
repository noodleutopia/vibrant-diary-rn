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

  render() {
    console.log('render EditThemeView view here...');
    return(
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
              <Text>{item.tagName}</Text>
            </View>
            </TouchableOpacity>
          );
      }}/>
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
  grid: {
    justifyContent: 'center',
    padding: 8,
    // margin: 10,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: '#CCC'
  }
});

export default EditThemeView;
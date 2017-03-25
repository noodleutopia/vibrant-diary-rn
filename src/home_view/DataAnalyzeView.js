import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';

import Button from '../components/Button';
import GridView from './../components/GridView';
const images = [
  [require('../../res/images/round-3.png'), require('../../res/images/round-5.png'),
    require('../../res/images/round-7.png'), require('../../res/images/round-10.png'),
    require('../../res/images/round-14.png'), require('../../res/images/round-21.png'),
    require('../../res/images/round-30.png'), require('../../res/images/round-50.png'),
    require('../../res/images/round-100.png')],
  [require('../../res/images/ribbon-5.png'), require('../../res/images/ribbon-10.png'),
    require('../../res/images/ribbon-15.png'), require('../../res/images/ribbon-20.png'),
    require('../../res/images/ribbon-30.png'), require('../../res/images/ribbon-40.png'),
    require('../../res/images/ribbon-50.png'), require('../../res/images/ribbon-100.png'),
    require('../../res/images/ribbon-150.png')]];
const needs = [
                [3, 5, 7, 10, 14, 21, 30, 50, 100],
                [5, 10, 15, 20, 30, 40, 50, 100, 150]
              ];

export const achieveKeys = {
  KEY_ACHIEVE_LAST_DAY : 'achieve_last_day',
  KEY_ACHIEVE_DAY : 'achieve_day',
  KEY_ACHIEVE_DIARY: 'achieve_diary',
}

class DataAnalyzeView extends Component {

  constructor() {
    super();
    this.state = {
      dayAchieve: 0,
      diaryAchieve: 0,
    }
  }

  componentWillMount() {
    this.getCount().done();
  }

  async getCount() {
    try{
      let day = await AsyncStorage.getItem(achieveKeys.KEY_ACHIEVE_DAY);
      let diary = await AsyncStorage.getItem(achieveKeys.KEY_ACHIEVE_DIARY);
      if(day != undefined && day > 0) {
        if(diary != undefined && diary > 0) {
          this.setState({dayAchieve: day, diaryAchieve: diary});
        } else {
          this.setState({dayAchieve: day});
        }
      } else if(diary != undefined && diary > 0) {
        this.setState({ diaryAchieve: diary});
      }
    } catch(e) {console.log(e)}
  }

  render() {
    console.log('render DataAnalyzeView view here...');
    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Button style={{ position: 'absolute', width: 60, left: 0, margin:0, marginTop: 30, padding: 0, backgroundColor: 'transparent'}} text={"<返回"} onPress={this.props.quit}/>
          <Text style={{textAlign:'center', fontSize: 17,}}>成就</Text>
        </View>
        <ScrollView >
          <AchieveUnit data={0} title="已坚持天数" activeNo={this.state.dayAchieve}/>
          <AchieveUnit data={1} title="已完成日记数" activeNo={this.state.diaryAchieve}/>
        </ScrollView>
      </View>
    )
  }
}

class AchieveUnit extends Component {

  render() {
    return (
      <View style={styles.unit}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={{height:1, backgroundColor: '#888888', marginTop: 10, marginBottom:15, marginLeft: 15, marginRight: 30 }} />
        <GridView
          // contentContainerStyle={styles.list}
          itemStyle={styles.list}
          rowStyle={styles.row}
          //这里的tags是TagStore传来的。将具有length属性的对象转成数组
          data={images[this.props.data]}
          dataSource={null}
          renderItem={this.renderRowRound}
          itemsPerRow={3}
        />
      </View>

    );
  }

  renderRowRound = (item, sectionID, rowID, itemIndex, itemID) =>{
    console.log('item: ' + item + ' row: ' + rowID + ' itemID: ' + itemID + ' itemIndex: ' + itemIndex);
    let opa = this.isActive(itemID);
    return (
      <Image style={[styles.image, {opacity: opa}]} source={item}/>
    );
  }

  isActive(itemID) {
    console.log('activeNo: ', this.props.activeNo, needs[this.props.data][itemID]);
    if(needs[this.props.data][itemID] <= this.props.activeNo) {
      return 1;
    }
    return 0.3;
  }
}

DataAnalyzeView.propTypes = {
  quit: React.PropTypes.func.isRequired,
};

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
    marginBottom: 10,
  },
  unit: {
    marginTop: 15,
    // marginLeft: 15,
    // marginRight: 15
  },
  title: {
    // flex: 1,
    // justifyContent: 'center',
    color: '#5B5B5B',
    paddingLeft: 25,
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 65,
    width: 65,
    resizeMode: Image.resizeMode.contain,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 18,
    paddingRight: 18
  },
  tag: {
    justifyContent: 'center',
    // padding: 5,
    margin: 10,
    width: 140,
    height: 85,
    backgroundColor: '#F6F6F6',
    // alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCC'
  },
});

export default DataAnalyzeView;
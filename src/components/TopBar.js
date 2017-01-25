import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class TopBar extends Component {
  
  render() {
    let opacity = this.props.disabled ? 1 : 0.5;
    return(
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.handleTopPress}
        style={[this.props.style]}>
        <View style={topBarStyles.container}>
          <Text style={topBarStyles.date}>日期</Text>
          <Text style={topBarStyles.mood}>心情</Text>
          <Text style={topBarStyles.temprature}>天气</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

TopBar.propTypes = {
  handleTopPress: React.PropTypes.func.isRequired,
  style: View.propTypes.style,
  disabled: React.PropTypes.bool, 
};

TopBar.defaultProps = {
  disabled: false
};

var topBarStyles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#ddfdfd',
    // marginTop: 20
  },
  date: {
    flex: 1,
    textAlign: 'center',
  },
  mood: {
    flex: 1,
    textAlign: 'center',
  },
  temprature: {
    flex: 1,
    textAlign: 'center',
  },
});

export default TopBar;
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import colors from '../styles/colors'

class Button extends Component {
  static displayName = 'Button';

  render() {
    let opacity = this.props.disabled ? 1 : 0.5;
    return(
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.onPress}
        style={[styles.wideButton, this.props.style]}>
        <Text style={[{textAlign: 'center'}, this.props.textStyle]}>
        {this.props.text? this.props.text : ''}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  style: View.propTypes.style,
  disabled: React.PropTypes.bool,
  // text: React.PropTypes.text
};

Button.defaultProps = {
  disabled: false
};

export default Button;

var styles = StyleSheet.create({
  wideButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // padding: 10,
    // margin: 10,
    width: 100,
    height: 30,
    backgroundColor: '#F6A623'
  }
});


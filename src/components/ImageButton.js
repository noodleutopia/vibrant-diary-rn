import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import Button from './Button'

class ImageButton extends Button {
  render() {
    console.log('这是一个ImageButton!' + this.props.disabled);
    let opacity = this.props.disabled ? 1 : 0.5;
    return(
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.onPress}
        style={[this.props.style]}>
        <View style={{paddingRight:0}}>
          <Image
            style={[{width: 24, height: 24}, this.props.imageStyle]}
            source={this.props.source}
          />
        </View>
      </TouchableOpacity>
    );}
}

ImageButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  source: React.PropTypes.any.isRequired,
};

export default ImageButton;
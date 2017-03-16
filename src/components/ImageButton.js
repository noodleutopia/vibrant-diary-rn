import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
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
        style={[styles.subContainer, this.props.style]}>
        <View style={{ alignItems: 'center', justifyContent: 'center',}}>
          <Image
            style={[{width: 24, height: 24}, this.props.imageStyle]}
            source={this.props.source}
          />
          {this.renderText()}
        </View>
      </TouchableOpacity>
    );}

    renderText() {
      if(this.props.text != undefined) {
        return(<Text style={styles.bottomText}>{this.props.text}</Text>);
      }
    }
}

ImageButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  source: React.PropTypes.any.isRequired,
};


var styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginLeft: 40,
    // marginRight: 40
  },
  subContainer: {
    width:50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    width: 25, height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 5,
  },

});

export default ImageButton;
// /**
//  * 首页
//  * @flow
//  */

// import React, {Component} from 'react';

// import {
//     StyleSheet,
//     Image,
//     View,
// } from 'react-native'

// import TabNavigator from 'react-native-tab-navigator'

// var MyNevigator = React.createClass({
//     render: function(){
//         <Navigator 
//             initialRoute={{name: '', component: this.props.component, index: 0}}
//             configureScene={()=>{return Navigator.SceneConfigs.FloatFromBottom}}
//             renderScene={(route, navigator) => {
//                 const Component = route.component;
//                 return (
//                     <View style={{flex: 1}}>
//                         <Component navigator={navigator} route={route} {...route.passProps}/>
//                     </View>
//                 )
//             }}
//         />
//     }
// })
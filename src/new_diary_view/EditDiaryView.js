import React, {Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Button from '../components/Button';
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TabPageView from '../components/TabPageView';
import {DiaryActions} from '../AllActions';
import QuestionStore from '../stores/QuestionStore';
import AnswerStore from '../stores/AnswerStore';
import {QuestionActions} from '../AllActions';
import Reflux from 'reflux';

class EditDiaryView extends Reflux.Component {
  
}

export default EditDiaryView;
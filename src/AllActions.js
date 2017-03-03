import Reflux from 'reflux';

export var TagActions = Reflux.createActions([
  'getAllTags',
  'createTag',
  'deleteTag',
  'editTag',
  // 'deleteAllCards'
]);

export var QuestionActions = Reflux.createActions([
  'getAllQuestions',
  'createQuestion',
  'deleteQuestion',
  'editQuestion',
  // 'deleteAllCards'
]);

export var AnswerActions = Reflux.createActions([
  'getAllAnswers',
  'createAnswer',
  'deleteAnswer',
  'editAnswer',
  // 'deleteAnswer'
]);

export var DiaryActions = Reflux.createActions([
  'getAllDairies',
  'createDiary',
  'deleteDiary',
  'editDiary',
  'getDiary',
  'loadData'
  // 'deleteAllCards'
]);

export var DateActions = Reflux.createActions([
  'updateDate',
  'updateTemperature',
  'updateMood',
  'writeAll',
  // 'deleteAllCards'
]);

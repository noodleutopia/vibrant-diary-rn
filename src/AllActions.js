import Reflux from 'reflux';

export var TagActions = Reflux.createActions([
  'getAllTags',
  'createTag',
  'deleteTag',
  'editTag',
  'toggleSelect',
  'toggleDelete',
  // 'deleteAllCards'
]);

export var QuestionActions = Reflux.createActions([
  'getAllQuestions',
  'createQuestion',
  'deleteQuestion',
  'editQuestion',
  'getQuestions',
  'editQuestionsByTag',
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
  'loadData',
  'setCount'
  // 'deleteAllCards'
]);

export var DateActions = Reflux.createActions([
  'updateDate',
  'updateTemperature',
  'updateMood',
  'writeAll',
  // 'deleteAllCards'
]);

import Realm from 'realm';
import {QuestionSchema, TagSchema, DiarySchema, AnswerSchema} from './data/AllSchema'

var realm = new Realm({schema: [TagSchema, QuestionSchema, DiarySchema, AnswerSchema]});
export {realm};
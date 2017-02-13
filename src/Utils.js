import Realm from 'realm';
import {QuestionSchema, TagSchema, DiarySchema} from './data/AllSchema'

var realm = new Realm({schema: [TagSchema, QuestionSchema, DiarySchema]});
export {realm};
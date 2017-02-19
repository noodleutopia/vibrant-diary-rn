import Realm from 'realm';
import {QuestionSchema, TagSchema, DiarySchema, AnswerSchema} from './data/AllSchema'

var realm = new Realm({
  schema: [TagSchema, QuestionSchema, DiarySchema, AnswerSchema],
  schemaVersion: 1,
  migration: function(oldRealm, newRealm) {
    // 只有在 schemaVersion 提升为 1 的时候才应用此变化
    if (oldRealm.schemaVersion < 1) {
      var oldObjects = oldRealm.objects(DiarySchema.name);
      var newObjects = newRealm.objects(DiarySchema.name);

      // 遍历所有对象，然后设置新架构中的属性
      // for (var i = 0; i < oldObjects.length; i++) {
      //   newObjects[i].name = oldObjecs[i].firstName + ' ' + oldObjects[i].lastName;
      // }
    }
  }
});
export {realm};
/**
 * 一个Tag中包含的一组问题和一组回答
 */

class TagContent {
  constructor(tagId, questions, answers) {
    this.tagId = tagId;
    this.questions = questions;
    this.answers = answers;
  }

  setFromObject(ob) {
    this.front = ob.front;
    this.back = ob.back;
    this.deckID = ob.deckID;
    this.strength = ob.strength;
    this.dueDate = moment(ob.dueDate);
    this.id = ob.id;
  }

  static fromObject(ob) {
    let c = new Card(ob.tagId, ob.questions, ob.answers);
    // c.setFromObject(ob);
    return c;
  }
}

module.exports = TagContent;
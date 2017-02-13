export const QuestionSchema = {
    name: "Question",
    primaryKey: 'id',
    properties: {
        id: "int",
        tagId: "int",
        question: "string",
        // answer: "string"
    }
};

export const TagSchema = {
    name: "Tag",
    primaryKey: 'id',
    properties: {
        id: "int",
        date: "date",
        tagName: "string"
    }
};

export const AnswerSchema = {
    name: "Answer",
    primaryKey: 'id',
    properties: {
        id: "int",
        diaryId: "int",
        questionId: "int",
        answer: "string"
    }
};

export const DiarySchema = {
    name: "Diary",
    primaryKey: 'id',
    properties: {
        id: "int",
        date: "date",
        temperature: "string",
        mood: "string",
        content: "string"   //用json保存的内容，包括tag下面的一组问答
        // tags: {type: 'list', objectType: 'Tag'},
        // questions: {type: 'list', objectType: 'Question'},
        // answers: {type: 'list', objectType: 'Answer'}
    }
};
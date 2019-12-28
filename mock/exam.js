import Mock from 'mockjs'
let random = Mock.Random
let examination =  Mock.mock(
  {
    examId:random.integer(10,1000),
    examTitle:'xxx课程阶段测评一',
    totalQuestions:50,
    totalMinutes:90,
    totalScore:100,
    type:0, // 0-阶段测评。1-综合测评
    score:-1,
    'questions|50':[
      {
        type:1, // 多选、单选
        questionInfo:'通过各种有关的事体来传达礼仪信息的媒体是（）',
        questionId:random.integer(10,10000),
        'marked|1':[
          0,1
        ],
        answers:[
          {label:'A',content:random.cword(6)},
          {label:'B',content:random.cword(6)},
          {label:'C',content:random.cword(6)},
          {label:'D',content:random.cword(6)},
        ],
        'correctAnswer|1':[
          "A","B","C","D"
        ],
        'myAnswer|1':[
          "A","B","C","D",-1
        ],
      }
    ]
  }
)
// 全新试卷
let examination_new =  Mock.mock(
  {
    examId:random.integer(10,1000), // 试卷id
    examTitle:'xxx课程阶段测评一', // 试卷名
    totalQuestions:50, // 总题目数
    totalMinutes:90, // 考试总时间
    totalScore:100, // 总分数
    type:0, // 0-阶段测评。1-综合测评
    score:-1, // 该学生得分
    'questions|50':[
      {
        type:1, // 多选、单选
        questionInfo:'通过各种有关的事体来传达礼仪信息的媒体是（）',
        questionId:random.integer(10,10000), // 问题ID
        'marked':0, // 是否标记
        answers:[
          {label:'A',content:random.cword(6)},
          {label:'B',content:random.cword(6)},
          {label:'C',content:random.cword(6)},
          {label:'D',content:random.cword(6)},
        ],
        'correctAnswer|1':[ // 正确答案
          "A","B","C","D"
        ],
        'myAnswer':-1, //我的答案
      }
    ]
  }
)
export {examination,examination_new}

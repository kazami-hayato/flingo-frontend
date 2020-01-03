<template>
  <div class="examination">
    <el-form :model="examination" label-width="80px">
    <div class="exam-info">
      <div class="exam-title" v-if="!isEditable">
        <div class="exam-detail">
          <h1>{{examination.examTitle}}</h1>
          <p>答题时间：{{examination.totalMinutes}}分钟&emsp;&emsp;总题数：{{examination.totalQuestions}}题&emsp;&emsp;总分：{{examination.totalScore}}分&emsp;&emsp;</p>
        </div>
      </div>
      <div class="exam-title"  v-else>
        <div class="exam-detail">
        <el-form-item label="试卷名称">
          <el-input v-model="examination.examTitle"></el-input>
        </el-form-item>
        </div>
      </div>
      <div class="edit" v-show="!showAnswerPanel">
        <el-button type="primary" icon="el-icon-edit" @click="edit">{{isEditable?'保存试卷':'试卷编辑'}}</el-button>
      </div>
    </div>
    <el-row type="flex" class="detail-panel">
      <el-col :span="17" class="question-panel">

        <div class="practice-item" v-for="(item,index) in examination.questions" :key="index">
          <div class="practice-item-header" v-if="!isEditable">
            <span class="practice-item-num">{{index+1}}</span>
            <span class="practice-item-title">
                        <span>{{item.type === 1?'【单选】':'【多选】'}}</span>{{item.questionInfo}}
                    </span>
          </div>
          <div  v-else>
            <span class="practice-item-num"></span>
            <el-form-item :label="index+1+'.题干'"  label-width="60px">
              <el-input v-model="item.questionInfo"></el-input>
            </el-form-item>
          </div>
          <ul class="practice-item-option" data-exerid="26930886" data-score="2" data-type="xz">
            <li v-for="(answer,answerIndex) in item.answers" :key="answer.label"
                @click="select(answerIndex,answer,index)">
              <div style="display:flex" v-if="!isEditable">
                <div :class="{'selected':item.myAnswer===answer.label,'answer-label':true}">{{answer.label}}</div>
                {{answer.content}}
              </div>
              <div v-else>
                <el-form-item :label="answer.label"  label-width="20px">
                  <el-input v-model="answer.content"></el-input>
                </el-form-item>
              </div>
            </li>
          </ul>
          <el-form-item label="正确答案"  label-width="80px" v-show="isEditable">
            <el-select v-model="item.correctAnswer">
              <el-option v-for="option in ['A','B','C','D']" :label="option" :key="option" :value="option"></el-option>
            </el-select>
          </el-form-item>
          <!--<div class="practice-item-operate am-cf">-->
            <!--<el-button type="primary" @click="mark(index)">{{item.marked===1?'取消标记':'标记此题'}}</el-button>-->
          <!--</div>-->
          <div class="practice-item-result" v-show="showAnswerPanel">
            <div class="practice-item-answer-right" v-if="item.myAnswer===item.correctAnswer">
              <i class="icon-right"/>您<span>答对</span>了
            </div>
            <div class="practice-item-answer-wrong" v-else-if="item.myAnswer===-1">

            </div>
            <div class="practice-item-answer-wrong" v-else>
              <i class="icon-wrong"/>您<span>答错</span>了
            </div>
            <div class="practice-item-answer">
              <p>
                <span class="symbol">【结果】</span>正确答案是：<span class="answer">{{item.correctAnswer}}</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="funtion-panel" v-if="showAnswerPanel">
        <div class="answers-card">
          <div :class="{'answers':true,'answer-stick':isScrollHeightTo}">
            <h3>答题卡</h3>
            <p style="color:red;font-size:21px;text-align:center;" v-show="showAnswerPanel">{{'得分：'+score+'分'}}</p>
            <p>点击图标跳转到对应的题目</p>
            <div class="answer-options">
              <div
                :class="{'finished':item.myAnswer!==-1,'marked':item.marked === 1,'answer-item':true,'right':showAnswerPanel&&(item.myAnswer===item.correctAnswer),'wrong':showAnswerPanel&&(item.myAnswer!==item.correctAnswer)}"
                v-for="(item,index) in examination.questions" :key="index" @click="toQuestion(index)">{{index+1}}
              </div>
            </div>
            <div class="tips">
            <span>
              <i class="block right"/>
              正确
            </span>
              <span>
              <i class="block wrong"/>
              错误
            </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>

<script>
  import {getExamById} from '@/api/system_apis'

  export default {
    props: {
      showAnswer: {
        type: Boolean,
        default: true
      },
      showAnswerPanel: { // 显示学生试卷 或 可编辑试卷
        type: Boolean,
        default: true
      },
      examId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        examination: {},
        questions: [],
        examTime: '90:00',
        examTitle: '',
        totalMinutes: 0,
        totalQuestions: 0,
        totalScore: 0,
        isFinished: this.showAnswer,
        intervalFun: null,
        scrollHeight: 0,
        isScrollHeightTo: false,
        label_position:'left',
        isEditable:false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
      this.getExamination()
    },
    computed: {
      /**
       * @Author lau
       * @Description 得分
       * @Date 2019-12-16 16:07:50 星期一
       */
      score() {
        let temp = 0;
        this.examination.questions.forEach(item => {
          if (item.myAnswer === item.correctAnswer) {
            temp++
          }
        })
        return temp * 2
      },
    },
    methods: {
      /**
       * @Author lau
       * @Description 考试计时
       * @Date 2019-12-16 15:29:51 星期一
       */
      setTiming() {
        let totalTime = parseInt(this.examination.totalMinutes)
        let seconds = 60
        this.intervalFun = setInterval(() => {
          if (totalTime === 0 && seconds === 0) {
            this.isFinished = true
            this.$message({
              type: 'success',
              message: `考试已结束`
            });
            clearInterval(this.intervalFun)
          }
          if (totalTime === 15 && seconds === 0) {
            this.$notify({
              title: '警告',
              message: '注意！考试时间还剩15分钟',
              type: 'warning'
            });
          }
          if (totalTime === 5 && seconds === 0) {
            this.$notify({
              title: '警告',
              message: '注意！考试时间还剩最后5分钟',
              type: 'warning'
            });
          }
          let second
          if (seconds === 60) {
            second = "59"
            totalTime--
          } else if (seconds < 10 && seconds > 0) {
            second = "0" + seconds.toString()
          } else if (seconds === 0 && totalTime >= 1) {
            second = "00"
            totalTime--
            seconds = 60
          } else {
            second = seconds.toString()
          }
          seconds--;
          this.examTime = totalTime + ":" + second
        }, 1000)
      },
      getExamination() {
        getExamById({examination_id: this.examId}).then(response => {
          console.log(response)
          let questions = JSON.parse(response.data.exam_content)
          this.examination = Object.assign({},
            {
              questions: questions,
              examTitle: response.data.exam_title,
              totalQuestions: questions.length,
              totalMinutes: 90,
              totalScore: 100
            }
          )
          this.setTiming()
          // this.questions = res.data.questions
          // this.examTitle = res.data.examTitle
          // this.totalMinutes = res.data.totalMinutes,
          // this.totalQuestions = res.data.totalQuestions,
          // this.totalScore = res.data.totalScore
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * @Author lau
       * @Description 滚动到指定题目位置
       * @Date 2019-12-14 01:30:22 星期六
       */
      toQuestion(questionIndex) {
        let questions = document.querySelectorAll('.practice-item')
        // console.log(questions[questionIndex])
        questions[questionIndex].scrollIntoView()
        // question.scrollTo()
      },
      /**
       * @Author lau
       * @Description
       * @Date 2019-12-14 01:30:46 星期六
       */
      mark(index) {
        //   console.log(this.questions[index])
        if (this.examination.questions[index].marked === 1) {
          this.examination.questions[index].marked = 0
        } else {
          this.examination.questions[index].marked = 1
        }
      },
      /**
       * @Author lau
       * @Description 选择选项
       * @Date 2019-12-14 14:12:33 星期六
       */
      select(answerIndex, item, index) {
        if (this.isFinished) return
        this.examination.questions[index].myAnswer = item.label
      },
      /**
       * @Author lau
       * @Description 完成考试
       * @Date 2019-12-14 14:12:42 星期六
       */
      finishExam() {
        // console.log(this.questions)
        this.isFinished = true
        clearInterval(this.intervalFun)
      },
      /**
       * @Author lau
       * @Description 保存进度
       * @Date 2019-12-14 14:12:51 星期六
       */
      saveExam() {
        saveExamination({examination: this.examination}).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      },
      handleScroll(e) {
        // let card = document.querySelector('.answers-card')
        //  console.log(e.target.scrollTop)
        if (e.target.scrollTop > 250)
          this.isScrollHeightTo = true
        else
          this.isScrollHeightTo = false
        //console.log(card)
      },
      /**
       *  试卷编辑点击事件
       */
      edit(){
        if(this.isEditable){ // 保存试卷
           this.updateExamination().then(res => { // 保存成功
             this.$message.success("保存成功！")
             this.isEditable = !this.isEditable
           }).catch(error => {
             this.$message.error("保存失败！")
           })
        }else{ // 编辑试卷
          this.isEditable = !this.isEditable
        }
      },
      updateExamination(){
          // 更新请求
      }
    }
  }
</script>

<style lang="scss" scope>
  .examination {
    width: 1200px;
    margin: 20px auto;
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;

    .exam-info {
      background-color: #fff;
      padding: 5px 30px 5px 30px;
      border: 2px solid #e6e6e6;
      min-height: 77px;
      display: flex;
      justify-content: space-between;

      .exam-title {
        width: 100%;

        .exam-detail {
          display: inline-block;
          vertical-align: middle;
          h1 {
            font-size: 16px;
          }

          p {
            font-size: 14px;
            color: #999;
          }
        }
      }
      .edit{
        height: 100%;
        line-height: 60px;
      }
      .goback {
        line-height: 77px;
        display: flex;
        cursor: pointer;
      }
    }

    .detail-panel {
      margin-top: 20px;
      justify-content: space-between;
      width: 1200px;

      .question-panel {
        overflow: hidden;
        border: 2px solid #e6e6e6;
        padding: 0 30px;
        background-color: #fff;

        .practice-item {
          width: 100%;
          padding: 35px 0;
          background-color: #fff;

          .practice-item-header {
            .practice-item-num {
              color: #355f7d;
              font-weight: bold;
            }

            .practice-item-title {
              margin-left: 10px;

              span {
                color: #355f7d;
                margin-right: 5px;
              }
            }
          }

          .practice-item-option {
            margin-left: 25px;
            padding: 15px 0;
            list-style: none;

            li {
              list-style: none;
              margin: 0;
              padding: 8px 0;
              cursor: pointer;

              label {
                font-size: 16px;
                cursor: pointer;
                font-weight: normal;

                input[type="checkbox"], input[type="radio"] {
                  display: none;
                }
              }
            }

            .answer-label {
              width: 26px;
              text-align: center;
              height: 26px;
              cursor: pointer;
            }

            .selected {
              background: #ebb563;
              border-radius: 20px;
              color: white;
            }
          }

          .practice-item-operate {
            padding: 0;
          }

          .practice-item-result {
            position: relative;
            margin-top: 20px;
            padding: 15px 10px;
            border-radius: 5px;
            background-color: #e6e6e6;
            font-size: 15px;

            .practice-item-answer-right {
              span {
                color: #355f7d;
              }

              i {
                width: 60px;
                height: 60px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
              }
            }

            .practice-item-answer-wrong {
              span {
                color: #355f7d;
              }

              i {
                width: 60px;
                height: 60px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;

              }
            }

            .practice-item-answer {
              margin-left: 10px;

              .symbol {
                font-weight: bold;
                color: #999;
                margin-right: 5px;
              }
            }
          }

          & + .practice-item {
            border-top: 1px solid #e6e6e6;
          }
        }
      }

      .funtion-panel {
        .exam-timing {
          padding: 10px 20px;
          background-color: #fff;
          border: 2px solid #e6e6e6;
        }

        .answers-card {
          margin: 0px;
          .answers {
            padding: 10px 20px;
            background-color: #fff;
            border: 2px solid #e6e6e6;

            h3 {
              font-size: 16px;
            }

            p {
              color: #999;
              margin: 5px auto 10px auto;
              font-size: 15px;
            }

            .answer-options {
              display: flex;
              overflow-y: scroll;
              flex-wrap: wrap;
              height: 300px;
              margin-bottom: 20px;

              &:hover {
                &::-webkit-scrollbar-thumb {
                  background-color: #355f7d;
                  border-radius: 4px;
                }
              }

              &::-webkit-scrollbar {
                width: 6px;
                background-color: transparent;
              }

              &::-webkit-scrollbar-thumb {
                background-color: transparent;
                border-radius: 4px;
              }

              &::-webkit-scrollbar-button {
                display: none;
              }

              .answer-item {
                width: 35px;
                height: 35px;
                line-height: 35px;
                border-radius: 4px;
                color: #fff;
                background: #999;
                text-align: center;
                margin: 5px 7px;
                cursor: pointer;
              }

              .finished {
                background: #ebb563;
              }

              .marked {
                background: #355f7d;
              }

              .right {
                background: #67C23A;
              }

              .wrong {
                background: #F56C6C;
              }

            }

            .tips {
              display: flex;

              span {
                margin-right: 8px;

                .block {
                  width: 12px;
                  height: 12px;
                  border-radius: 2px;
                  display: inline-block;
                }

                .marked {
                  background: #355f7d;
                }

                .finished {
                  background: #ebb563;
                }

                .unfinished {
                  background: #ccc;
                }

                .right {
                  background: #67C23A;
                }

                .wrong {
                  background: #F56C6C;
                }
              }
            }
          }

          .answer-stick {
            width: 17%;
            position: fixed;
            top: 0;
          }
        }
      }
    }

  }
</style>

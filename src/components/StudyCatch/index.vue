<template>
  <el-container style="margin-top: 20px">
    <el-header>
      <p class="catch-title">{{title}}</p>
    </el-header>
    <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="tab_position">
      <el-tab-pane label="照片对比模板" name="compare_catch">
        <el-main>
          <el-row type="flex" :gutter="20">
            <el-col :span="4">
              <el-card shadow="never">
                <img class="catch-img" :src="'/cdn/photos/'+avatar" style="width: 200px;height: 160px">
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="视频抓拍" name="study_catch">
        <el-main>
          <el-row type="flex" :gutter="20">
            <el-col :span="4" v-for="(item) in catch_imgs.study">
              <el-card shadow="never">
                <img class="catch-img" :src="'/cdn/'+item" style="width: 200px;height: 160px">
                <div class="catch-detail">
<!--                  <p>抓拍时间：{{item}}</p>-->
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="考试抓拍" name="phase_catch">
        <el-main>
          <el-row type="flex" :gutter="20">
            <el-col :span="4" v-for="(item) in catch_imgs.phase">
              <el-card shadow="never">
                <img class="catch-img" :src="'/cdn/'+item">
                <div class="catch-detail">
                  <p>抓拍试卷：{{item}}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-tab-pane>

      <el-tab-pane label="观看日志" name="watch_log">
        <el-main>
          <el-select v-model="videoSelect" placeholder="请选择" @change="handleChange()">
            <el-alert  title="(显示最近1一个月内最近观看日志100条)"
                       type="info"
                       show-icon></el-alert>
            <el-option
              v-for="(item,index) in videoWatchLog"
              :key="item.videoName"
              :label="item.videoName"
              :value="index"
            >
            </el-option>
          </el-select>

          <el-timeline>
            <el-timeline-item
              v-for="(log, index) in videoSelectLog"
              :key="log.playId"
              :timestamp="log.currentDay">
              <p>观看地址：{{log.country+log.province+log.city}}</p>
              <p>观看IP：{{log.ipAddress}}</p>
              <p>观看时长：{{Math.floor(log.playDuration/60)}}分钟</p>
              <p>开始时间：{{log.currentDay+'.'+log.currentHour}}时</p>
              <p>观看平台：{{log.browser}}</p>
              <p>观看介质：{{log.operatingSystem}}</p>
<!--              {{activity.content}}-->
            </el-timeline-item>
          </el-timeline>
        </el-main>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
  import {getStudyCatch,getCatalogTreeById} from '@/api/system_apis'
  import {getViewLog} from '@/api/apis'
  export default {
    name: "index",
    props: {
      title: {
        type: String,
        default: '抓拍展示'
      }
    },
    created() {
      this.getList()
      this.getCatalog()
      // console.log('ss',this.vidList)
      //this.videoSelectLog = this.videoWatchLog[0]['logs']
    },
    data() {
      return {
        avatar:this.$route.params.exam_id+'.jpeg',
        // listQuery: {
        //   exam_id: this.$route.params.exam_id,
        //   course_id: this.$route.params.course_id
        // },
        catch_imgs: {
          phase: [],
          study: []
        },
        vidList:[],
        videoWatchLog:[
          {
            'videoName':'全部记录',
            'logs':[]
          }
        ],
        videoSelect:'',
        videoSelectLog:[],
        // catch_imgs: [
        //   {
        //     img_source: 'https://www.hbuvt.com/cdn/images.jpeg',
        //     img_timestamp: '2019/01/10'
        //   }, {
        //     img_source: 'https://www.hbuvt.com/cdn/images.jpeg',
        //     img_timestamp: '2019/01/15'
        //   }
        // ],
        tab_position: 'left',
        activeName: 'study_catch'
      }
    },
    computed:{
      listQuery(){
        return {
          exam_id: this.$route.params.exam_id,
          course_id: this.$route.params.course_id
        }
      }
    },
    methods: {
      getList() {
        getStudyCatch(this.listQuery).then(response => {
          this.catch_imgs.study = response.data.study.split('#').slice(1)
          this.catch_imgs.phase = response.data.phase.split('#').slice(1)
          // console.log(study)
          // console.log(phase)
        })
      },
      handleClick() {

      },
      /**
       * 请求polyv获取观看日志
       * @param vid
       * @param videoName
       */
      getWatchLog(vid,videoName){
        let params = {
          vid:vid,
          sessionId:this.listQuery.exam_id,
          numPerPage:100,
          pageNum:1
        }
        let _this = this
        getViewLog(params).then(res => {

         if(res.data.length>0){
           this.videoWatchLog[0]['logs'] =  this.videoWatchLog[0]['logs'].concat(res.data)
           this.videoWatchLog[0]['logs'].sort((a,b)=>{
             return b.createdTime - a.createdTime
           })
           _this.videoWatchLog.push({
             videoName:videoName,
             logs:res.data
           })
         }
        }).catch(error => {
          console.log(error)
        })
      },

      /**
       * 获取目录树
       */
      getCatalog(){
        getCatalogTreeById({course_id:this.listQuery.course_id}).then(res => {
          //console.log(res)
          this.getVidList(JSON.parse(res.data.catalogtree).catalogtree)
          // console.log(this.vidList)
          this.getAllVideoLog()
        })
      },

      /**
       * 获取所有视频的观看日志
       * @returns {Promise<void>}
       */
      async getAllVideoLog(){
        for (let i = 0; i < this.vidList.length; i++) {
          await this.getWatchLog(this.vidList[i]['vid'],this.vidList[i]['videoname'])
        }
        console.log(this.videoWatchLog)
        this.videoSelectLog = this.videoWatchLog[0]['logs']
        // console.log(this.videoSelectLog)
      },
      /**
       * 获取vidList
       * @param catalog
       */
      getVidList(catalog){
        for(let i=0;i<catalog.length;i++){
          if(catalog[i].hasOwnProperty('vid')){
            if(catalog[i]['vid'].trim() !== ''){
              this.vidList.push({
                vid:catalog[i]['vid'],
                videoname:catalog[i]['label']
              })
            }
          }else if(catalog[i].hasOwnProperty('children')){
            this.getVidList(catalog[i]['children'])
          }
        }
      },
      /**
       *  选择视频查看日志
       */
      handleChange(){
        this.videoSelectLog = this.videoWatchLog[this.videoSelect]['logs']
        console.log(this.videoWatchLog)
      }
    }
  }
</script>

<style scoped>
  .catch-img {
    width: 150px;
    height: 160px;
  }

  .catch-info {
    background-color: #fff;
    padding: 5px 30px 5px 30px;
    border: 2px solid #e6e6e6;
    height: 77px;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }

  .catch-detail {
    color: #909399;
    font-size: 13px;
  }

  .catch-title {
    color: #606266;
  }
</style>

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
          查询视频
          <el-select v-model="videoSelect" placeholder="请选择" @change="handleChange()" style="margin-right: 20px">
            <el-option
              v-for="(item,index) in videoWatchLog"
              :key="item.videoName"
              :label="item.videoName"
              :value="index"
            >
            </el-option>
          </el-select>
          查询日期
          <el-date-picker
            v-model="dateTime"
            type="month"
            placeholder="选择月"
            value-format="yyyyMM"
            style="margin-right: 20px"
          >
          </el-date-picker>
          每页显示数
          <el-input-number v-model="numPerPage" controls-position="right"  :min="1" style="margin-right: 20px" label="每页显示数"></el-input-number>
          第
          <el-input-number v-model="pageNum" controls-position="right"  :min="1" label="翻页"></el-input-number>
          页
          <el-button @click="handleSearch" style="margin-left: 20px" type="primary"  :loading="searching">
            查询
          </el-button>
          <div v-loading="searching">
            <el-card class="box-card"  v-for="(log, index) in videoSelectLog" :key="log.playId" style="margin-top: 10px;width:80%">
              <p>观看地址：{{log.country+log.province+log.city}}</p>
              <p>观看IP：{{log.ipAddress}}</p>
              <p>观看时长：{{Math.floor(log.playDuration/60)}}分钟</p>
              <p>开始时间：{{log.currentDay+'.'+log.currentHour}}时</p>
              <p>观看平台：{{log.browser}}</p>
              <p>观看介质：{{log.operatingSystem}}</p>
            </el-card>
<!--            <el-timeline v-loading="searching">-->
<!--              <el-timeline-item-->
<!--                v-for="(log, index) in videoSelectLog"-->
<!--                :key="log.playId"-->
<!--                :timestamp="log.currentDay">-->
<!--                <p>观看地址：{{log.country+log.province+log.city}}</p>-->
<!--                <p>观看IP：{{log.ipAddress}}</p>-->
<!--                <p>观看时长：{{Math.floor(log.playDuration/60)}}分钟</p>-->
<!--                <p>开始时间：{{log.currentDay+'.'+log.currentHour}}时</p>-->
<!--                <p>观看平台：{{log.browser}}</p>-->
<!--                <p>观看介质：{{log.operatingSystem}}</p>-->
<!--                &lt;!&ndash;              {{activity.content}}&ndash;&gt;-->
<!--              </el-timeline-item>-->
<!--            </el-timeline>-->

          </div>
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
      let year = new Date().getFullYear().toString()
      let mon =  new Date().getMonth()+1
      if(mon<=9)mon = "0"+mon.toString()
      else mon = mon.toString()
      this.dateTime = year+mon
      // let month = year + mon
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
        searching:true,
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
        activeName: 'study_catch',
        dateTime:new Date(),
        numPerPage:10,
        pageNum:1,
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
          numPerPage:this.numPerPage,
          pageNum:this.pageNum,
          dateTime:this.dateTime
        }
        let _this = this
        getViewLog(params).then(res => {
         if(res.data.length>0){
           this.videoSelectLog = this.videoSelectLog.concat(res.data)
           this.videoSelectLog.sort((a,b)=>{
             return b.createdTime - a.createdTime
           })
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
        this.videoSelectLog = []
        this.searching = true
        for (let i = 0; i < this.vidList.length; i++) {
          await this.getWatchLog(this.vidList[i]['vid'],this.vidList[i]['videoname'])
        }
        setTimeout(()=>{
          this.searching = false
        },500)
        console.log(this.videoWatchLog)
        // this.videoWatchLog[0]['logs'] = this.videoSelectLog
        // this.videoSelectLog = this.videoWatchLog[0]['logs']
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
      },
      handleDateChange(){
        console.log(this.dateTime)
      },
      handleSearch(){
        this.videoWatchLog = [{
          'videoName':'全部记录',
          'logs':[]
        }]
        this.getAllVideoLog()
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

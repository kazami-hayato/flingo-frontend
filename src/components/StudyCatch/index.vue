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

    </el-tabs>
  </el-container>
</template>

<script>
  import {getStudyCatch} from '@/api/system_apis'

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
    },
    data() {
      return {
        avatar:this.$route.params.exam_id+'.jpeg',
        listQuery: {
          exam_id: this.$route.params.exam_id,
          course_id: this.$route.params.course_id
        },
        catch_imgs: {
          phase: [],
          study: []
        },
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
    methods: {
      getList() {
        getStudyCatch(this.listQuery).then(response => {
          this.catch_imgs.study = response.data.study.split('#').slice(1)
          this.catch_imgs.phase = response.data.phase.split('#').slice(1)
          console.log(study)
          console.log(phase)
        })
      },
      handleClick() {

      }
    },
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

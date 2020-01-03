<template>
  <el-container style="margin-top: 20px">
    <el-header>
      <p class="catch-title">{{title}}</p>
    </el-header>
    <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="tab_position">
      <el-tab-pane label="视频抓拍" name="video_catch">
        <el-main>
          <el-row type="flex" :gutter="20">
            <el-col :span="4" v-for="(item) in catch_imgs">
              <el-card shadow="never">
                <img class="catch-img" :src="item.img_source">
                <div class="catch-detail">
                  <p>抓拍时间：{{item.img_timestamp}}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="考试抓拍" name="exam_catch">
        <el-main>
          <el-row type="flex" :gutter="20">
            <el-col :span="4" v-for="(item) in catch_imgs">
              <el-card shadow="never">
                <img class="catch-img" :src="item.img_source">
                <div class="catch-detail">
                  <p>抓拍试卷：{{item.img_timestamp}}</p>
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
  export default {
    name: "index",
    props: {
      title: {
        type: String,
        default: '抓拍展示'
      }
    },
    data() {
      return {
        catch_imgs:[
          {
            img_source:'https://www.hbuvt.com/cdn/images.jpeg',
            img_timestamp:'2019/01/10'
          },{
            img_source:'https://www.hbuvt.com/cdn/images.jpeg',
            img_timestamp:'2019/01/15'
          }
        ],
        tab_position:'left',
        activeName:'video_catch'
      }
    }
  }
</script>

<style scoped>
  .catch-img{
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
  .catch-detail{
    color: #909399;
    font-size: 13px;
  }
  .catch-title{
    color: #606266;
  }
</style>

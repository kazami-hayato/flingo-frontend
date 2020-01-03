<template>
  <el-container>
    <el-header>
      <el-card>
        <div class="catch-info">
          <h4>{{title}}</h4>
        </div>
      </el-card>
    </el-header>
    <el-main style="margin-top:50px">
      <el-card>
        <el-row type="flex">
          <el-col :span="4"><img class="catch-img" src="https://www.hbuvt.com/cdn/images.jpeg"></el-col>
          <el-col :span="4"><img class="catch-img" src="https://www.hbuvt.com/cdn/images.jpeg"></el-col>
          <el-col :span="4"><img class="catch-img" src="https://www.hbuvt.com/cdn/images.jpeg"></el-col>
          <el-col :span="4"><img class="catch-img" src="https://www.hbuvt.com/cdn/images.jpeg"></el-col>
          <el-col :span="4"><img class="catch-img" src="https://www.hbuvt.com/cdn/images.jpeg"></el-col>
        </el-row>

      </el-card>
    </el-main>
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
      return {}
    }
  }
</script>

<style scoped>
  .catch-img{
    width: 250px;
    height: 260px;
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
</style>

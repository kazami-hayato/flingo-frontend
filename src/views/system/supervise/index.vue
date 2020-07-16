<template>

  <div class="app-container">
    <div class="filter-container">
      <aside style="text-align: center">
        默认两个星期未学习标红，一个星期未学习标黄
      </aside>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view"
                   @click="openOnlineStudentTable">显示在线学生
          </el-button>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <el-input v-model="start_date" placeholder="起始天数"/>
        </el-col>
        <el-col :span="4">
          <el-input v-model="end_date" placeholder="截止天数"/>
        </el-col>
        <el-col>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view"
                     @click="filterStudent">过滤
          </el-button>
        </el-col>
        <el-col>
          <el-button style="margin-left: 10px;" type="success" icon="el-icon-download"
                     @click="downloadSupervise">下载督学数据
          </el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-input v-model="start_span" placeholder="标黄"/>
        </el-col>
        <el-col :span="4">
          <el-input v-model="end_span" placeholder="标绿"/>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view"
                     @click="setSpan">设置
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!--    <div class="filter-container">-->
    <!--      <el-row type="flex">-->
    <!--        <el-col :span="2">-->
    <!--          <el-button-->
    <!--            type="primary"-->
    <!--            size="medium"-->
    <!--            class="el-icon-edit"-->
    <!--            @click="dialogVisible = true">&nbsp新增IP-->
    <!--          </el-button>-->
    <!--        </el-col>-->
    <!--        <el-col :span="2">-->
    <!--          <el-button-->
    <!--            class="el-icon-upload"-->
    <!--            size="medium"-->
    <!--            type="primary"-->
    <!--            @click="uploadVisible=true">&nbsp导入IP-->
    <!--          </el-button>-->
    <!--        </el-col>-->
    <!--        <el-col :span="2">-->
    <!--          <el-button-->
    <!--            type="success"-->
    <!--            size="medium"-->
    <!--            class="el-icon-service"-->
    <!--            @click="startChosen">&nbsp启动IP-->
    <!--          </el-button>-->
    <!--        </el-col>-->
    <!--        <el-col :span="2">-->
    <!--          <el-button-->
    <!--            type="danger"-->
    <!--            size="medium"-->
    <!--            class="el-icon-circle-close"-->
    <!--            @click="deleteChosen">&nbsp停止IP-->
    <!--          </el-button>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </div>-->

    <el-table
      ref="multipleTable"
      :data="listData"
      tooltip-effect="dark"
      style="width: 100% ;padding: 20px"
      fit>
      <el-table-column
        type="index"
        align="center"
        label="序号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="exam_id"
        align="center"
        label="学号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="real_name"
        align="center"
        label="姓名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="id_card"
        align="center"
        label="身份证"
        min-width="300">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="手机号"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="qq_num"
        align="center"
        label="QQ号"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="wechat"
        align="center"
        label="微信"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="recent_login"
        align="center"
        label="上次学习时间"
        min-width="200">
      </el-table-column>
      <el-table-column
        align="center"
        label="未学习间隔（天）"
        min-width="200"
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.timespan>=tend_span" type="danger">{{row.timespan}}</el-tag>
          <el-tag v-else-if="row.timespan>=tstart_span&&row.timespan<tend_span" type="warning">{{row.timespan}}</el-tag>
          <el-tag v-else type="success">{{row.timespan}}</el-tag>
        </template>
      </el-table-column>
    </el-table>


    <el-drawer
      :visible.sync="showOnlineTable"
      size="80%">
      <el-table
        :data="studentOnlineData">
      <el-table-column
        type="index"
        label="序号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="student_id"
        label="学号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="real_name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="id_card"
        label="身份证"
        width="250">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="qq_num"
        label="QQ号"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="wechat_num"
        label="微信号"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="main_school"
        label="用户学校"
        width="150">
      </el-table-column>
      <el-table-column
        prop="recent_login"
        label="登录时间"
        width="200">
      </el-table-column>
    </el-table>


    </el-drawer>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"/>

  </div>
</template>

<script>
  import {getOnlineAdmin, getStudentOnline, getSupervise} from '@/api/system_apis'
  import {Current, DatetoString} from '@/utils/time'
  import Pagination from '@/components/Pagination/index'
  import axios from "axios";
  import {saveAs} from "file-saver"; // secondary package based on el-pagination
  export default {
    name: "index",
    components: {Pagination},
    data() {
      return {
        start_span: 7,
        end_span: 14,
        tstart_span: 7,
        tend_span: 14,
        start_date: null,
        end_date: null,
        main_school: this.$store.state.user.main_school,
        sub_school: this.$store.state.user.sub_school,
        listQuery: {
          limit: 10,
          page: 1,
          start_date: '',
          end_date: '',
          main_school: '',
          sub_school: ''
          // operator:
        },
        listData: [],
        total: 0,
        studentOnlineData:[],
        showOnlineTable:false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /***
       * 打开在线学生列表
       */
      openOnlineStudentTable(){
        this.showOnlineTable=true,
          this.getOnlineTable()
      },
      /***
       * 获取在线人员列表
       */
      getOnlineTable(){
        getStudentOnline(this.listQuery).then(response=>{
          this.studentOnlineData=response.data
        })

      },
      setSpan() {
        if (this.start_span === null || this.end_span === null)
          this.$message({
            message: '输入不能为空',
            type: "error",
            duration: 1000
          })
        else {
          let ss = Number(this.start_span)
          let se = Number(this.end_span)
          if (ss > se)
            this.$message({
              message: '标黄不能比标红大',
              type: "error",
              duration: 1000
            })
          else {
            this.tstart_span = ss
            this.tend_span = se
          }
        }
      },
      downloadSupervise(){
        if (this.main_school !== '') this.listQuery.main_school = this.main_school
        if (this.sub_school !== '') this.listQuery.sub_school = this.sub_school
        const filename='督学数据.xls'
        axios({
          url: '/apis/v1/static/down_supervise',
          method: 'get',
          params: this.listQuery,
          responseType: 'blob'     //接收类型设置，否者返回字符型
        })
          .then(res => {
            console.log(res)//定义文件名等相关信息
            saveAs(res.data,filename)
          })
      },
      filterStudent() {

        if (this.start_date === null || this.end_date === null)
          this.$message({
            message: '输入不能为空',
            type: "error",
            duration: 1000
          })
        else {
          this.start_date = Number(this.start_date)
          this.end_date = Number(this.end_date)
          if (this.start_date > this.end_date)
            this.$message({
              message: '起始时间不能大于截止时间',
              type: 'error',
              duration: 1000
            })
          else {
            this.listQuery.end_date = DatetoString(
              new Date(Date.now() - 24 * 60 * 60 * 1000 * this.start_date))
            this.listQuery.start_date = DatetoString(
              new Date(Date.now() - 24 * 60 * 60 * 1000 * this.end_date))
            this.getList()
          }
        }
        // this.getList()
      },
      getList() {
        if (this.main_school !== '') this.listQuery.main_school = this.main_school
        if (this.sub_school !== '') this.listQuery.sub_school = this.sub_school
        getSupervise(this.listQuery).then(res => {
          this.listData = []
          res.data.forEach(item => {
            let recent_timespan = new Date(item.recent_login).getTime()
            let timespan = (Date.now() - recent_timespan) / (1000 * 24 * 3600)
            item.timespan = Math.floor(timespan)
            this.listData.push(item)
          })
          this.total = res.total

        })
      },
    }
  }
</script>

<style scoped>

</style>

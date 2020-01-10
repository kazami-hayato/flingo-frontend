<template>

  <div class="app-container">
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
    <aside style="text-align: center">
      两个星期未学习标红，一个星期未学习标黄
    </aside>
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
          <el-tag v-if="row.timespan>=14" type="danger">{{row.timespan}}</el-tag>
          <el-tag v-else-if="row.timespan>=7&&row.timespan<14" type="warning">{{row.timespan}}</el-tag>
          <el-tag v-else type="success">{{row.timespan}}</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"/>

  </div>
</template>

<script>
  import {getSupervise} from '@/api/system_apis'
  import {Current} from '@/utils/time'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: {Pagination},
    data() {
      return {
        main_school: this.$store.state.user.main_school,
        sub_school: this.$store.state.user.sub_school,
        listQuery: {
          limit: 10,
          page: 1,
          main_school: '',
          sub_school: ''
          // operator:
        },
        listData: [],
        total: 0
      }
    },
    created() {
      this.getList()
    },
    methods: {
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

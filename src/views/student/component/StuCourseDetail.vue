<template>
  <el-card>
    <el-container>
      <el-main>
        <el-table
          fit
          :data="tableData"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="考号"
            align="center"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.stu.exam_id}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            min-width="70">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.stu.real_name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="课程名"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.courses[0]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="课程名"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.courses[1]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="课程名"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.courses[2]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="课程名"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.courses[3]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="课程名"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.courses[4]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="课程名"
            min-width="100">
            <template slot-scope="{row}">
              <div style="text-align: center">{{row.courses[5]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="更改"
            align="center"
            width="100">
            <el-button type="success" size="mini" icon="el-icon-edit">
            </el-button>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="studentQuery.page" :limit.sync="studentQuery.limit"
                    @pagination="getList"/>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
  import {getStudentsByTag} from '@/api/apis'
  import Pagination from '@/components/Pagination'

  export default {
    name: "StuCourseDetail",
    components: {Pagination},

    props: {
      tag: {
        type: Object,
        required: true
      }
    },
    created() {
      console.log(this.tag)
      this.getList()
    },
    data() {
      return {
        total: undefined,
        tableData: undefined,

        studentQuery: {
          page: 1,
          limit: 10,
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
          tag: this.tag.tag_name
        }
      }
    },
    methods: {
      getList() {
        getStudentsByTag(this.studentQuery).then(response => {
          this.tableData = response.data
          this.total = response.total
          console.log(this.total)
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    }
  }
</script>

<style scoped>
  .img-circle {
    border-radius: 50%;
    float: left;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

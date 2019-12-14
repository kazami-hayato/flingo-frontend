<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <StuCourseDetail :tag="row" style="width: 100%;max-height: 2700px"/>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          align="center"
          type="index">
        </el-table-column>
        <el-table-column
          label="考期ID"
          align="center"
          prop="tag_id">
        </el-table-column>
        <el-table-column
          label="考期名"
          align="center"
          prop="tag_name">
        </el-table-column>
        <el-table-column
          label="考期创建时间"
          align="center"
          prop="tag_createtime">
        </el-table-column>
        <el-table-column
          label="考期过期时间"
          align="center"
          prop="tag_overtime">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="300"
          label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="row.active===1"
              size="mini"
              type="success"
              @click="handleImportStu(row)">导入学生
            </el-button>
            <el-button
              v-if="row.active===1"
              size="mini"
              type="success"
              @click="handleImportCourse(scope.$index, scope.row)">导入选课信息
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleImportStu(row)">导出成绩
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>

    </el-main>
  </el-container>
</template>

<script>
  import {getTags} from '@/api/apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {mapGetters} from 'vuex'
  import StuCourseDetail from "./component/StuCourseDetail";

  export default {
    name: "tag",
    components: {StuCourseDetail, Pagination},
    data() {
      return {
        total: 0,
        listQuery: {
          limit: 10,
          page: 0
        },
        multipleSelection: [],
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {

      handleImportStu(row) {
        //导入学生信息到该考期
      },
      handleImportCourse(row) {

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getList() {
        getTags(this.listQuery).then(response => {
          this.tableData = response.data
          this.total = response.total
        })
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

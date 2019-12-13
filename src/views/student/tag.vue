<template>
  <el-container>
    <el-header>

    </el-header>
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
            <StuCourseDetail :tag="row" style="width: 100%;max-height: 1000px" />
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
          prop="tag_overdate">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="row.active===true"
              size="mini"
              type="success"
              @click="handleImportStu(row)">导入学生
            </el-button>
            <el-button
              v-if="row.active===true"
              size="mini"
              type="success"
              @click="handleImportCourse(scope.$index, scope.row)">导入选课信息
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
          main_school: this.$store.state.user.main_school,
          sub_school: this.$store.state.user.sub_school,
          limit: 20,
          page: 0
        },
        multipleSelection: [],
        tableData: [
          {
            tag_id: 12,
            tag_name: '1805',
            tag_overdate: '2019-12-11 15:33:22',
            tag_createtime: '2019-12-11 15:33:22',
            active: true,
            all_students: '',
          },
          {
            tag_id: 13,
            tag_name: '1806',
            tag_overdate: '2019-12-11 15:33:22',
            tag_createtime: '2019-12-11 15:33:22'
          }
        ]
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

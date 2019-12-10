<template>
  <el-container>
    <el-header></el-header>
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
          <template slot-scope="row">
            <div>{{row}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="考期ID"
          prop="tag_id">
        </el-table-column>
        <el-table-column
          label="考期名"
          prop="tag_name">
        </el-table-column>
        <el-table-column
          label="考期创建时间"
          prop="tag_createtime">
        </el-table-column>
        <el-table-column
          label="考期过期时间"
          prop="tag_overdate">
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

    export default {
        name: "tag",
        components:{Pagination},
        data() {
            return {
                total: 0,
                tableData: undefined,
                listQuery: {
                    limit: 20,
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

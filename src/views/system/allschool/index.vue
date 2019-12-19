<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">

          <el-input placeholder="请输入内容" v-model="listQuery.searchText">
            <el-select v-model="listQuery.searchType" slot="prepend" placeholder="请选择"
                       style="width: 130px;background: #1890FF;color: #fff">
              <el-option label="网校id" value='1'/>
              <el-option label="网校名" value='2'/>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getList"
                       style="background: #1890FF;color: #fff;border-radius: 0"/>
          </el-input>
        </el-col>
        <el-col :span="16" align="right">
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="dialogVisible=true">
            新建网校
          </el-button>

          <el-button class="filter-item" type="warning" icon="el-icon-arrow-left" @click="deleteChosen">选中删除
          </el-button>

        </el-col>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="listData"
      tooltip-effect="dark"
      style="width: 100% ;padding: 20px"
      fit
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        align="center"

        label="序号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="school_id"
        align="center"
        label="网校id"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"

        label="网校名称"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="main_school"
        align="center"

        label="所属主校"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="sub_school"
        align="center"

        label="所属分校"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="hotline"
        align="center"
        label="咨询热线"
        min-width="120">
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"/>
    <el-dialog
      title="网校新建"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="IPForm" label-width="80px">
        <el-form-item label="输入IP">
          <el-input v-model="tempSchool.ip"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {Current} from '@/utils/time'
  import {getSchools} from '@/api/system_apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: {Pagination},
    data() {
      return {
        dialogVisible: false,
        chosenList: [],
        tempSchool: {
          main_school: '',
          sub_school: '',
          title: '',
          logo: '',
          sub_domain: '',
          h5_domain: '',
          hotline: '',
          qq: '',
          email: '',
          icp: '',
          web_brief: '',
          address: ''
        },
        listQuery: {
          limit: 10,
          page: 1,
          searchType: '1',
          searchText: ''
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
        getSchools(this.listQuery).then(response => {
          this.listData = response.data
          this.total = response.total
        })
      },
      handleSelectionChange(val) {
        let temp = []
        val.forEach(item => {
          temp.push(item.ip_id)
        });
        this.chosenList = temp
        console.log(this.chosenList)
      },
      deleteChosen() {
        this.chosenList.forEach(item => {

        })
      },
      confirmAdd() {

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    }
  }
</script>

<style scoped>

</style>

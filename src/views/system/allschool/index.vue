<template>

  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">

          <el-input placeholder="请输入内容" v-model="listQuery.searchText">
            <el-select v-model="listQuery.searchType" slot="prepend" placeholder="请选择"
                       style="width: 130px;background: #1890FF;color: #fff">
              <el-option label="网校号" value='1'/>
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
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-card style="max-height: 1300px">
            <el-container>
              <el-aside style="background-color: rgb(238, 241, 246);width: 320px">
                <img style="width: 250px" :src="row.logo">
                <el-upload
                  :data="row"
                  ref="upload"
                  accept=".jpg,.ico,.png,.svg,.jpeg"
                  list-type="picture"
                  :name="'File'"
                  :file-list="fileList"
                  :limit="1"
                  :on-success="handleUpload"
                  action="/apis/v1/static/file">
                  <el-button style="margin-left: 10px;" size="small" type="success">点击上传</el-button>
                  <!--                  <el-button size="small" type="primary">点击上传</el-button>-->
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png/svg/ico文件，且不超过500kb</div>
                </el-upload>
              </el-aside>
              <el-main>
                <el-form :model="row" ref="form" label-width="80px" :label-position="'right'">
                  <el-form-item label="学校Id" required>
                    <el-input v-model="row.school_id" style="width: 200px" disabled/>
                  </el-form-item>
                  <el-form-item label="网校名称">
                    <el-input v-model="row.title"/>
                  </el-form-item>
                  <el-form-item label="H5域名">
                    <el-input v-model="row.h5_domain"/>
                  </el-form-item>
                  <el-form-item label="子域名">
                    <el-input v-model="row.sub_domain"/>
                  </el-form-item>
                  <el-form-item label="咨询热线">
                    <el-input v-model="row.hotline"/>
                  </el-form-item>
                  <el-form-item label="咨询QQ">
                    <el-input v-model="row.qq"/>
                  </el-form-item>
                  <el-form-item label="咨询邮箱">
                    <el-input v-model="row.email"/>
                  </el-form-item>
                  <el-form-item label="备案号">
                    <el-input v-model="row.icp"/>
                  </el-form-item>
                  <el-form-item label="网站介绍">
                    <el-input type="textarea" v-model="row.web_brief"/>
                  </el-form-item>
                  <el-form-item label="联系地址">
                    <el-input v-model="row.address"/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit(row)">确定</el-button>
                  </el-form-item>
                </el-form>
              </el-main>
            </el-container>
          </el-card>
        </template>
      </el-table-column>
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
      <el-form ref="tempSchool" label-width="100px" :rules="rules" :model="tempSchool">
        <el-form-item label="输入网校名" prop="title">
          <el-input v-model="tempSchool.title"/>
        </el-form-item>
        <el-form-item label="是否是主校" prop="is_main">
          <el-switch v-model="tempSchool.is_main"></el-switch>
        </el-form-item>
        <el-form-item label="输入主校名" prop="main_school">
          <el-input v-model="tempSchool.main_school"/>
        </el-form-item>
        <el-form-item label="输入分校名" prop="sub_school" v-if="!tempSchool.is_main">
          <el-input v-model="tempSchool.sub_school"/>
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
  import {getSchools, modifySchools, createSchool, deleteSchools} from '@/api/system_apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: {Pagination},
    data() {
      return {
        fileList: [],
        dialogVisible: false,
        chosenList: [],
        tempSchool: {
          is_main:false,
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
        rules: {
          title: [{required: true, message: '请输入网校名称', trigger: 'blur'}],
          main_school: [{required: true, message: '请输入所属主校', trigger: 'blur'}],
          sub_school: [{required: true, message: '请输入所属分校', trigger: 'blur'}]
        }
        ,
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
      handleUpload(response, File) {
        this.$refs.form.model.logo = '/cdn/' + response.data
      },
      getList() {
        getSchools(this.listQuery).then(response => {
          this.listData = response.data
          this.total = response.total
        })
      },
      onSubmit(row) {
        modifySchools(row).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          });
        })
      },
      handleSelectionChange(val) {

        this.chosenList = val
      },
      deleteChosen() {
        this.chosenList.forEach(item => {
          deleteSchools(item).then(() => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          })
        })
      },
      confirmAdd() {
        this.$refs['tempSchool'].validate((valid) => {
          if (valid) {
            if(this.tempSchool.is_main)
              this.tempSchool.sub_school=this.tempSchool.main_school
            createSchool(this.tempSchool).then(response => {
              if (response.data === 1)
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                });
              else
                this.$notify({
                  title: '失败',
                  message: '已存在',
                  type: 'error'
                });
              this.getList()
              this.tempSchool = {}
            })
            this.dialogVisible = false
          } else {
            this.$message({
              message: '不能为空',
              type: 'error',
              duration: 1000
            })
            return false;
          }
        });


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

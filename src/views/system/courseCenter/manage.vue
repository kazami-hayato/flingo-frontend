<template>
  <div class="app-container">
    <div class="filter-container">

      <el-row type="flex" justify="space-between">
        <el-col :span="6">

          <el-input placeholder="请输入内容" v-model="courseQuery.searchText">
            <el-select v-model="courseQuery.searchType" slot="prepend" placeholder="请选择"
                       style="width: 130px;background: #1890FF;color: #fff">
              <el-option label="课程号" value='1'/>
              <el-option label="课程名" value='2'/>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"
                       style="background: #1890FF;color: #fff;border-radius: 0"/>
          </el-input>
        </el-col>
        <el-col :span="16" align="right">
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="dialogVisible=true">
            创建新课程
          </el-button>
          <el-button class="filter-item " type="warning" icon="el-icon-arrow-right" @click="shiftSelected">选中入库
          </el-button>
          <!--          <el-button class="filter-item" type="danger" icon="el-icon-arrow-left" @click="unshiftSelected">选中出库-->
          <!--          </el-button>-->

        </el-col>
      </el-row>
    </div>

    <el-table
      :data="courseList"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="55" type="selection" align="center"/>
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-card style="max-height: 1300px">
            <el-container>
              <el-aside style="background-color: rgb(238, 241, 246);width: 320px">
                <img style="width: 250px" :src="row.material_cover" alt="cover">
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
                <el-form :model="row" label-width="120px" :label-position="'right'">
                  <el-form-item label="课程号" required>
                    <el-input v-model="row.course_id" style="width: 200px" disabled/>
                  </el-form-item>
                  <el-form-item label="课程名" required>
                    <el-input v-model="row.course_name" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="创建时间" required>
                    <el-input v-model="row.create_time" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="更新时间" required>
                    <el-input v-model="row.update_time" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="教材名" required>
                    <el-input v-model="row.material_name" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="精讲时间" required>
                    <el-input v-model="row.norm_duration" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="精讲课程数" required>
                    <el-input v-model="row.norm_sum" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="问题数" required>
                    <el-input v-model="row.que_sum" style="width: 200px"/>
                  </el-form-item>
                  <el-form-item label="是否入库" required>
                    <el-select v-model="row.is_shift" placeholder="请选择" disabled>
                      <el-option
                        v-for="item in [{label:'未入库',value:0},{label:'已入库',value:1}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="课程介绍" required>
                    <el-input type="textarea" v-model="row.course_brief" style="width: 600px"/>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button type="primary" @click="handleModify(row)">修改</el-button>
                  </el-form-item>
                </el-form>
              </el-main>
            </el-container>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column width="55" type="index" align="center" label="序号"/>
      <el-table-column label="课程号" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.course_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.course_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲课程数" prop="norm_sum" align="center"/>
      <el-table-column label="精讲时间" prop="norm_duration" align="center"/>
      <el-table-column label="入库状态">
        <template slot-scope="{row}">
          <el-tag v-if="row.is_shift===0||row.is_shift===null" type="warning">未入库</el-tag>
          <el-tag v-else type="success">已入库</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" minWidth="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" @click="manageCatalog(row)">管理目录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="courseQuery.page" :limit.sync="courseQuery.limit"
                @pagination="getList"/>

    <el-dialog
      title="新建课程面板"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form ref="tempCourse" label-width="100px" :rules="rules" :model="tempCourse">
        <el-form-item label="输入课程号" prop="title">
          <el-input v-model="tempCourse.course_id"/>
        </el-form-item>
        <el-form-item label="输入课程名" prop="title">
          <el-input v-model="tempCourse.course_name"/>
        </el-form-item>
        <el-form-item label="输入精讲时间" prop="title">
          <el-input v-model="tempCourse.norm_duration"/>
        </el-form-item>
        <el-form-item label="输入精讲课程数" prop="title">
          <el-input v-model="tempCourse.norm_sum"/>
        </el-form-item>
        <el-form-item label="输入精讲价格" prop="title">
          <el-input v-model="tempCourse.norm_price"/>
        </el-form-item>
        <el-form-item label="输入问题总数" prop="title">
          <el-input v-model="tempCourse.que_sum"/>
        </el-form-item>
      </el-form>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createCourse">确 定</el-button>

    </el-dialog>


  </div>
</template>

<script>
  import {getSystemCoursesByQuery,publishSystemCourseById, modifySystemCourseById, createSystemCourse} from '@/api/system_apis'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'manage',
    components: {Pagination},
    data() {
      return {
        tempCourse: {},
        dialogVisible: false,
        fileList: [],
        courseQuery: {
          searchType: '1',
          searchText: '',
          page: 1,
          limit: 20,
        },
        total: 0,
        chosenList: [],
        courseList: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getSystemCoursesByQuery(this.courseQuery).then(response => {
          this.courseList = response.data
          this.total = response.total
          // 设置延时以便于优化
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      handleSelectionChange(val) {
        this.chosenList = val
      },
      handleSearch() {
        getSystemCoursesByQuery(this.courseQuery).then(response => {
          this.courseList = response.data
          this.total = response.total
          // 设置延时以便于优化
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      createCourse() {
        console.log(this.tempCourse)
        createSystemCourse(this.tempCourse).then(res => {
          this.getList()
          this.dialogVisible = false
        })
      },
      shiftSelected() {
        let illegalCourses = []
        this.chosenList.forEach(course => {
          if (course.catalogtree === null || course.course_name === null ||
            course.norm_sum === null || course.que_sum === null || course.norm_duration === null)
            illegalCourses.push(course.course_name)
        })
        console.log(illegalCourses)
        if (illegalCourses.length > 0)
          this.$notify({
            title: '错误',
            message: '以下课程:' + illegalCourses.toString() + '（名称|目录|精讲课程数|精讲时间|问题数）为空，无法入库，请重新输入',
            type: 'error',
            duration: 1000
          })
        else
          this.chosenList.forEach(course => {
            course.is_shift = 1
            publishSystemCourseById(course).then(() => {
              this.$notify({
                title: '成功',
                message: '课程' + course.course_name + '入库成功',
                type: 'success',
                duration: 1000
              })
            })
          })
      },
      unshiftSelected() {
        console.log(this.chosenList)
        this.chosenList.forEach(course => {
          course.is_shift = 0
          modifySystemCourseById(course).then(() => {
          })
        })
      },

      handleModify(row) {
        modifySystemCourseById(row).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 1000
          })
        })
      },
      handleUpload(response, file) {
        this.$refs.upload.$props.data.material_cover = '/cdn/' + response.data
      },

      /*
      * 跳转时携带courseid
       */
      manageCatalog(row, index) {
        this.$router.push({
          name: 'SetCatalog',
          params: {course_id: row.course_id}
        })
      }
    }
  }
</script>

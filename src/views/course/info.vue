<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-input v-model="searchText" placeholder="可输入 课程名/课程代码" style="width: 200px;" class="filter-item"/>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchCourses">
            查找
          </el-button>
        </el-col>
        <el-col :span="16" align="right">
          <el-button class="filter-item" type="success" icon="el-icon-plus"
                     @click="shiftSelected">
            上架已选
          </el-button>
          <el-button class="filter-item" type="danger" icon="el-icon-minus"
                     @click="unshiftSelected">
            下架已选
          </el-button>
<!--          <el-button class="filter-item" type="success" icon="el-icon-plus"-->
<!--                     @click="shiftAll">-->
<!--            全部上架-->
<!--          </el-button>-->
<!--          <el-button class="filter-item" type="danger" icon="el-icon-minus"-->
<!--                     @click="unshiftAll">-->
<!--            全部下架-->
<!--          </el-button>-->
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="55" type="selection" align="center"></el-table-column>
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
      <el-table-column label="课程简介" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.course_brief}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教材名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.material_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_duration}}</span>
        </template>
      </el-table-column>
      <el-table-column label="精讲课程数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程状态" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.course_state===1" type="success">已上架</el-tag>
          <el-tag v-if="row.course_state===0" type="info">未上架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" minWidth="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">

          <el-button v-if="row.course_state!=1" type="primary" size="medium" @click="shiftCourse(row)">
            上架课程
          </el-button>
          <!--          <el-button v-if="row.course_state!=0" size="medium" type="success" @click="modifyCourse(row)">-->
          <!--            修改课程-->
          <!--          </el-button>-->
          <el-button v-if="row.course_state!=0" size="medium" type="danger" @click="modifyCourse(row)">
            下架课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>


  </div>
</template>

<script>
    import {getCourses,getShiftCourseById,deleteCourseById, getShiftCourses} from '@/api/apis'
    import Pagination from '@/components/Pagination'

    export default {
        name: 'info',
        components: {Pagination},
        data() {
            return {
                searchText: '',
                listQuery: {
                    page: 1,
                    limit: 20,
                },
                total: 5,
                chosenList: [],
                list: undefined,
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                getCourses(this.listQuery).then(response => {
                    this.list = response.data
                    this.total = response.total
                    this.list.forEach(function (ele) {
                        let status=false
                        getShiftCourseById({course_id:ele.course_id}).then(response=>{
                            ele.course_state=(response.data==='')?0:1
                        })
                    })
                })
            },
            handleSelectionChange(val) {
                let temp = []
                val.forEach(item => {
                    temp.push(item.course_id)
                });
                this.chosenList = temp
                console.log(this.chosenList)
            },
            searchCourses() {
            },
            shiftAll() {

            },
            unshiftAll() {

            },
            shiftSelected() {

            },
            unshiftSelected() {

            },
            shiftCourse(row) {

            },
            modifyCourse(row) {

            }

        }
    }
</script>

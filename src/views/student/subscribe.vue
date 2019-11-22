<template>
  <div class="course-container">
    <el-table
      :data="courseData"
      style="width: 100%;padding: 20px"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="course_id"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="开课时间">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="到期时间">
      </el-table-column>
      <el-table-column
        prop="course_period"
        label="考期">
      </el-table-column>
      <el-table-column
        prop="course_state"
        label="课程状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>

<script>
    export default {
        name: 'subscribe',
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        data() {
            return {
                courseData: [{
                    course_id: '2016-05-02',
                    course_name: '王小虎',
                    create_time: '上海市普陀区金沙江路 1518 弄',
                }, {
                    course_id: '2016-05-04',
                    course_name: '王小虎',
                    create_time: '上海市普陀区金沙江路 1518 弄'
                }, {
                    course_id: '2016-05-01',
                    course_name: '王小虎',
                    create_time: '上海市普陀区金沙江路 1518 弄',
                }, {
                    course_id: '2016-05-03',
                    course_name: '王小虎',
                    create_time: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        }
    }
</script>

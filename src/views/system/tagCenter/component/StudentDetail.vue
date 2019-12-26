<template>
  <el-card>
    <el-container>
      <el-header style="background: #addafb;height: 140px">
        <el-row>

          <el-col :span="6">
            <img class="img-circle" style="width: 120px;height: 120px; margin-left: 150px;margin-top: 7px"
                 :src="studentInfo.stu.avatar">

          </el-col>
          <el-col :span="12">
            <p><b>学生姓名：</b>{{studentInfo.stu.real_name}}</p>
            <p><b>身份证号：</b>{{studentInfo.stu.id_card}}</p>
            <p><b>专业名称：</b>{{studentInfo.stu.major}}</p>
            <p><b>准考证号：</b>{{studentInfo.stu.exam_id}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          fit
          :data="studentInfo.courses"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="course_id"
            label="课程号"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="学习进度"
            align="center"
            min-width="250">
            <template slot-scope="{row}" style="height: 200px">
              <pie-chart style="height: 200px;width: 300px" :study="row"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="test1"
            align="center"
            label="阶段测评一"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="test2"
            align="center"
            label="阶段测评二"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="阶段测评三"
            prop="test3"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="阶段测评四"
            prop="test4"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="测评得分"
            align="center"
            min-width="200">
            <template slot-scope="{row}">
              <div style="text-align: center">测评综合得分：{{computeTest(row)}}</div>
              <div style="text-align: center">{{computeTestDetail(row)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="main_test"
            align="center"
            label="综合测验"
            min-width="70">
          </el-table-column>
          <el-table-column
            label="抓拍"
            align="center"
            width="100">
            <el-button type="success" size="mini" icon="el-icon-search">
              查看
            </el-button>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
  import PieChart from "./PieChart";

  export default {
    name: "StudentDetail",

    props: ['studentInfo'],
    components: {PieChart},
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      computeTest(row) {
        return Math.ceil(((row.test1 + row.test2 + row.test3 + row.test4) * 0.3) / 4)
      },
      computeTestDetail(row) {
        let ret = Math.ceil(((row.test1 + row.test2 + row.test3 + row.test4) * 0.3) / 4)
        return `[(${row.test1}+${row.test2}+${row.test3}+${row.test4})x0.3]÷400=${ret}`
      }
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

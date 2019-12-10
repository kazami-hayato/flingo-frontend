<template>
  <el-card>
    <el-container>
      <el-header style="background: #addafb;height: 140px">
        <el-row>

          <el-col :span="6">
            <img class="img-circle" style="width: 120px;height: 120px; margin-left: 150px;margin-top: 7px"
                 src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=aba70b0cb68f8c54f7decd7d5b404690/b219ebc4b74543a986d0372e1c178a82b801140c.jpg">

          </el-col>
          <el-col :span="12">
            <p><b>学生姓名：</b>{{studentInfo.name}}</p>
            <p><b>身份证号：</b>{{studentInfo.id_card}}</p>
            <p><b>专业名称：</b>{{studentInfo.major}}</p>
            <p><b>准考证号：</b>{{studentInfo.exam_id}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          fit
          :data="studentInfo.exam_info"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="course_id"
            label="课程号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="学习进度"
            min-width="250">
            <template slot-scope="{row}" style="height: 200px">
              <pie-chart style="height: 200px;width: 300px" :study="row"></pie-chart>
            </template>
          </el-table-column>
          <el-table-column
            prop="test1"
            label="阶段测评一"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="test2"
            label="阶段测评二"
            min-width="70">
          </el-table-column>
          <el-table-column
            label="阶段测评三"
            prop="test3"
            min-width="70">
          </el-table-column>
          <el-table-column
            label="阶段测评四"
            prop="test4"
            min-width="70">
          </el-table-column>
          <el-table-column
            label="测评得分"
            min-width="200">
            <template slot-scope="{row}">
              <div style="text-align: center">测评综合得分：{{computeTest(row)}}</div>
              <div style="text-align: center">{{computeTestDetail(row)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="main_test"
            label="综合测验"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="查看抓拍详情"
            width="180">
            <el-button type="success" size="medium" icon="el-icon-eye" >
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
                let ans = `[(${row.test1}+${row.test2}+${row.test3}+${row.test4})x0.3]÷400=${ret}`
                return ans
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

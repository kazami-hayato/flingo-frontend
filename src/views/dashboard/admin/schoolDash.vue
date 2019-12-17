<template>
  <div class="dashboard-editor-container">

    <panel-group :panel-params="panelParams"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!--      <line-chart :chart-data="lineChartData"/>-->
      <div class="chart-wrapper">
        <bar-chart :chart-data="courseData"/>
      </div>
    </el-row>
    <footer-panel :foot-params="footParams"/>
  </div>
</template>

<script>
  import Divider from 'element-ui'
  import PanelGroup from './components/PanelGroup'
  import BoxCard from './components/BoxCard'
  import BarChart from './components/BarChart'
  // import VLineChart from "./components/VLineChart";
  import FooterPanel from "./components/FooterPanel";
  // import {getSchoolDash} from "@/api/dashboard"
  import {getDashData} from "@/api/apis";

  export default {
    name: 'schoolDash',
    components: {
      Divider,
      // VLineChart,
      BarChart,
      PanelGroup,
      BoxCard,
      FooterPanel
    },
    data() {
      return {
        panelParams: {
          students: 3200,
          courses: 1200,
          school_nums: 12,
          sales: 4300,
        },
        footParams: {
          cur_ip: '172.168.1.2',
          prev_ip: '172.168.2.3',
          prev_time: '2019-12-2 16:44:22',
          admin_type: '主校管理员',
        },
        courseData: [],
      }
    },

    created() {
      this.getDashBoard()
      //get panelParams
    },
    methods: {
      getDashBoard() {
        getDashData().then(response => {
          const data = response.data
          this.courseData = data.courses

          this.panelParams.students = data.student_num
          this.panelParams.courses = data.course_num
          this.panelParams.school_nums = data.school_num
          this.panelParams.sales = data.sales

          this.footParams.cur_ip = data.cur_ip
          this.footParams.prev_ip = data.prev_ip
          this.footParams.admin_type = data.admin_type
          this.footParams.prev_time = data.prev_time

        })
      },
      // handleSetLineChartData(type) {
      //     this.lineChartData = lineChartData[type]
      // }
    }
  }
</script>

<style lang="scss" scoped>

  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    /*  .github-corner {*/
    /*    position: absolute;*/
    /*    top: 0px;*/
    /*    border: 0;*/
    /*    right: 0;*/
    /*  }*/

    .foot-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

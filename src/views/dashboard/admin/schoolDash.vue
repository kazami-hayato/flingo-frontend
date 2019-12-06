<template>
  <div class="dashboard-editor-container">

    <panel-group  :panel-params="panelParams"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!--      <line-chart :chart-data="lineChartData"/>-->
      <v-line-chart :chart-data="chartData"></v-line-chart>
    </el-row>
    <footer-panel :foot-params="footParams"></footer-panel>
  </div>
</template>

<script>
    import Divider from 'element-ui'
    import PanelGroup from './components/PanelGroup'
    import BoxCard from './components/BoxCard'
    import VLineChart from "./components/VLineChart";
    import FooterPanel from "./components/FooterPanel";
    // import {getSchoolDash} from "@/api/dashboard"
    import {getDashData} from "@/api/apis";

    export default {
        name: 'schoolDash',
        components: {
            Divider,
            VLineChart,
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
                chartData: {
                    columns: ['日期', '本周售课数', '上周售课数'],
                    rows: [
                        {'日期': '周一', '本周售课数': 1393, '上周售课数': 1093},
                        {'日期': '周二', '本周售课数': 3530, '上周售课数': 3230},
                        {'日期': '周三', '本周售课数': 2923, '上周售课数': 2623},
                        {'日期': '周四', '本周售课数': 1723, '上周售课数': 1423},
                        {'日期': '周五', '本周售课数': 3792, '上周售课数': 3492},
                        {'日期': '周六', '本周售课数': 4593, '上周售课数': 4293},
                        {'日期': '周日', '本周售课数': 4593, '上周售课数': 4293}

                    ]
                }
            }
        },

        created() {
            this.getDashBoard()

            //get panelParams
        },
        methods: {
            getDashBoard() {
                console.log('ok')
                getDashData().then(response => {
                    const data = response.data
                    this.panelParams.students = data.students
                    this.panelParams.courses = data.courses
                    this.panelParams.school_nums = data.school_nums
                    this.panelParams.sales = data.sales
                    this.footParams.cur_ip = data.cur_ip
                    this.footParams.prev_ip = data.prev_ip
                    this.footParams.admin_type = data.admin_type
                    this.footParams.prev_time = data.prev_time
                    for (let i = 0; i < 7; ++i) {
                        this.chartData.rows[i].上周售课数 = data.prev_sale[i]
                        this.chartData.rows[i].本周售课数 = data.cur_sale[i]

                    }
                    console.log(response.data)
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

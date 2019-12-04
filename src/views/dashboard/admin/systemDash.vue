<template>
  <div class="dashboard-editor-container">

    <head-group @handleSetLineChartData="handleSetLineChartData" :panel-params="panelParams"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!--      <line-chart :chart-data="lineChartData"/>-->
      <v-line-chart :chart-data="chartData"></v-line-chart>
    </el-row>
    <footer-panel @handleSetLineChartData="handleSetLineChartData" :foot-params="footParams"></footer-panel>
    <!--    <el-row :gutter="12">-->
    <!--      <div class="foot-wrapper">-->
    <!--      <el-row :gutter="32">-->
    <!--        <el-col :xs="12" :sm="24" :lg="4" >当前登录ip<span>{{info.cur_ip}}</span></el-col>-->
    <!--        <el-col :xs="12" :sm="24" :lg="4">上次登录ip<span>{{info.prev_ip}}</span></el-col>-->
    <!--        <el-col :xs="12" :sm="24" :lg="4">上次登录时间<span>{{info.prev_time}}</span></el-col>-->
    <!--      </el-row>-->
    <!--      <el-row :gutter="32">-->
    <!--        <el-col :xs="24" :sm="24" :lg="4">当前用户<span>{{info.cur_user}}</span></el-col>-->
    <!--        <el-col :xs="24" :sm="24" :lg="4">用户类型<span>{{info.user_type}}</span></el-col>-->
    <!--        <el-col :xs="24" :sm="24" :lg="4">用户注册时间<span>{{info.register_date}}</span></el-col>-->
    <!--      </el-row>-->
    <!--      </div>-->
    <!--    </el-row>-->

    <!--    <el-row :gutter="8">-->
    <!--      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
    <!--        <transaction-table />-->
    <!--      </el-col>-->
    <!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--        <todo-list />-->
    <!--      </el-col>-->
    <!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--        <box-card />-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </div>
</template>

<script>
    import Divider from 'element-ui'
    import PanelGroup from './components/PanelGroup'
    import RaddarChart from './components/RaddarChart'
    import PieChart from './components/PieChart'
    import BarChart from './components/BarChart'
    import TransactionTable from './components/TransactionTable'
    import TodoList from './components/TodoList'
    import BoxCard from './components/BoxCard'
    import VLineChart from "./components/VLineChart";
    import FooterPanel from "./components/FooterPanel"
    import HeadGroup from "./components/HeadGroup"

    export default {
        name: 'systemDash',
        components: {
            Divider,
            VLineChart,
            PanelGroup,
            RaddarChart,
            PieChart,
            BarChart,
            TransactionTable,
            TodoList,
            BoxCard,
            FooterPanel,
            HeadGroup
        },
        data() {
            return {
                panelParams: {
                    students: 3200,
                    courses: 1200,
                    school_nums: 12,
                    sales: 4300,
                },
                footParams:{
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
            //get panelParams
        },
        methods: {
            handleSetLineChartData(type) {
                this.lineChartData = lineChartData[type]
            }
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

<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  const animationDuration = 6000

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '600px'
      },
      chartData:{
        type:Array,
        required:true
      },


    },
    data() {
      return {
        course_names: [],
        course_sales: [],
        chart: null
      }
    },
    created() {

    },
    mounted() {

      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {

        this.chart = echarts.init(this.$el, 'macarons')
        console.log('ff')
        console.log(this.chartData)
        this.chartData.forEach(item => {
          this.course_names.push(item.course_name)
          this.course_sales.push(item.topsales)
        })
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.course_names,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '课程销量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '20%',
            data: this.course_sales,
            animationDuration
          },]
        })
      }
    }
  }
</script>

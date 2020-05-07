<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'

    require('echarts/theme/macarons') // echarts theme
    import resize from './mixins/resize'

    export default {
        mixins: [resize],
        props: {
            study:Object,
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
                default: '300px'
            },
        },
        data() {
            return {
                chart: null
            }
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
                this.chart.setOption({
                    title: {
                      text: '总课程数:' + this.study.total_time,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '学习进度',
                            type: 'pie',
                            roseType: 'radius',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '50%'],
                            data: [
                                {value: this.study.watch_time, name: '已学'},
                                {value: this.study.total_time - this.study.watch_time, name: '未学'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            animationEasing: 'cubicInOut',
                            animationDuration: 600
                        }
                    ]
                })
            }
        }
    }
</script>

<template>
  <ve-line :data="chartData" :settings="chartSettings" height="500px"></ve-line>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common'

    export default {
        name: "VLineChart",
        components: {VeLine},
        props: ['chartData'],
        data() {
            return {
                chartSettings: {
                    xAxisType: 'category'
                },
            }
        }
    }
</script>

<style scoped>

</style>

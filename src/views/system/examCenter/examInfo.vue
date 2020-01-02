<template>
  <Examination/>
</template>

<script>
  import Examination from '@/components/Examination'
  import {getExamById} from '@/api/system_apis'

  export default {
    name: "ExamInfo",
    components: {Examination},
    data() {
      return {
        exam_content: undefined,
        examination_id: undefined
      }
    },
    created() {
      this.examination_id = this.$route.params.examination_id
      console.log(this.$route.params.examination_id)
      this.getExamInfo()
    },
    methods: {
      getExamInfo() {
        getExamById({examination_id: this.examination_id}).then(response => {
          this.exam_content = JSON.parse(response.data.exam_content)
          console.log(this.exam_content)
        })
      }
    }
  }
</script>

<style scoped>

</style>

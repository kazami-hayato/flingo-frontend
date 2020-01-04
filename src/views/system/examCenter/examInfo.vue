<template>
  <Examination :examId="examination_id" />
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
      this.examination_id = parseInt(this.$route.params.examination_id)
      console.log(this.$route.params.examination_id)
    },
  }
</script>

<style scoped>

</style>

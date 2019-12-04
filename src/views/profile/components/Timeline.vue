<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                timeline: [
                    {
                        timestamp: '2019/4/20',
                        title: '插入',
                        content: '新建学生xx'
                    },
                    {
                        timestamp: '2019/4/21',
                        title: '删除',
                        content: '删除学生xx'
                    },
                    {
                        timestamp: '2019/4/21',
                        title: '插入',
                        content: '新建课程tt'
                    },
                ]
            }
        }
    }
</script>

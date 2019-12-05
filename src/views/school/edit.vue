<template>
  <div class="components-container">
    <div class="filter-container">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-select v-model="notice.notice_type" placeholder="选择通知类型">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-publish"
                   @click="handlePub">发布
        </el-button>
      </el-row>
      <el-row style="margin-top: 30px">
        <MDinput v-model="notice.notice_title" name="name" align="center" required style="width: 600px">
          标题
        </MDinput>
      </el-row>
    </div>
    <div>
      <tinymce v-model="notice.notice_content" :height="800"/>
    </div>
    <!--    <div class="editor-content" v-html="notice.content"/>-->
  </div>
</template>

<script>

    import Tinymce from '@/components/Tinymce'
    import MDinput from '@/components/MDinput'
    import {getNoticeById,pubNoticeById} from "@/api/notice"

    export default {
        name: 'edit',
        components: {Tinymce, MDinput},
        mounted(){
            this.getNotice()
        },
        created() {
            // this.getNotice()
        },
        data() {
            return {
                options: ['新闻', '通知', '法律法规'],
                notice: {
                    notice_type: '',
                    notice_title: undefined,
                    notice_content: undefined,
                },
                name: '',
                content: undefined,
                components: {Tinymce}
            }
        },
        methods: {
            getNotice(){
                const query={
                    notice_id:this.$route.params.id
                }
                console.log(query)
                getNoticeById(query).then(response=>{
                    console.log(response.data)
                    Object.assign(this.notice,response.data)
                })
                // this.notice.notice_type='新闻'
                // this.notice.notice_title = 'qwe'
                // this.notice.notice_content = '<h1>qwe</h1>'
            },
            handlePub() {
                const query=Object.assign({notice_id:this.$route.params.id},this.notice)
                pubNoticeById(query).then(response=>{
                })
            }
        }
    }
</script>



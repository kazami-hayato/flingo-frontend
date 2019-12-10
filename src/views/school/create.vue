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
    import {createNotice} from "@/api/apis"


    export default {
        name: 'create',
        components: {Tinymce, MDinput},
        data() {
            return {
                options: ['新闻', '通知', '法律法规'],
                notice: {
                    main_school: 'main_school',
                    sub_school: 'sub_school',
                    notice_type: '',
                    notice_title: '',
                    notice_content: '',
                },
                name: '',
                content: undefined,
                components: {Tinymce}
            }
        },
        methods: {
            handlePub() {
                const query = Object.assign({}, this.notice)
                createNotice(query).then(response => {
                    this.$router.push({ path: this.redirect || '/school/notice' })
                })
            }
        }
    }
</script>



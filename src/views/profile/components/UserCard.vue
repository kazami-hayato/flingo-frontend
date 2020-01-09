<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <my-upload
          field="File"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="uploadVisible"
          :width="300"
          :height="300"
          :name="'File'"
          url="/apis/v1/static/file"
          img-format="png"/>
        <!--        <img :src="user.avatar">-->
        <pan-thumb :image="user.avatar" :height="'120px'" :width="'120px'" :hoverable="true">
          <el-button class="uploadBtn el-icon-upload" type="warning" size="mini" @click="uploadVisible=true">
            <p>
              &nbsp你好,{{user.real_name}}
            </p>
          </el-button>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <div class="user-role text-center text-muted" v-if="user.user_type===1">系统管理员</div>
        <div class="user-role text-center text-muted" v-else-if="user.user_type===2">主校管理员</div>
        <div class="user-role text-center text-muted" v-else-if="user.user_type===3">分校管理员</div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education"/>
          <span>所属机构</span>

        </div>
        <div class="user-bio-section-body">
          <div class="text-muted" v-if="user.main_school!==user.sub_school">
            <span>{{user.main_school}}</span>
            <span>&nbsp{{user.sub_school}}</span>
          </div>
          <div class="text-muted" v-else-if="user.main_school===''">
            <span>管理后台系统</span>
          </div>
          <div class="text-muted" v-else>
            <span>{{user.main_school}}</span>
          </div>
        </div>
      </div>
    </div>

  </el-card>

</template>

<script>
  import PanThumb from '@/components/PanThumb'
  import myUpload from 'vue-image-crop-upload'
  import {updateAdminsSystem} from '@/api/system_apis'


  export default {
    components: {PanThumb, myUpload},
    data() {
      return {
        user: {},
        uploadVisible: false
      }
    },
    created() {
      this.user = Object.assign({}, this.$store.state.user)
      this.user.role = this.user.roles[0]
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        this.user.avatar = '/cdn/' + jsonData.data
        updateAdminsSystem(this.user).then(() => {
          this.$message({
            message: '上传头像成功',
            type: 'success',
            duration: 1000
          })
        })
        console.log(this.user);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .uploadBtn {
    width: 120px;
    font-size: large;
    height: 120px;
    border-radius: 100px;
    margin-left: -20px;
    margin-top: -20px;
  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>

<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.username"/>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model.trim="user.real_name"/>
    </el-form-item>
    <el-form-item label="原密码">
      <el-input v-model.trim="origin_pwd" type="password"/>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="password" type="password"/>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model.trim="confirm_pwd" type="password"/>
    </el-form-item>
    <el-form-item label="微信">
      <el-input v-model.trim="user.wechat_num"/>
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model.trim="user.phone"/>
    </el-form-item>
    <el-form-item label="主校名" v-if="user.user_type!==1">
      <el-input v-model.trim="user.main_school"/>
    </el-form-item>
    <el-form-item label="主校名" v-if="user.user_type===3">
      <el-input v-model.trim="user.sub_school"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        origin_pwd: '',
        password: '',
        confirm_pwd: '',
        user: {}
      }
    },
    created() {
      this.user = Object.assign({}, this.$store.state.user)
      this.user.role = this.user.roles[0]
    },
    methods: {
      submit() {
        if (this.confirm_pwd === this.password && this.origin_pwd === this.user.password)
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 5 * 1000
          })
      }
    }
  }
</script>

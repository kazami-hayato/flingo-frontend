<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.name"/>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model.trim="user.phone"/>
    </el-form-item>
    <el-form-item label="微信">
      <el-input v-model.trim="user.wechat"/>
    </el-form-item>
    <el-form-item label="邮件">
      <el-input v-model.trim="user.email"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model.trim="user.password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                default: () => {
                    return {
                        name: '',
                        phone: '',
                        wehcat: '',
                        password: '',
                        email: ''
                    }
                }
            }
        },
        methods: {
            submit() {
                this.$message({
                    message: '用户信息更新成功',
                    type: 'success',
                    duration: 5 * 1000
                })
            }
        }
    }
</script>

<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card/>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="操作记录" name="timeline">
                <timeline/>
              </el-tab-pane>
              <el-tab-pane label="账户信息" name="account">
                <account/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import UserCard from './components/UserCard'
  import Activity from './components/Activity'
  import Timeline from './components/Timeline'
  import Account from './components/Account'

  export default {
    name: 'Profile',
    components: {UserCard, Timeline, Account},
    data() {
      return {
        activeTab: 'account'
      }
    }
  }

</script>

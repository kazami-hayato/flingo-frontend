<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user"/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="账户信息" name="account">
                <account :user="user"/>
              </el-tab-pane>
              <el-tab-pane label="活动记录" name="timeline">
                <timeline/>
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
        components: {UserCard, Activity, Timeline, Account},
        data() {
            return {
                user: {},
                activeTab: 'account'
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'avatar',
                'roles'
            ])
        },
        created() {
            this.getUser()
        },
        methods: {
            getUser() {
                this.user = {
                    name: this.name,
                    role: this.roles.join(' | '),
                    wechat: 'smm',
                    sub_school: '鄂州大学',
                    phone: '13865486952',
                    email: 'admin@test.com',
                    password: 'any',
                    avatar: this.avatar,
                    rights: [
                        '学生','分校课程'
                    ]
                }
            }
        }
    }
</script>

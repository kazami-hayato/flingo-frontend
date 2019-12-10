<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import schoolDash from "./admin/schoolDash";
    import systemDash from "./admin/systemDash";

    export default {
        name: 'dash',
        components: {systemDash, schoolDash},
        data() {
            return {
                currentRole: 'systemDash'
            }
        },
        computed: {
            ...mapGetters([
                'roles'
            ])
        },
        created() {
            console.log(this.$store.state)
            if (!this.roles.includes('system')) {
                this.currentRole = 'schoolDash'
            }
        }
    }
</script>

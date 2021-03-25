<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      let basic_setting = this.$store.dispatch("getInfo/GetBasicSettingData");
      let sql_mess = this.$store.dispatch("getInfo/GetSqlSettingMess");
      Promise.all([basic_setting, sql_mess])
        .then(res => {
          this.isRouterAlive = false;
          this.$nextTick(function() {
            this.isRouterAlive = true;
          });
        })
        .catch(err => {
          this.$message({
            message: "获取基础数据失败，请刷新重试",
            type: "error"
          });
          this.isRouterAlive = false;
          this.$nextTick(function() {
            this.isRouterAlive = true;
          });
        });

      // this.$store
      //   .dispatch("getInfo/GetBasicSettingData")
      //   .then(res => {
      //     this.isRouterAlive = false;
      //     this.$nextTick(function() {
      //       this.isRouterAlive = true;
      //     });
      //   })
      //   .catch(err => {
      //     this.$message({
      //       message: "重新获取基础数据失败，请重试",
      //       type: "error"
      //     });
      //     this.isRouterAlive = false;
      //     this.$nextTick(function() {
      //       this.isRouterAlive = true;
      //     });
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
}
</style>

<template>
  <div class="app-container">
    <div class="dashboard-text">当前登录人: {{ username }}</div>
    <div class="dashboard-text">所属部门: {{ dptname }}</div>
    <el-button style="margin-top: 2rem" @click="logOut">退出登录</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { request, fetchPost } from "@/utils/http";

export default {
  name: "User",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["username"]),
    ...mapGetters(["dptname"]),
  },
  mounted() {
    // this.$store.dispatch("getInfo/GetLoginPsnData").then((res) => {});
  },
  methods: {
    logOut(){
      this.$store.dispatch("user/logout").then(res=>{
        sessionStorage.removeItem("loginInfo")
        this.$router.push("/")
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  font-size: 1.5rem;
}
</style>


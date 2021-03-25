<template>
  <div class="container">
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SpCard",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
<template>
  <div class="app-container">
    <div class="content">
      <div class="content-item">
        <psn-struc />
      </div>
      <div class="content-item">
        <month-sale />
      </div>
      <div class="content-item">
        <year-sale />
      </div>
      <div class="content-item">
        <sales-world />
      </div>
    </div>
  </div>
</template>

<script>
import PsnStruc from "./components/psn-struc";
import MonthSale from "./components/month-sale";
import YearSale from "./components/year-sale";
import SalesWorld from "./components/sales-world";
export default {
  name: "IndexConfig",
  components: {
    PsnStruc,
    MonthSale,
    YearSale,
    SalesWorld
  },
  data() {
    return {};
  },
  watch: {},
  beforeMount(){
    this.$store.dispatch("indexConfig/GetMatType")
  },
  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.app-container {
  @include content;
}
</style>

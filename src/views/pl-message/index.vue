<template>
  <div class="app-container">
    <div class="content">
      <div class="content-item">
        <daily-energy-consume style="width: 60rem" class="margin"></daily-energy-consume>
        <el-divider></el-divider>
        <daily-energy-sta style="width: 60rem" class="margin"></daily-energy-sta>
        <greige-in-and-out style="width: 60rem" class="margin"></greige-in-and-out>
        <fgood-in-and-out style="width: 60rem" class="margin"></fgood-in-and-out>
        <workshop-product style="width:60rem" class="margin"></workshop-product>
        <mix-queue style="width: 60rem" class="margin"></mix-queue>
        <delivery-queue style="width: 60rem" class="margin"></delivery-queue>
      </div>
    </div>
  </div>
</template>

<script>
import SpCard from "../ps-overview/components/sp-card.vue";
import DailyEnergyConsume from "./components/daily-energy-consume";
import DailyEnergySta from "./components/daily-energy-sta";
import GreigeInAndOut from "./components/greige-in-and-out";
import FgoodInAndOut from "./components/fgood-in-and-out";
import WorkshopProduct from "./components/workshop-product";
import MixQueue from "./components/mix-queue";
import DeliveryQueue from "./components/delivery-queue";
export default {
  inject: ["reload"],
  name: "PlMessage",
  components: {
    SpCard,
    DailyEnergyConsume,
    DailyEnergySta,
    GreigeInAndOut,
    FgoodInAndOut,
    WorkshopProduct,
    MixQueue,
    DeliveryQueue
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.app-container {
  @include content;
  .content {
    &-item {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .margin {
        margin-left: 1rem;
        margin-top: 0.5rem;
      }
    }
   
  }
}
</style>

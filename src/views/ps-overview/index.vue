<template>
  <div class="app-container">
    <div class="content">
      <div class="content-item">
        <div class="content-item-title">汇总统计</div>
        <div class="forms">
          <sta-card class="margin" title="坯布采购" events="采购"></sta-card>
          <sta-card class="margin" title="坯布投坯" events="投坯"></sta-card>
          <sta-card
            class="margin"
            title="成品产出"
            events="成品产出"
          ></sta-card>
          <sta-card class="margin" title="成品销售" events="销售"></sta-card>
          <sta-card
            class="margin"
            title="成品库存"
            events="成品库存"
            unit=""
          ></sta-card>
          <sta-card
            class="margin"
            title="水"
            events="水量"
            unit="(吨):"
          ></sta-card>
          <sta-card
            class="margin"
            title="电"
            events="电量"
            unit="(度):"
          ></sta-card>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="content-item">
        <div class="forms">
          <greige-inv class="margin"></greige-inv>
          <greige-rank class="margin"></greige-rank>
          <greige-sale-rank class="margin"></greige-sale-rank>
          <output-sta class="margin"></output-sta>
          <greige-casting class="margin"></greige-casting>
          <sale-sta class="margin"></sale-sta>
          <energy-consume class="margin"></energy-consume>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpCard from "@/components/sp-card.vue";
import StaCard from "./components/sta-card";
import GreigeInv from "./components/greige-inv";
import GreigeRank from "./components/greige-rank";
import GreigeSaleRank from "./components/greige-sale-rank";
import OutputSta from "./components/output-sta";
import GreigeCasting from "./components/greige-casting";
import SaleSta from "./components/sale-sta";
import EnergyConsume from "./components/energy-consume";
export default {
  inject: ["reload"],
  name: "PsOverview",
  components: {
    SpCard,
    StaCard,
    GreigeInv,
    GreigeRank,
    GreigeSaleRank,
    OutputSta,
    GreigeCasting,
    SaleSta,
    EnergyConsume,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.app-container {
  @include content;
  .content {
    &-item {
      .forms {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .margin {
          margin-right: 0.5rem;
          margin-top: 0.5rem;
        }
        .form {
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>

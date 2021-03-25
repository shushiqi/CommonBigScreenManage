<template>
  <div class="app-container">
    <div class="content">
      <el-select
        :value="optionValue"
        placeholder="请选择车间"
        @change="changeWorkshop"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <device-status
        :id="optionValue"
        style="width: 80rem"
        class="margin"
      ></device-status>
      <device-warn
        :id="optionValue"
        style="width: 40rem"
        class="margin"
      ></device-warn>

      <el-divider></el-divider>
      <div class="tables">
        <work-in-process
          :id="optionValue"
          style="width: 27rem"
          class="margin"
        ></work-in-process>
        <device-list
          :id="optionValue"
          style="width: 27rem"
          class="margin"
        ></device-list>
        <device-effect
          :id="optionValue"
          style="width: 27rem"
          class="margin"
        ></device-effect>
      </div>
    </div>
  </div>
</template>

<script>
import SpCard from "../ps-overview/components/sp-card.vue";
import DeviceStatus from "./components/device-status";
import DeviceWarn from "./components/device-warn";
import WorkInProcess from "./components/work-in-process";
import DeviceList from "./components/device-list";
import DeviceEffect from "./components/device-effect";
export default {
  inject: ["reload"],
  name: "DeviceMonitoring",
  components: {
    SpCard,
    DeviceStatus,
    DeviceWarn,
    WorkInProcess,
    DeviceList,
    DeviceEffect
  },
  data() {
    return {
      options: [
        {
          value: "",
          label: ""
        }
      ],
      // 车间id
      optionValue: ""
    };
  },
  mounted() {
    this.$store.dispatch("deviceMonitoring/GetWorkShopList").then(res => {
      if (res.data.length > 0) {
        this.options = [];
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          let item = { value: "", label: "" };
          item.value = element.id;
          item.label = element.workshop;
          this.options.push(item);
        }
        this.optionValue = this.options[0].value;
      }
    });
  },
  methods: {
    changeWorkshop(value) {
      this.optionValue = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  .content {
    .tables {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .form {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    }
    .margin {
      margin-top: 0.5rem;
      margin-right: 1rem;
    }
    .button {
      width: 100%;
      margin-top: 4rem;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="dash-container">
    <div class="configuration">
      <el-form ref="configForm" :model="form" label-width="auto" :rules="rules">
        <el-row>
          <div class="configuration-item">
            <div class="configuration-item-title">数据源配置</div>
            <!-- <el-col :span="6">
              <el-form-item prop="customizeData" label="是否启用自定义数据">
                <el-switch
                  v-model="form.customizeData"
                ></el-switch> </el-form-item
            ></el-col> -->
            <el-col :span="9"
              ><el-form-item prop="isusecollectdata" label="是否有采集数据">
                <el-switch
                  v-model="form.isusecollectdata"
                ></el-switch> </el-form-item
            ></el-col>
            <el-col :span="15">
              <el-form-item prop="domain" label="域名">
                <el-input v-model="form.domain"></el-input> </el-form-item
            ></el-col>
            <el-col :span="9"
              ><el-form-item prop="longitude" label="经度">
                <el-input-number
                  style="width: 10rem"
                  controls-position="right"
                  v-model.number="form.longitude"
                ></el-input-number> </el-form-item
            ></el-col>
            <el-col :span="9">
              <el-form-item prop="latitude" label="纬度">
              <el-input-number
                  style="width: 10rem"
                  controls-position="right"
                  v-model.number="form.latitude"
                ></el-input-number> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item prop="maptype" label="是否采用中国地图">
                <el-switch v-model="form.maptype"></el-switch> </el-form-item
            ></el-col>
          </div>
          <div class="configuration-item">
            <div class="configuration-item-title">标题配置</div>
            <el-col :span="9">
              <el-form-item label="标题名称" prop="titleName">
                <el-input
                  style="width: 16rem"
                  v-model="form.titleName"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="15">
              <el-form-item label="标题字号" prop="titleSize">
                <el-input
                  style="width: 6rem"
                  v-model="form.titleSize"
                ></el-input> </el-form-item
            ></el-col>
          </div>
          <div class="configuration-item">
            <div class="configuration-item-title">展示页面配置</div>
            <el-col :span="12">
              <el-form-item prop="refreshtime" label="数据刷新时间(秒)">
                <el-input-number v-model="form.refreshtime"></el-input-number>
                <!-- <el-input
                  v-model.number="form.refreshtime"
                ></el-input> -->
              </el-form-item></el-col
            >
            <el-col :span="12">
              <el-form-item prop="refreshtime" label="实时曲线读取时间间隔(秒)">
                <el-input-number v-model="form.carvereadtime"></el-input-number>
                <!-- <el-input
                  v-model.number="form.refreshtime"
                ></el-input> -->
              </el-form-item></el-col
            >
          </div>
          <!-- <div class="configuration-item">
            <div class="configuration-item-title">自定义数据配置</div>
            <sp-card class="card" title="首页">
              <el-col
                :span="item.spanCol"
                v-for="(item, index) in customizeDataForm1"
                :key="index"
              >
                <el-form-item :prop="item.value" :label="item.label">
                  <el-switch v-model="form[item.value]"></el-switch>
                </el-form-item>
              </el-col>
            </sp-card>
            <sp-card class="card" title="产销总览">
              <el-col
                :span="item.spanCol"
                v-for="(item, index) in customizeDataForm2"
                :key="index"
              >
                <el-form-item :prop="item.value" :label="item.label">
                  <el-switch v-model="form[item.value]"></el-switch>
                </el-form-item>
              </el-col>
            </sp-card>
            <sp-card class="card" title="产线动态">
              <el-col
                :span="item.spanCol"
                v-for="(item, index) in customizeDataForm3"
                :key="index"
              >
                <el-form-item :prop="item.value" :label="item.label">
                  <el-switch v-model="form[item.value]"></el-switch>
                </el-form-item> </el-col
            ></sp-card>
            <sp-card class="card" title="设备监控">
              <el-col
                :span="item.spanCol"
                v-for="(item, index) in customizeDataForm4"
                :key="index"
              >
                <el-form-item :prop="item.value" :label="item.label">
                  <el-switch v-model="form[item.value]"></el-switch>
                </el-form-item>
              </el-col>
            </sp-card>
          </div> -->
        </el-row>

        <el-form-item class="button">
          <el-button type="primary" @click="submit('configForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SpCard from "../ps-overview/components/sp-card";
export default {
  inject: ["reload"],
  name: "BasicInfo",
  components: {
    SpCard,
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (typeof value != "number") {
        return callback(new Error("输入的值应当为数字"));
      }
      if (value < 5) {
        return callback(new Error("输入的值应当大于5"));
      }
    };
    const validateLongitude = (rule, value, callback) => {
      // if (typeof value != "number") {
      //   return callback(new Error("输入的值应当为数字"));
      // }
      if (value < -180) {
        return callback(new Error("输入的值应当大于-180"));
      }
      if (value > 180) {
        return callback(new Error("输入的值应当小于180"));
      }
    };
    const validateLatitude = (rule, value, callback) => {
      // if (typeof value != "number") {
      //   return callback(new Error("输入的值应当为数字"));
      // }
      if (value < -90) {
        return callback(new Error("输入的值应当大于-90"));
      }
      if (value > 90) {
        return callback(new Error("输入的值应当小于90"));
      }
    };
    return {
      labelPosition: "left",
      form: {
        customizeData: false,
        isusecollectdata: false,
        titleName: "",
        titleSize: 12,
        domain: "http://www.enterpointxrm.com/CommonBigScreenBack/index.html",
        refreshtime: 10,
        psnstruct: false,
        salesyearly: false,
        curmonthsales: false,
        curyearsales: false,
        curyearsalesinworld: false,
        grepurchase: false,
        grecasting: false,
        fgoutput: false,
        fgsales: false,
        fgInv: false,
        water: false,
        elect: false,
        greInv: false,
        yearlyoutput: false,
        yearlygrecastingrank: false,
        yearlysalesrank: false,
        yearlygrecasting: false,
        yearlysales: false,
        energyconsume: false,
        dayenergyconsume: false,
        dayworkshopenergyconsume: false,
        daygreinandout: false,
        dayfginandout: false,
        dayworkshopproduct: false,
        mixingqueen: false,
        deliveryqueen: false,
        mcnstatus: false,
        mcnwarningsql: false,
        seqinprocess: false,
        mcnlist: false,
        mcnefficiency: false,
        carvereadtime: "",
        longitude: "",
        latitude: "",
        maptype: false,
      },
      customizeDataForm1: [
        { label: "人员结构", value: "psnstruct", spanCol: 6 },
        { label: "企业销售年趋势", value: "salesyearly", spanCol: 6 },
        { label: "当月销售详情", value: "curmonthsales", spanCol: 6 },
        { label: "本年销售趋势", value: "curyearsales", spanCol: 6 },
        {
          label: "本年度各地销售详情",
          value: "curyearsalesinworld",
          spanCol: 6,
        },
      ],
      customizeDataForm2: [
        { label: "坯布采购", value: "grepurchase", spanCol: 6 },
        { label: "坯布投坯", value: "grecasting", spanCol: 6 },
        { label: "成品产出", value: "fgoutput", spanCol: 6 },
        { label: "成品销售", value: "fgsales", spanCol: 6 },
        { label: "成品库存", value: "fgInv", spanCol: 6 },
        { label: "水", value: "water", spanCol: 6 },
        { label: "电", value: "elect", spanCol: 6 },
        { label: "当前坯布库存品种", value: "greInv", spanCol: 6 },
        { label: "本年产出统计", value: "yearlyoutput", spanCol: 6 },
        {
          label: "本年投坯品种排名",
          value: "yearlygrecastingrank",
          spanCol: 6,
        },
        { label: "本年销售品种排名", value: "yearlysalesrank", spanCol: 6 },
        { label: "本年投坯统计", value: "yearlygrecasting", spanCol: 6 },
        { label: "本年销售统计", value: "yearlysales", spanCol: 6 },
        { label: "年度能耗统计", value: "energyconsume", spanCol: 18 },
      ],
      customizeDataForm3: [
        { label: "当日耗能统计", value: "dayenergyconsume", spanCol: 6 },
        {
          label: "当日车间耗能统计",
          value: "dayworkshopenergyconsume",
          spanCol: 6,
        },
        { label: "当日坯布出入库统计", value: "daygreinandout", spanCol: 6 },
        { label: "当日成品出入库统计", value: "dayfginandout", spanCol: 6 },
        { label: "当日车间产量统计", value: "dayworkshopproduct", spanCol: 6 },
        { label: "调浆队列", value: "mixingqueen", spanCol: 6 },
        { label: "配送队列", value: "deliveryqueen", spanCol: 12 },
      ],
      customizeDataForm4: [
        { label: "设备状态", value: "mcnstatus", spanCol: 6 },
        { label: "设备报警详情", value: "mcnwarningsql", spanCol: 6 },
        { label: "工序在制品情况", value: "seqinprocess", spanCol: 6 },
        { label: "机台", value: "mcnlist", spanCol: 6 },
        { label: "设备效率分析", value: "mcnefficiency", spanCol: 6 },
      ],
      rules: {
        refreshtime: [{ validator: validateNumber, trigger: "blur" }],
        longitude: [{ validator: validateLongitude, trigger: "blur" }],
        latitude: [{ validator: validateLatitude, trigger: "blur" }],
      },
    };
  },
  methods: {
    submit(formName) {
      if (this.form.refreshtime < 5) {
        this.$message({
          message: "输入的值应当大于5",
          type: "error",
        });
        return;
      } else {
        let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
        this.$store
          .dispatch("setInfo/SaveBasicSettingMess", [
            {
              ep_basicsettingid: "",
              ep_isusecustomizedata: this.form.customizeData ? 1 : 0,
              ep_isusecollectdata: this.form.isusecollectdata ? 1 : 0,
              ep_titlename: this.form.titleName,
              ep_titlesize: this.form.titleSize,
              ep_attr1: this.form.domain,
              ep_attr2: this.form.refreshtime,
              ep_attr3: this.form.psnstruct ? "1" : "0",
              ep_attr4: this.form.salesyearly ? "1" : "0",
              ep_attr5: this.form.curmonthsales ? "1" : "0",
              ep_attr6: this.form.curyearsales ? "1" : "0",
              ep_attr7: this.form.curyearsalesinworld ? "1" : "0",
              ep_attr8: this.form.grepurchase ? "1" : "0",
              ep_attr9: this.form.grecasting ? "1" : "0",
              ep_attr10: this.form.fgoutput ? "1" : "0",
              ep_attr11: this.form.fgsales ? "1" : "0",
              ep_attr12: this.form.fgInv ? "1" : "0",
              ep_attr13: this.form.water ? "1" : "0",
              ep_attr14: this.form.elect ? "1" : "0",
              ep_attr15: this.form.greInv ? "1" : "0",
              ep_attr16: this.form.yearlyoutput ? "1" : "0",
              ep_attr17: this.form.yearlygrecastingrank ? "1" : "0",
              ep_attr18: this.form.yearlysalesrank ? "1" : "0",
              ep_attr19: this.form.yearlygrecasting ? "1" : "0",
              ep_attr20: this.form.yearlysales ? "1" : "0",
              ep_attr21: this.form.energyconsume ? "1" : "0",
              ep_attr22: this.form.dayenergyconsume ? "1" : "0",
              ep_attr23: this.form.dayworkshopenergyconsume ? "1" : "0",
              ep_attr24: this.form.daygreinandout ? "1" : "0",
              ep_attr25: this.form.dayfginandout ? "1" : "0",
              ep_attr26: this.form.dayworkshopproduct ? "1" : "0",
              ep_attr27: this.form.mixingqueen ? "1" : "0",
              ep_attr28: this.form.deliveryqueen ? "1" : "0",
              ep_attr29: this.form.mcnstatus ? "1" : "0",
              ep_attr30: this.form.mcnwarningsql ? "1" : "0",
              ep_attr31: this.form.seqinprocess ? "1" : "0",
              ep_attr32: this.form.mcnlist ? "1" : "0",
              ep_attr33: this.form.mcnefficiency ? "1" : "0",
              ep_attr34: this.form.carvereadtime,
              ep_attr35: this.form.longitude,
              ep_attr36: this.form.latitude,
              ep_attr37: this.form.maptype ? "1" : "0",
              createdby: this.$store.state.user.userid,
              createdon: createTime,
            },
          ])
          .then((res) => {
            if (res.data > 0) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.reload();
            } else {
              this.$message({
                message: "保存失败",
                type: "error",
              });
            }
          });
      }
    },
  },
  mounted() {
    this.$store.dispatch("getInfo/GetBasicSettingData").then((res) => {
      for (const key in this.form) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          const element = this.form[key];
          if (res.data[0] && res.data[0][key])
            this.form[key] = res.data[0][key] == "1" ? true : false;
        }
      }
      this.form.titleName = res.data[0].titlename;
      this.form.titleSize = res.data[0].titlesize;
      if (res.data[0].domain != "") {
        this.form.domain = res.data[0].domain;
      }
      this.form.refreshtime = res.data[0].refreshtime
        ? parseFloat(res.data[0].refreshtime)
        : 10;
      this.form.carvereadtime = res.data[0].carvereadtime
        ? res.data[0].carvereadtime
        : "";
      this.form.longitude = res.data[0].longitude ? res.data[0].longitude : "";
      this.form.latitude = res.data[0].latitude ? res.data[0].latitude : "";
    });
  },
};
</script>

<style lang="scss" scoped>
.dash {
  &-container {
    margin-left: 1.875rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .configuration {
      width: 100%;
      margin-top: 1.875rem;
      &-item {
        width: 70%;
        margin-left: 0;
        &-title {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }
        .card {
          margin-bottom: 0.5rem;
        }
      }
      .button {
        width: 50%;
        margin-top: 4rem;
        text-align: center;
      }
    }
  }
}
</style>

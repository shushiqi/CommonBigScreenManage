<template>
  <div class="app-container">
    <el-form
      class="form"
      ref="form"
      :model="form"
      label-width="12rem"
      label-suffix="SQL:"
      :rules="rules"
    >
      <sp-card class="card" title="首页" style="width: 70%">
        <el-form-item
          v-for="item in dataForm1"
          :key="item.label"
          :label="item.label"
          :prop="item.value"
          class="formItem"
        >
          <div class="input">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入SQL语句"
              v-model="form[item.value]"
              maxlength="8000"
            >
            </el-input>
          </div>
          <span class="elButton">
            <el-button type="primary" @click="sqlCheck(form[item.value])"
              >校验</el-button
            >
          </span>
        </el-form-item>
      </sp-card>
      <sp-card class="card" title="产销总览" style="width: 70%">
        <el-form-item
          v-for="item in dataForm2"
          :key="item.label"
          :label="item.label"
          :prop="item.value"
          class="formItem"
        >
          <div class="input">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入SQL语句"
              v-model="form[item.value]"
              maxlength="8000"
            >
            </el-input>
          </div>
          <span class="elButton">
            <el-button type="primary" @click="sqlCheck(form[item.value])"
              >校验</el-button
            >
          </span>
        </el-form-item>
      </sp-card>
      <sp-card class="card" title="产线动态" style="width: 70%">
        <el-form-item
          v-for="item in dataForm3"
          :key="item.label"
          :label="item.label"
          :prop="item.value"
       class="formItem"   >
          <div class="input">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入SQL语句"
              v-model="form[item.value]"
              maxlength="8000"
            >
            </el-input>
          </div>
          <span class="elButton">
            <el-button type="primary" @click="sqlCheck(form[item.value])"
              >校验</el-button
            >
          </span>
        </el-form-item>
      </sp-card>
      <sp-card class="card" title="设备监控" style="width: 70%">
        <el-form-item
          v-for="item in dataForm4"
          :key="item.label"
          :label="item.label"
          :prop="item.value"
        class="formItem"  >
          <div class="input">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入SQL语句"
              v-model="form[item.value]"
              maxlength="8000"
            >
            </el-input>
          </div>
          <span class="elButton">
            <el-button type="primary" @click="sqlCheck(form[item.value])"
              >校验</el-button
            >
          </span>
        </el-form-item>
      </sp-card>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SpCard from "../ps-overview/components/sp-card";
import { replaceSQLString } from "@/utils/fixTableData";
export default {
  inject: ["reload"],
  name: "SQLConfig",
  components: {
    SpCard
  },
  data() {
    return {
      form: {
        psnstructsql: "",
        salesyearlysql: "",
        curmonthsalessql: "",
        curyearsalessql: "",
        curyearsalesinworldsql: "",
        grepurchasesql: "",
        grecastingsql: "",
        fgoutputsql: "",
        fgsalessql: "",
        fgInvsql: "",
        watersql: "",
        electsql: "",
        greInvsql: "",
        yearlyoutputsql: "",
        yearlygrecastingranksql: "",
        yearlysalesranksql: "",
        yearlygrecastingsql: "",
        yearlysalessql: "",
        energyconsumesql: "",
        dayenergyconsumesql: "",
        dayworkshopenergyconsumesql: "",
        daygreinandoutsql: "",
        dayfginandoutsql: "",
        dayworkshopproductsql: "",
        mixingqueensql: "",
        deliveryqueensql: "",
        mcnstatussql: "",
        mcnwarningsql: "",
        seqinprocesssql: "",
        mcnlistsql: "",
        mcnefficiencysql: ""
      },
      dataForm1: [
        { label: "人员结构", value: "psnstructsql" },
        { label: "企业销售年趋势", value: "salesyearlysql" },
        { label: "当月销售详情", value: "curmonthsalessql" },
        { label: "本年销售趋势", value: "curyearsalessql" },
        { label: "本年度各地销售详情", value: "curyearsalesinworldsql" }
      ],
      dataForm2: [
        { label: "坯布采购", value: "grepurchasesql" },
        { label: "坯布投坯", value: "grecastingsql" },
        { label: "成品产出", value: "fgoutputsql" },
        { label: "成品销售", value: "fgsalessql     " },
        { label: "成品库存", value: "fgInvsql" },
        { label: "水", value: "watersql" },
        { label: "电", value: "electsql" },
        { label: "当前坯布库存品种", value: "greInvsql" },
        { label: "本年产出统计", value: "yearlyoutputsql" },
        { label: "本年投坯品种排名", value: "yearlygrecastingranksql" },
        { label: "本年销售品种排名", value: "yearlysalesranksql" },
        { label: "本年投坯统计", value: "yearlygrecastingsql" },
        { label: "本年销售统计", value: "yearlysalessql" },
        { label: "年度能耗统计", value: "energyconsumesql" }
      ],
      dataForm3: [
        { label: "当日耗能统计", value: "dayenergyconsumesql" },
        { label: "当日车间耗能统计", value: "dayworkshopenergyconsumesql" },
        { label: "当日坯布出入库统计", value: "daygreinandoutsql" },
        { label: "当日成品出入库统计", value: "dayfginandoutsql" },
        { label: "当日车间产量统计", value: "dayworkshopproductsql" },
        { label: "调浆队列", value: "mixingqueensql" },
        { label: "配送队列", value: "deliveryqueensql" }
      ],
      dataForm4: [
        { label: "设备状态", value: "mcnstatussql" },
        { label: "设备报警详情", value: "mcnwarningsql" },
        { label: "工序在制品情况", value: "seqinprocesssql" },
        { label: "机台", value: "mcnlistsql" },
        { label: "设备效率分析", value: "mcnefficiencysql" }
      ],
      rules: {
        psnstructsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        salesyearlysql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        curmonthsalessql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        curyearsalessql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        curyearsalesinworldsql: [
          { max: 8000, message: "文本输入长度需小于8000" }
        ],
        grepurchasesql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        grecastingsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        fgoutputsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        fgsalessql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        fgInvsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        watersql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        electsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        greInvsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        yearlyoutputsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        yearlygrecastingranksql: [
          { max: 8000, message: "文本输入长度需小于8000" }
        ],
        yearlysalesranksql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        yearlygrecastingsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        yearlysalessql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        energyconsumesql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        dayenergyconsumesql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        dayworkshopenergyconsumesql: [
          { max: 8000, message: "文本输入长度需小于8000" }
        ],
        daygreinandoutsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        dayfginandoutsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        dayworkshopproductsql: [
          { max: 8000, message: "文本输入长度需小于8000" }
        ],
        mixingqueensql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        deliveryqueensql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        mcnstatussql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        mcnwarningsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        seqinprocesssql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        mcnlistsql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        mcnefficiencysql: [{ max: 8000, message: "文本输入长度需小于8000" }],
        inputLength: [
          {
            max: 8000,
            message: "文本输入长度需小于8000"
          }
        ]
      }
    };
  },
  mounted() {
    GetSqlSettingMess.then(res => {
      for (const key in this.form) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          const element = this.form[key];
          if (res.data[0] && res.data[0][key])
            this.form[key] = res.data[0][key];
        }
      }
    });
  },
  methods: {
    onSubmit(formName) {
      // this.$refs.form.validate((valid) => {
      //
      // if (valid) {
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");

      this.$store
        .dispatch("setInfo/SaveSqlSettingMess", [
          {
            ep_sqlsettingid: "",
            ep_attr1: replaceSQLString(this.form.psnstructsql),
            ep_attr2: replaceSQLString(this.form.salesyearlysql),
            ep_attr3: replaceSQLString(this.form.curmonthsalessql),
            ep_attr4: replaceSQLString(this.form.curyearsalessql),
            ep_attr5: replaceSQLString(this.form.curyearsalesinworldsql),
            ep_attr6: replaceSQLString(this.form.grepurchasesql),
            ep_attr7: replaceSQLString(this.form.grecastingsql),
            ep_attr8: replaceSQLString(this.form.fgoutputsql),
            ep_attr9: replaceSQLString(this.form.fgsalessql),
            ep_attr10: replaceSQLString(this.form.fgInvsql),
            ep_attr11: replaceSQLString(this.form.watersql),
            ep_attr12: replaceSQLString(this.form.electsql),
            ep_attr13: replaceSQLString(this.form.greInvsql),
            ep_attr14: replaceSQLString(this.form.yearlyoutputsql),
            ep_attr15: replaceSQLString(this.form.yearlygrecastingranksql),
            ep_attr16: replaceSQLString(this.form.yearlysalesranksql),
            ep_attr17: replaceSQLString(this.form.yearlygrecastingsql),
            ep_attr18: replaceSQLString(this.form.yearlysalessql),
            ep_attr19: replaceSQLString(this.form.energyconsumesql),
            ep_attr20: replaceSQLString(this.form.dayenergyconsumesql),
            ep_attr21: replaceSQLString(this.form.dayworkshopenergyconsumesql),
            ep_attr22: replaceSQLString(this.form.daygreinandoutsql),
            ep_attr23: replaceSQLString(this.form.dayfginandoutsql),
            ep_attr24: replaceSQLString(this.form.dayworkshopproductsql),
            ep_attr25: replaceSQLString(this.form.mixingqueensql),
            ep_attr26: replaceSQLString(this.form.deliveryqueensql),
            ep_attr27: replaceSQLString(this.form.mcnstatussql),
            ep_attr28: replaceSQLString(this.form.mcnwarningsql),
            ep_attr29: replaceSQLString(this.form.seqinprocesssql),
            ep_attr30: replaceSQLString(this.form.mcnlistsql),
            ep_attr31: replaceSQLString(this.form.mcnefficiencysql),
            createdby: this.$store.state.user.userid,
            createdon: createTime
          }
        ])
        .then(res => {
          if (res.data > 0) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.reload();
          } else {
            this.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
    },
    sqlCheck(str) {
      let sql = replaceSQLString(str);
      console.log(sql);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // flex-wrap: wrap;
    .card {
      margin-bottom: 0.5rem;
      .formItem {
        //  display: flex;
        //     justify-content: center;
        //     align-items: center;
        .input {
          display: inline-block;
          width: 80%;
        }
        .elButton {
          margin-left: 1rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>

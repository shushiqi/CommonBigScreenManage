<template>
  <div class="container">
    <sp-card :title="title" style="width:21.875rem">
      <span slot="header">
        <el-switch class="switchBtn" v-model="switchBtn"></el-switch>
        <br />
        <div class="btnGroup">
          <el-button type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </span>
      <el-form
        ref="form"
        :model="form[0]"
        label-width="auto"
        :label-suffix="unit"
        v-if="switchBtn"
      >
        <el-form-item :label="dayLabel">
          <el-input v-model="form[0].dayqty"></el-input>
        </el-form-item>
        <el-form-item :label="monthLabel">
          <el-input v-model="form[0].monthqty"></el-input>
        </el-form-item>
        <el-form-item :label="yearLabel">
          <el-input v-model="form[0].yearqty"></el-input>
        </el-form-item>
      </el-form>
      <el-input
        v-else
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入SQL语句"
        v-model="sqlString"
        maxlength="8000"
      >
      </el-input>
    </sp-card>
  </div>
</template>

<script>
import SpCard from "@/components/sp-card.vue";
import { pushType, replaceSQLString } from "@/utils/fixTableData.js";
export default {
  inject: ["reload"],
  name: "StaCard",
  components: {
    SpCard
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: "(万米):"
    },
    events: {
      type: String,
      default: ""
    }
  },
  computed: {
    dayLabel: function() {
      let label = "";
      label =
        this.events == "成品库存"
          ? "总成品库存(万米):"
          : "当日总" + this.events;
      return label;
    },
    monthLabel: function() {
      let label = "";
      label =
        this.events == "成品库存" ? "总库存卷数(卷):" : "当月总" + this.events;
      return label;
    },
    yearLabel: function() {
      let label = "";
      label =
        this.events == "成品库存" ? "总库存品种(个):" : "本年总" + this.events;
      return label;
    }
  },
  data() {
    return {
      switchBtn: false,
      form: [
        {
          dayqty: "",
          monthqty: "",
          yearqty: ""
        }
      ],
      sqlString: "",
      type: 0,
      sqlflg: 0
    };
  },
  mounted() {
    let action = "psOverview/";
    switch (this.events) {
      case "采购":
        action += "GetGrePurchaseData";
        this.switchBtn = this.$store.state.getInfo.customizedData.grepurchase;
        this.sqlString = this.$store.state.getInfo.sqlMess.grepurchasesql;
        this.type = 1;
        this.sqlflg = 6;
        break;
      case "投坯":
        action += "GetGreCastingData";
        this.switchBtn = this.$store.state.getInfo.customizedData.grecasting;
        this.sqlString = this.$store.state.getInfo.sqlMess.grecastingsql;
        this.type = 2;
        this.sqlflg = 7;
        break;
      case "成品产出":
        action += "GetFgOutPutData";
        this.switchBtn = this.$store.state.getInfo.customizedData.fgoutput;
        this.sqlString = this.$store.state.getInfo.sqlMess.fgoutputsql;
        this.type = 3;
        this.sqlflg = 8;
        break;
      case "销售":
        action += "GetFgSalesData";
        this.switchBtn = this.$store.state.getInfo.customizedData.fgsales;
        this.sqlString = this.$store.state.getInfo.sqlMess.fgsalessql;
        this.type = 4;
        this.sqlflg = 9;
        break;
      case "成品库存":
        action += "GetFgInvData";
        this.switchBtn = this.$store.state.getInfo.customizedData.fgInv;
        this.sqlString = this.$store.state.getInfo.sqlMess.fgInvsql;
        this.type = 5;
        this.sqlflg = 10;
        break;
      case "水量":
        action += "GetWaterConsumeData";
        this.switchBtn = this.$store.state.getInfo.customizedData.water;
        this.sqlString = this.$store.state.getInfo.sqlMess.watersql;
        this.type = 6;
        this.sqlflg = 11;
        break;
      case "电量":
        action += "GetElecConsumeData";
        this.switchBtn = this.$store.state.getInfo.customizedData.elect;
        this.sqlString = this.$store.state.getInfo.sqlMess.electsql;
        this.type = 7;
        this.sqlflg = 12;
        break;
      default:
        break;
    }

    this.$store.dispatch(action).then(res => {
      this.form =
        res.data.length > 0
          ? res.data
          : [{ dayqty: "", monthqty: "", yearqty: "" }];
    });
  },
  methods: {
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");

      if (this.switchBtn) {
        let table = pushType(this.form, this.type);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_productandsalessettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.dayqty,
            ep_attr2: "" + element.monthqty,
            ep_attr3: "" + element.yearqty,
            createdby: creater,
            createdon: createTime
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          // ep_attr1: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime
        });
        switch (this.events) {
          case "采购":
            postObj[0].ep_attr6 = replaceSQLString(this.sqlString);
            break;
          case "投坯":
            postObj[0].ep_attr7 = replaceSQLString(this.sqlString);
            break;
          case "成品产出":
            postObj[0].ep_attr8 = replaceSQLString(this.sqlString);
            break;
          case "销售":
            postObj[0].ep_attr9 = replaceSQLString(this.sqlString);
            break;
          case "成品库存":
            postObj[0].ep_attr10 = replaceSQLString(this.sqlString);
            break;
          case "水量":
            postObj[0].ep_attr11 = replaceSQLString(this.sqlString);
            break;
          case "电量":
            postObj[0].ep_attr12 = replaceSQLString(this.sqlString);
            break;

          default:
            break;
        }
      }
      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn
              ? "ep_productandsalessetting"
              : "ep_sqlsetting",
            type: this.type,
            flg: this.switchBtn ? "1" : "0",
            sqlflg: this.sqlflg
          }
        })
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
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .switchBtn {
    margin-left: 1rem;
  }
  .btnGroup {
    margin-top: 0.5rem;
  }
}
</style>

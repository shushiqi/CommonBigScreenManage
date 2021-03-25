<template>
  <div class="container">
    <sp-card title="当日能耗统计">
      <span slot="header">
        <el-switch class="switchBtn" v-model="switchBtn"></el-switch>
        <br />
        <div class="btnGroup">
          <el-button type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </span>
      <el-form
        v-if="switchBtn"
        ref="form"
        :inline="true"
        v-model="tableData[0]"
        label-width="auto"
      >
        <el-form-item label="运行中">
          <el-input v-model="tableData[0].runningqty"></el-input>
        </el-form-item>
        <el-form-item label="保养预警">
          <el-input v-model="tableData[0].mwarningqty"></el-input>
        </el-form-item>
        <el-form-item label="报警中">
          <el-input v-model="tableData[0].alarmingqty"></el-input>
        </el-form-item>
        <el-form-item label="停机">
          <el-input v-model="tableData[0].stopqty"></el-input>
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
import SpCard from "@/components/sp-card";
import { pushType, replaceSQLString } from "@/utils/fixTableData.js";
export default {
  inject: ["reload"],
  name: "DeviceStatus",
  components: {
    SpCard
  },
  props: {
    id: {
      type: String,
      defult: ""
    }
  },
  watch: {
    id: function(newVal) {
      this.$store
        .dispatch("deviceMonitoring/GetMcnStatusSummaryData", {
          workshopid: newVal
        })
        .then(res => {
          this.tableData =
            res.data.length > 0
              ? res.data
              : [{ runningqty: 0, mwarningqty: 0, alarmingqty: 0, stopqty: 0 }];
        });
    }
  },
  data() {
    return {
      tableData: [
        {
          daywaterqty: "",
          dayelecqty: "",
          daygasqty: ""
        }
      ],
      switchBtn: false,
      sqlString: ""
    };
  },
  mounted() {
    this.switchBtn = this.$store.state.getInfo.customizedData.mcnstatus;
    this.sqlString = this.$store.state.getInfo.sqlMess.mcnstatussql;
  },
  methods: {
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn) {
        let table = pushType(this.tableData, 1);

        let item = {
          ep_mcnmonitoringsettingid: "",
          ep_workshop: this.id,
          ep_type: table[0].type,
          ep_attr1: "" + table[0].runningqty,
          ep_attr2: "" + table[0].mwarningqty,
          ep_attr3: "" + table[0].alarmingqty,
          ep_attr4: "" + table[0].stopqty,
          createdby: creater,
          createdon: createTime
        };
        postObj.push(item);
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr27: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime
        });
      }

      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn
              ? "ep_mcnmonitoringsetting"
              : "ep_sqlsetting",
            type: "1",
            flg: this.switchBtn ? "1" : "0",
            sqlflg: "27"
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

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
        <el-form-item label="当日用水(吨)">
          <el-input v-model="tableData[0].daywaterqty"></el-input>
        </el-form-item>
        <el-form-item label="当日用电(度)">
          <el-input v-model="tableData[0].dayelecqty"></el-input>
        </el-form-item>
        <el-form-item label="当日用气(m³)">
          <el-input v-model="tableData[0].daygasqty"></el-input>
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
  name: "EnergyConsume",
  components: {
    SpCard
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
    this.switchBtn = this.$store.state.getInfo.customizedData.dayenergyconsume;
    this.sqlString = this.$store.state.getInfo.sqlMess.dayenergyconsumesql;
    this.$store.dispatch("plMessage/GetDayEnergyConsumeData").then(res => {
      this.tableData =
        res.data.length > 0
          ? res.data
          : [
              {
                daywaterqty: "",
                dayelecqty: "",
                daygasqty: ""
              }
            ];
    });
  },
  methods: {
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn) {
        let table = pushType(this.tableData, 1);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_dynamiclinesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.daywaterqty,
            ep_attr2: "" + element.dayelecqty,
            ep_attr3: "" + element.daygasqty,
            createdby: creater,
            createdon: createTime
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr20: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime
        });
      }

      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn
              ? "ep_dynamiclinesetting"
              : "ep_sqlsetting",
            type: "1",
            flg: this.switchBtn ? "1" : "0",
            sqlflg: "20"
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

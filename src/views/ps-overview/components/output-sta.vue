<template>
  <div class="container">
    <sp-card title="本年产出统计" style="width: 40rem">
      <span slot="header">
        <el-switch class="switchBtn" v-model="switchBtn"></el-switch>
        <br />
        <div class="btnGroup">
          <el-button
            v-show="switchBtn"
            type="primary"
            size="mini"
            @click="addNewDialog()"
            >新增</el-button
          >
          <el-button type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </span>
      <el-table
        v-if="switchBtn"
        :data="tableData"
        :default-sort="{ prop: 'curmonth', order: 'ascending' }"
      >
        <el-table-column prop="curmonth" label="月份" width="80">
        </el-table-column>
        <el-table-column prop="greqty" label="坯布（万米）" width="120">
        </el-table-column>
        <el-table-column prop="fgqty" label="成品（万米）" width="120">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="tableDialog"
      width="30%"
    >
      <el-form :model="tableTemp" ref="form" :rules="rules">
        <el-form-item label="月份" label-width="120" prop="curmonth">
          <el-select v-model="tableTemp.curmonth" placeholder="请选择月份">
            <el-option
              v-for="(item, index) in monthTemp"
              :key="index"
              :label="item.curmonth"
              :value="item.curmonth"
              :disabled="item.disable"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坯布（万米）" label-width="120" prop="greqty">
          <el-input-number v-model="tableTemp.greqty"></el-input-number>
        </el-form-item>
        <el-form-item label="成品（万米）" label-width="120" prop="fgqty">
          <el-input-number v-model="tableTemp.fgqty"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus == 'update' ? edit('form') : addNew('form')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SpCard from "@/components/sp-card";
import { pushType,replaceSQLString } from "@/utils/fixTableData.js";
export default {
  inject: ["reload"],
  name: "OutputSta",
  components: {
    SpCard
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("数值不能小于0"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      switchBtn: false,
      sqlString: "",
      tableDialog: false,
      tableTemp: {},
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      rules: {
        curmonth: [{ required: true, message: "请输入月份" }],
        greqty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" }
        ],
        fgqty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" }
        ]
      },
      monthTemp: [
        {
          curmonth: 1,
          disable: false
        },
        {
          curmonth: 2,
          disable: false
        },
        {
          curmonth: 3,
          disable: false
        },
        {
          curmonth: 4,
          disable: false
        },
        {
          curmonth: 5,
          disable: false
        },
        {
          curmonth: 6,
          disable: false
        },
        {
          curmonth: 7,
          disable: false
        },
        {
          curmonth: 8,
          disable: false
        },
        {
          curmonth: 9,
          disable: false
        },
        {
          curmonth: 10,
          disable: false
        },
        {
          curmonth: 11,
          disable: false
        },
        {
          curmonth: 12,
          disable: false
        }
      ]
    };
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        this.handleSelect(newVal, this.monthTemp);
      },
      deep: true
    }
  },
  mounted() {
       this.switchBtn = this.$store.state.getInfo.customizedData.yearlyoutput;
    this.sqlString = this.$store.state.getInfo.sqlMess.yearlyoutputsql;
 this.$store.dispatch("psOverview/GetYearlyOutPutData").then(res => {
      this.tableData = res.data ? res.data : [];
    });
  },
  methods: {
    save() {
     let postObj = [];
let creater = this.$store.state.user.userid;
        let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn) {
        let table = pushType(this.tableData, 11);
        
        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_homepagesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.curmonth,
            ep_attr2: "" + element.greqty,
            ep_attr3: "" + element.fgqty,
            createdby: creater,
            createdon: createTime
          };
         postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr14: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime
        });
      }

      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn
              ? "ep_productandsalessetting"
              : "ep_sqlsetting",
            type: "11",
            flg: this.switchBtn ? "1" : "0",
            sqlflg: "14"
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
    },
    resetTemp() {
      this.tableTemp = {};
    },
    handleSelect(val, monthTemp) {
      for (let index = 0; index < val.length; index++) {
        const element = val[index];
        monthTemp[element.curmonth - 1].disable = true;
      }
    },
    handleEdit(index, row) {
      this.resetTemp();
      this.dialogStatus = "update";

      this.tableDialog = true;
      this.tableTemp = Object.assign({}, row);
      this.tableTemp.index = index;
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData[
            this.tableTemp.index
          ].curmonth = this.tableTemp.curmonth;
          this.tableData[this.tableTemp.index].greqty = this.tableTemp.greqty;
          this.tableData[this.tableTemp.index].fgqty = this.tableTemp.fgqty;
          this.tableDialog = false;
        } else {
          return false;
        }
      });
    },
    addNewDialog() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.tableDialog = true;
    },
    addNew(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push(this.tableTemp);
          this.tableDialog = false;
        } else {
          return false;
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

<template>
  <div class="container">
    <sp-card title="设备效率分析">
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
      <el-table v-if="switchBtn" :data="tableData">
        <el-table-column prop="mcnname" label="设备名称" width="120">
        </el-table-column>
        <el-table-column prop="efficienty" label="效率（%）" width="100">
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
        <el-form-item label="设备名称" label-width="120" prop="mcnname">
          <el-input
            v-model="tableTemp.mcnname"
            autocomplete="off"
            style="width: 11.25rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="效率（%）" label-width="120" prop="efficienty">
          <el-input-number v-model="tableTemp.efficienty"></el-input-number>
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
import { pushType, replaceSQLString } from "@/utils/fixTableData.js";
export default {
  inject: ["reload"],
  name: "DeviceEffect",
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
        .dispatch("deviceMonitoring/GetMcnEfficiencyData", {
          workshopid: newVal
        })
        .then(res => {
          this.tableData = res.data;
        });
    }
  },
  data() {
    const validateNumber2 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("效率值应在0到100"));
      } else if (value > 100) {
        callback(new Error("效率值应在0到100"));
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
        mcnname: [
          { required: true, message: "请输入名称" },
          {
            min: 2,
            max: 10,
            message: "名称长度在 2 到 10 个字符"
          }
        ],
        efficienty: [
          { required: true, message: "请输入效率值" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.switchBtn = this.$store.state.getInfo.customizedData.mcnefficiency;
    this.sqlString = this.$store.state.getInfo.sqlMess.mcnefficiencysql;
  },
  methods: {
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn) {
        let table = pushType(this.tableData, 5);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_mcnmonitoringsettingid: "",
            ep_workshop: this.id,
            ep_type: element.type,
            ep_attr1: "" + element.mcnname,
            ep_attr2: "" + element.efficienty,
            createdby: creater,
            createdon: createTime
          };

          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr31: replaceSQLString(this.sqlString),
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
            type: "5",
            flg: this.switchBtn ? "1" : "0",
            sqlflg: "31"
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
          this.tableData[this.tableTemp.index].mcnname = this.tableTemp.mcnname;
          this.tableData[
            this.tableTemp.index
          ].efficienty = this.tableTemp.efficienty;
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

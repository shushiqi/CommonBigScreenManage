<template>
  <div class="container">
    <sp-card title="设备列表">
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
        <el-table-column prop="mcnstatus" label="状态" width="80">
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
        <el-form-item label="状态" label-width="120" prop="mcnstatus">
          <el-select v-model="tableTemp.mcnstatus" placeholder="请选择状态">
            <el-option value="生产中" label="生产中"></el-option>
            <el-option value="报警中" label="报警中"></el-option>
            <el-option value="停机" label="停机"></el-option>
            <el-option value="保养预警" label="保养预警"></el-option>
          </el-select>
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
  name: "DeviceList",
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
        .dispatch("deviceMonitoring/GetMcnListStatusData", {
          workshopid: newVal
        })
        .then(res => {
          if (res.data.length > 0) {
            this.tableData = res.data;
            for (let index = 0; index < this.tableData.length; index++) {
              const element = this.tableData[index];
              switch (element.mcnstatus) {
                case "0":
                  element.mcnstatus = "生产中";
                  break;
                case "1":
                  element.mcnstatus = "报警中";
                  break;
                case "2":
                  element.mcnstatus = "停机";
                  break;
                case "3":
                  element.mcnstatus = "保养预警";
                  break;
                default:
                  break;
              }
            }
          }
        });
    }
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
        mcnname: [
          { required: true, message: "请输入名称" },
          {
            min: 2,
            max: 10,
            message: "名称长度在 2 到 10 个字符"
          }
        ],
        mcnstatus: [{ required: true, message: "请输入状态名" }]
      }
    };
  },
  mounted() {
    this.switchBtn = this.$store.state.getInfo.customizedData.mcnlist;
    this.sqlString = this.$store.state.getInfo.sqlMess.mcnlistsql;
  },
  methods: {
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn) {
        let table = pushType(this.tableData, 4);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_mcnmonitoringsettingid: "",
            ep_workshop: this.id,
            ep_type: element.type,
            ep_attr1: "" + element.mcnname,
            ep_attr2: "" + element.mcnstatus,
            createdby: creater,
            createdon: createTime
          };
          switch (item.ep_attr2) {
            case "生产中":
              item.ep_attr2 = "0";
              break;
            case "报警中":
              item.ep_attr2 = "1";
              break;
            case "停机":
              item.ep_attr2 = "2";
              break;
            case "保养预警":
              item.ep_attr2 = "3";
              break;
            default:
              break;
          }
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr30: replaceSQLString(this.sqlString),
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
            type: "4",
            flg: this.switchBtn ? "1" : "0",
            sqlflg: "30"
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
          ].workshop = this.tableTemp.workshop;
          this.tableData[this.tableTemp.index].warntime = this.moment(
            this.tableTemp.warntime
          ).format("YYYY-MM-DD HH:mm:ss");
          this.tableData[
            this.tableTemp.index
          ].warntype = this.tableTemp.warntype;
          this.tableData[this.tableTemp.index].mcnname = this.tableTemp.mcnname;
          this.tableData[
            this.tableTemp.index
          ].mcnstatus = this.tableTemp.mcnstatus;
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
          this.tableTemp.warntime = this.moment(this.tableTemp.warntime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
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

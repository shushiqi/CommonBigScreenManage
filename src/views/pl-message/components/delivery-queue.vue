<template>
  <div class="container">
    <sp-card title="配送队列">
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
        <el-table-column prop="taskno" label="任务号" width="100">
        </el-table-column>
        <el-table-column
          prop="predictfinishtime"
          label="预计完成时间"
          width="160"
        >
        </el-table-column>
        <el-table-column prop="mcn" label="机台" width="100"> </el-table-column>
        <el-table-column prop="neededqty" label="需求量" width="80">
        </el-table-column>
        <el-table-column prop="curstatus" label="配送状态" width="120">
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
        <el-form-item label="任务号" label-width="120" prop="taskno">
          <el-input
            v-model="tableTemp.taskno"
            autocomplete="off"
            style="width: 11.25rem"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="预计完成时间"
          label-width="120"
          prop="predictfinishtime"
        >
          <el-date-picker
            v-model="tableTemp.predictfinishtime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="机台" label-width="120" prop="mcn">
          <el-input
            v-model="tableTemp.mcn"
            autocomplete="off"
            style="width: 11.25rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求量" label-width="120" prop="neededqty">
          <el-input-number v-model="tableTemp.neededqty"></el-input-number>
        </el-form-item>
        <el-form-item label="配送状态" label-width="120" prop="curstatus">
          <el-input
            v-model="tableTemp.curstatus"
            autocomplete="off"
            style="width: 11.25rem"
          ></el-input>
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
  name: "DeliveryQueue",
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
        taskno: [
          { required: true, message: "请输入任务号" },
          {
            min: 2,
            max: 15,
            message: "任务号长度在 2 到 15 个字符"
          }
        ],
        predictfinishtime: [{ required: true, message: "不能为空" }],
        mcn: [
          { required: true, message: "请输入机台名" },
          {
            min: 2,
            max: 15,
            message: "机台名长度在 2 到 15 个字符"
          }
        ],
        neededqty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" }
        ],
        curstatus: [{ required: true, message: "请输入状态" }]
      }
    };
  },
  mounted() {
    this.switchBtn = this.$store.state.getInfo.customizedData.deliveryqueen;
      this.sqlString = this.$store.state.getInfo.sqlMess.deliveryqueensql;
  this.$store.dispatch("plMessage/GetDeliveryQueenData").then(res => {
      this.tableData = res.data;
    });
  },
  methods: {
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn) {
        let table = pushType(this.tableData, 7);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_homepagesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.taskno,
            ep_attr2: "" + element.predictfinishtime,
            ep_attr3: "" + element.mcn,
            ep_attr4: "" + element.neededqty,
            ep_attr5: "" + element.curstatus,
            createdby: creater,
            createdon: createTime
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr26: replaceSQLString(this.sqlString),
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
            type: "7",
            flg: this.switchBtn ? "1" : "0",
            sqlflg: "26"
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
          console.log(this.tableTemp);
          this.tableData[this.tableTemp.index].taskno = this.tableTemp.taskno;
          this.tableData[this.tableTemp.index].predictfinishtime = this.moment(
            this.tableTemp.predictfinishtime
          ).format("YYYY-MM-DD HH:mm:ss");
          this.tableData[this.tableTemp.index].mcn = this.tableTemp.mcn;
          this.tableData[
            this.tableTemp.index
          ].neededqty = this.tableTemp.neededqty;
          this.tableData[
            this.tableTemp.index
          ].curstatus = this.tableTemp.curstatus;

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
          this.tableTemp.predictfinishtime = this.moment(
            this.tableTemp.predictfinishtime
          ).format("YYYY-MM-DD HH:mm:ss");
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

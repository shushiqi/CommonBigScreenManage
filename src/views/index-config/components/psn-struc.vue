<template>
  <div class="container">
    <sp-card title="人员结构">
      <span class="" slot="header">
        <el-switch class="switchBtn" v-model="switchBtn.psnstruct"></el-switch>
        <br />
        <div class="btnGroup">
          <el-button
            v-show="switchBtn.psnstruct"
            type="primary"
            size="mini"
            @click="addNewPersonDialog()"
            >新增</el-button
          >
          <el-button type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </span>
      <el-table v-if="switchBtn.psnstruct" :data="tableData">
        <el-table-column label="学历" prop="education" width="120">
        </el-table-column>
        <el-table-column prop="qty" label="人数" width="120"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handlePersonEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handlePersonDelete(scope.$index, scope.row)"
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
      :visible.sync="personDialog"
      width="30%"
    >
      <el-form :model="pernsonTemp" ref="personRules" :rules="personRules">
        <el-form-item label="学历" label-width="120" prop="education">
          <el-input
            v-model="pernsonTemp.education"
            autocomplete="off"
            style="width: 11.25rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="人数" label-width="120" prop="qty">
          <!-- <el-input v-model="pernsonTemp.count" autocomplete="off"></el-input> -->
          <el-input-number
            v-model="pernsonTemp.qty"
            :min="1"
            label="人数"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="personDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogStatus == 'update'
              ? personEdit('personRules')
              : addNewPerson('personRules')
          "
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
  name: "PsnStruc",
  components: {
    SpCard
  },
  data() {
    return {
      tableData: [],
      open: false,
      switchBtn: {
        psnstruct: false
      },
      sqlString: "",
      personDialog: false,
      pernsonTemp: {
        education: "",
        qty: 1,
        index: -1
      },
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      personRules: {
        education: [
          { required: true, message: "请输入学历名称" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符" }
        ],
        qty: [
          { required: true, message: "人数不能为空" },
          { type: "number", message: "人数必须为数字值" }
        ]
      }
    };
  },
  mounted() {
    this.switchBtn.psnstruct = this.$store.state.getInfo.customizedData.psnstruct;
    this.sqlString = this.$store.state.getInfo.sqlMess.psnstructsql;
    this.$store.dispatch("indexConfig/GetPsnStructData").then(res => {
      if (res.data.length > 0) {
        this.tableData = res.data;
      }
    });
  },
  methods: {
    handlePersonEdit(index, row) {
      this.resetTemp();
      this.dialogStatus = "update";

      this.personDialog = true;
      this.pernsonTemp = Object.assign({}, row);
      this.pernsonTemp.index = index;
    },
    handlePersonDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    personEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData[
            this.pernsonTemp.index
          ].education = this.pernsonTemp.education;
          this.tableData[this.pernsonTemp.index].qty = this.pernsonTemp.qty;
          this.personDialog = false;
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.pernsonTemp = {
        education: "",
        qty: 1,
        index: -1
      };
    },
    addNewPersonDialog() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.personDialog = true;
    },
    addNewPerson(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push(this.pernsonTemp);
          this.personDialog = false;
        } else {
          return false;
        }
      });
    },
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");

      if (this.switchBtn.psnstruct) {
        let table = pushType(this.tableData, 1);
        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_homepagesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.education,
            ep_attr2: "" + element.qty,
            createdby: creater,
            createdon: createTime
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr1: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime
        });
      }

      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn.psnstruct
              ? "ep_homepagesetting"
              : "ep_sqlsetting",
            type: "1",
            flg: this.switchBtn.psnstruct ? "1" : "0",
            sqlflg: "1"
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

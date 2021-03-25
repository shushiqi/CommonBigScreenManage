<template>
  <div class="container">
    <sp-card title="本年度各地销售详情(世界地图)">
      <span slot="header">
        <el-switch
          class="switchBtn"
          v-model="switchBtn.curyearsalesinworld"
        ></el-switch>
        <br />
        <div class="btnGroup">
          <el-button
            v-show="switchBtn.curyearsalesinworld"
            type="primary"
            size="mini"
            @click="addNewAreaSaleDialog()"
            >新增</el-button
          >
          <el-button type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </span>
      <el-table v-if="switchBtn.curyearsalesinworld" :data="tableData" style="">
        <el-table-column label="地区" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.area }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fabricqty" label="面料(万米)" width="180">
        </el-table-column>
        <el-table-column prop="productsqty" label="制品(万件)" width="180">
        </el-table-column>
        <el-table-column prop="clothingqty" label="服装(万件)" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleAreaSaleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleAreaSaleDelete(scope.$index, scope.row)"
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
      :visible.sync="areaSaleDialog"
      width="30%"
    >
      <el-form
        :model="areaSaleTemp"
        ref="areaSaleForm"
        :rules="rules"
        label-position="right"
      >
        <el-form-item label="地区" label-width="120" prop="area">
          <el-input
            v-model="areaSaleTemp.area"
            style="width: 11.25rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="面料(万米)" label-width="120" prop="fabricqty">
          <el-input-number
            v-model="areaSaleTemp.fabricqty"
            style="width: 11.25rem"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="制品(万米)" label-width="120" prop="productsqty">
          <el-input-number
            v-model="areaSaleTemp.productsqty"
            style="width: 11.25rem"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="服装(万米)" label-width="120" prop="clothingqty">
          <el-input-number
            v-model="areaSaleTemp.clothingqty"
            style="width: 11.25rem"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="areaSaleDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogStatus == 'update'
              ? areaSaleEdit('areaSaleForm')
              : addNewAreaSale('areaSaleForm')
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
  name: "SalesWorld",
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
      switchBtn: {
        curyearsalesinworld: false
      },
      sqlString: "",
      areaSaleDialog: false,
      areaSaleTemp: { area: "", fabricqty: 0, productsqty: 0, clothingqty: 0 },
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      rules: {
        area: [
          { required: true, message: "请输入地区名称" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符" }
        ],
        fabricqty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" }
        ],
        productsqty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" }
        ],
        clothingqty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.switchBtn.curyearsalesinworld = this.$store.state.getInfo.customizedData.curyearsalesinworld;
    this.sqlString = this.$store.state.getInfo.sqlMess.curyearsalesinworldsql;
    this.$store.dispatch("indexConfig/GetCurYearSalesInWorldData").then(res => {
      this.tableData = res.data;
    });
  },
  methods: {
    resetTemp() {
      this.monthSaleTemp = {
        area: "",
        fabricqty: 0,
        productsqty: 0,
        clothingqty: 0,
        index: -1
      };
    },
    addNewAreaSaleDialog() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.areaSaleDialog = true;
    },
    handleAreaSaleEdit(index, row) {
      this.resetTemp();
      this.dialogStatus = "update";
      this.areaSaleDialog = true;
      this.areaSaleTemp = Object.assign({}, row);
      this.areaSaleTemp.index = index;
    },
    handleAreaSaleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    areaSaleEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData[this.areaSaleTemp.index].area = this.areaSaleTemp.area;
          this.tableData[
            this.areaSaleTemp.index
          ].fabricqty = this.areaSaleTemp.fabricqty;
          this.tableData[
            this.areaSaleTemp.index
          ].productsqty = this.areaSaleTemp.productsqty;
          this.tableData[
            this.areaSaleTemp.index
          ].clothingqty = this.areaSaleTemp.clothingqty;

          this.areaSaleDialog = false;
        } else {
          return false;
        }
      });
    },
    addNewAreaSale(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push(this.areaSaleTemp);
          this.areaSaleDialog = false;
        } else {
          return false;
        }
      });
    },
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn.curyearsalesinworld) {
        let table = pushType(this.tableData, 5);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_homepagesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.area,
            ep_attr2: "" + element.fabricqty,
            ep_attr3: "" + element.productsqty,
            ep_attr4: "" + element.clothingqty,
            createdby: creater,
            createdon: createTime
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr5: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime
        });
      }

      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn.curyearsalesinworld
              ? "ep_homepagesetting"
              : "ep_sqlsetting",
            type: "5",
            flg: this.switchBtn.curyearsalesinworld ? "1" : "0",
            sqlflg: "5"
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

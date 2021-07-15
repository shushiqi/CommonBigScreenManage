<template>
  <div class="container">
    <sp-card title="本年销售详情">
      <span slot="header">
        <el-switch
          class="switchBtn"
          v-model="switchBtn.curyearsales"
        ></el-switch>
        <br />
        <div class="btnGroup">
          <el-button
            v-show="switchBtn.curyearsales"
            type="primary"
            size="mini"
            @click="addNewYearSaleDialog()"
            >新增</el-button
          >
          <el-button type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </span>
      <el-table v-if="switchBtn.curyearsales" :data="tableData">
        <el-table-column label="月份" prop="curmonth" width="100" sortable>
        </el-table-column>
        <el-table-column prop="matname" label="物料类型" width="180">
        </el-table-column>
        <el-table-column prop="qty" label="数量(万米)" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleYearSaleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleYearSaleDelete(scope.$index, scope.row)"
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

    <sp-card title="企业年度销售详情" style="margin-top: 1rem">
      <span slot="header">
        <el-switch
          class="switchBtn"
          v-model="switchBtn.enteryearsales"
        ></el-switch>
        <br />
        <div class="btnGroup">
          <el-button
            v-show="switchBtn.enteryearsales"
            type="primary"
            size="mini"
            @click="addNewEnterpriseYearDialog()"
            >新增</el-button
          >
          <el-button type="primary" size="mini" @click="saveEnterYearSales()"
            >保存</el-button
          >
        </div>
      </span>
      <el-table v-if="switchBtn.enteryearsales" :data="tableData2" style="">
        <el-table-column prop="curyear" label="年份" width="100">
        </el-table-column>
        <el-table-column prop="matname" label="物料类型" width="180">
        </el-table-column>
        <el-table-column prop="qty" label="数量(万米)" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEnterpriseYearEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleEnterpriseYearDelete(scope.$index, scope.row)"
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
        v-model="sqlString2"
        maxlength="8000"
      >
      </el-input>
    </sp-card>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="yearSaleDialog"
      width="30%"
    >
      <el-form
        :model="yearSaleTemp"
        ref="yearSaleForm"
        :rules="rules"
        label-position="right"
      >
        <el-form-item label="月份" label-width="120" prop="curmonth">
          <el-select v-model="yearSaleTemp.curmonth" placeholder="请选择月份">
            <el-option
              v-for="(item, index) in tableDataMonthTemp"
              :key="index"
              :label="item.curmonth"
              :value="item.curmonth"
              :disabled="item.disable"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料类型" label-width="120" prop="matname">
          <el-select
            v-model="yearSaleTemp.matname"
            placeholder="请选择物料类型"
          >
            <el-option
              v-for="(item, index) in mattype"
              :key="index"
              :label="item.txt"
              :value="item.txt"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量(万米)" label-width="120" prop="qty">
          <el-input-number
            v-model="yearSaleTemp.qty"
            style="width: 11.25rem"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="yearSaleDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogStatus == 'update'
              ? yearSaleEdit('yearSaleForm')
              : addNewYearSale('yearSaleForm')
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="enterpriseYearDialog"
      width="30%"
    >
      <el-form
        :model="enterpriseYearTemp"
        ref="enterpriseYearForm"
        :rules="enterpriseYearRules"
        label-position="right"
      >
        <el-form-item label="年度" label-width="120" prop="curyear">
          <!-- <el-input
            v-model="enterpriseYearTemp.curyear"
            style="width: 11.25rem"
          ></el-input> -->
          <el-date-picker
            v-model="enterpriseYearTemp.curyear"
            type="year"
            placeholder="选择年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="物料类型" label-width="120" prop="matname">
          <el-select
            v-model="enterpriseYearTemp.matname"
            placeholder="请选择物料类型"
          >
            <el-option
              v-for="(item, index) in mattype"
              :key="index"
              :label="item.txt"
              :value="item.txt"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量(万米)" label-width="120" prop="qty">
          <el-input-number
            v-model="enterpriseYearTemp.qty"
            style="width: 11.25rem"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="enterpriseYearDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogStatus == 'update'
              ? enterpriseYearEdit('enterpriseYearForm')
              : addNewEnterpriseYear('enterpriseYearForm')
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
  name: "YearSale",
  components: {
    SpCard,
  },
  // watch: {
  //   tableData: {
  //     handler(val) {
  //       // for (let index = 0; index < val.length; index++) {
  //       //   const element = val[index];
  //       //   this.tableDataMonthTemp[element.curmonth - 1].disable = true;
  //       // }
  //       if (val.length > 0) {
  //         let curyear = this.moment().format("YYYY");
  //         let matSet = new Set();

  //         for (let index = 0; index < this.tableData.length; index++) {
  //           const element = this.tableData[index];
  //           matSet.add(element.matname);
  //         }
  //         console.log(matSet);
  //         matSet.forEach((value, key) => {
  //           console.log(value, key);
  //           let count = 0;
  //           for (let index = 0; index < this.tableData.length; index++) {
  //             const element = this.tableData[index];
  //             if (element.matname == value) {
  //               count += element.qty;
  //             }
  //           }

  //           let matIndex = this.tableData2.findIndex(
  //             (item) => item.curyear == curyear && item.matname == value
  //           );
  //           if (matIndex > -1) {
  //             this.tableData2[matIndex].qty = count;
  //           } else {
  //             this.tableData2.push({
  //               curyear,
  //               matname: value,
  //               qty: count,
  //             });
  //           }
  //         });
  //       }
  //     },
  //     deep: true,
  //   },
  // },
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
      tableData2: [],
      switchBtn: {
        curyearsales: false,
        enteryearsales: false,
      },
      sqlString: "",
      sqlString2: "",
      yearSaleDialog: false,
      yearSaleTemp: {
        curmonth: 1,
        matname: "坯布",
        qty: 0,
      },
      tableDataMonthTemp: [
        {
          curmonth: 1,
          disable: false,
        },
        {
          curmonth: 2,
          disable: false,
        },
        {
          curmonth: 3,
          disable: false,
        },
        {
          curmonth: 4,
          disable: false,
        },
        {
          curmonth: 5,
          disable: false,
        },
        {
          curmonth: 6,
          disable: false,
        },
        {
          curmonth: 7,
          disable: false,
        },
        {
          curmonth: 8,
          disable: false,
        },
        {
          curmonth: 9,
          disable: false,
        },
        {
          curmonth: 10,
          disable: false,
        },
        {
          curmonth: 11,
          disable: false,
        },
        {
          curmonth: 12,
          disable: false,
        },
      ],
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增",
      },
      rules: {
        curmonth: [{ required: true, message: "请输入月份" }],
        matname: [{ required: true, message: "不能为空" }],
        qty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" },
        ],
      },
      enterpriseYearDialog: false,
      enterpriseYearTemp: {
        curyear: "2021",
        matname: "",
        qty: 0,
      },
      enterpriseYearRules: {
        curyear: [{ required: true, message: "请输入年份" }],
        matname: [{ required: true, message: "不能为空" }],
        qty: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" },
          { validator: validateNumber, trigger: "blur" },
        ],
      },
      mattype: [],
    };
  },
  mounted() {
    this.switchBtn.curyearsales = this.$store.state.getInfo.customizedData.curyearsales;
    this.switchBtn.enteryearsales = this.$store.state.getInfo.customizedData.salesyearly;
    this.sqlString = this.$store.state.getInfo.sqlMess.curyearsalessql;
    this.sqlString2 = this.$store.state.getInfo.sqlMess.salesyearlysql;
    // this.mattype = this.$store.state.indexConfig.mattypes;
    this.$store.dispatch("indexConfig/GetMatType").then((res) => {
      this.mattype = res.data;
      this.$store.dispatch("indexConfig/GetCurYearSalesData").then((res) => {
        this.tableData = res.data.map((item) => {
          for (let index = 0; index < this.mattype.length; index++) {
            const element = this.mattype[index];
            item.matname = "";
            if (element.sht == item.mattype) {
              item.matname = element.txt;
              return item;
            }
            if (
              index == this.mattype.length - 1 &&
              element.sht != item.mattype
            ) {
              return item;
            }
          }
        });
      });
      this.$store.dispatch("indexConfig/GetSalesYearlyData").then((res) => {
        this.tableData2 = res.data.map((item) => {
          for (let index = 0; index < this.mattype.length; index++) {
            const element = this.mattype[index];
            item.matname = "";
            if (element.sht == item.mattype) {
              item.matname = element.txt;
              return item;
            }
            if (
              index == this.mattype.length - 1 &&
              element.sht != item.mattype
            ) {
              return item;
            }
          }
        });
      });
    });
  },
  methods: {
    resetTemp() {
      this.yearSaleTemp = {
        curmonth: "1",
        matname: "坯布",
        qty: 0,
      };
      this.enterpriseYearTemp = {
        curyear: "2021",
        matname: "坯布",
        qty: 0,
      };
    },
    addNewYearSaleDialog() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.yearSaleDialog = true;
    },
    handleYearSaleEdit(index, row) {
      this.resetTemp();
      this.dialogStatus = "update";
      this.yearSaleDialog = true;
      this.yearSaleTemp = Object.assign({}, row);
      this.yearSaleTemp.index = index;
    },
    handleYearSaleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    yearSaleEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData[
            this.yearSaleTemp.index
          ].curmonth = this.yearSaleTemp.curmonth;
          this.tableData[
            this.yearSaleTemp.index
          ].matname = this.yearSaleTemp.matname;
          this.tableData[this.yearSaleTemp.index].qty = this.yearSaleTemp.qty;

          this.yearSaleDialog = false;
        } else {
          return false;
        }
      });
    },
    addNewYearSale(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let monthIndex = this.tableData.filter((value) => {
            return value.curmonth == this.yearSaleTemp.curmonth;
          });

          let matIndex = monthIndex.filter((value) => {
            return value.matname == this.yearSaleTemp.matname;
          });

          if (matIndex.length > 0) {
            this.$message({
              message: "该月份已存在相同物料类型，请勿重复添加",
              type: "error",
            });
            return;
          }
          this.tableData.push(this.yearSaleTemp);
          this.yearSaleDialog = false;
        } else {
          return false;
        }
      });
    },
    // 将物料类型转换为对应的编号
    changeMatTypes(matname) {
      for (let index = 0; index < this.mattype.length; index++) {
        const element = this.mattype[index];
        if (element.txt == matname) {
          return element.sht;
        }
        if (index == this.mattype.length - 1 && element.txt != matname) {
          return "";
        }
      }
    },
    save() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn.curyearsales) {
        let table = pushType(this.tableData, 3);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_homepagesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.curmonth,
            ep_attr2: this.changeMatTypes(element.matname),
            ep_attr3: "" + element.qty,
            createdby: creater,
            createdon: createTime,
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr4: replaceSQLString(this.sqlString),
          createdby: creater,
          createdon: createTime,
        });
      }

      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn.curyearsales
              ? "ep_homepagesetting"
              : "ep_sqlsetting",
            type: "3",
            flg: this.switchBtn.curyearsales ? "1" : "0",
            sqlflg: "4",
          },
        })
        .then((res) => {
          if (res.data > 0) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.reload();
          } else {
            this.$message({
              message: "保存失败",
              type: "error",
            });
          }
        });
    },
    addNewEnterpriseYearDialog() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.enterpriseYearDialog = true;
    },
    handleEnterpriseYearEdit(index, row) {
      this.resetTemp();
      this.dialogStatus = "update";
      this.enterpriseYearDialog = true;
      this.enterpriseYearTemp = Object.assign({}, row);
      this.enterpriseYearTemp.index = index;
    },
    enterpriseYearEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let index = this.enterpriseYearTemp.index;

          this.tableData2[index].curyear = this.enterpriseYearTemp.curyear;
          this.tableData2[index].matname = this.enterpriseYearTemp.matname;
          this.tableData2[index].qty = this.enterpriseYearTemp.qty;

          this.enterpriseYearDialog = false;
        } else {
          return false;
        }
      });
    },
    handleEnterpriseYearDelete(index, row) {
      console.log(index, row, this.tableData2);
      this.tableData2.splice(index, 1);
    },
    addNewEnterpriseYear(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let index = this.tableData2.findIndex(
          //   (value) => value.curyear == this.enterpriseYearTemp.curyear
          // );
          // let mattypeIndex = this.tableData2.findIndex(
          //   (value) => value.matname == this.enterpriseYearTemp.matname
          // );
          this.enterpriseYearTemp.curyear = this.moment(
            this.enterpriseYearTemp.curyear
          ).format("YYYY");
          let yearIndex = this.tableData2.filter((value) => {
            return value.curyear == this.enterpriseYearTemp.curyear;
          });

          let mattypeIndex = yearIndex.filter((value) => {
            return value.matname == this.enterpriseYearTemp.matname;
          });

          if (mattypeIndex.length > 0) {
            this.$message({
              message: "该年份已存在相同物料类型，请勿重复添加",
              type: "error",
            });
            return;
          }

          this.tableData2.push(this.enterpriseYearTemp);
          this.enterpriseYearDialog = false;
        } else {
          return false;
        }
      });
    },
    saveEnterYearSales() {
      let postObj = [];
      let creater = this.$store.state.user.userid;
      let createTime = this.moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.switchBtn.enteryearsales) {
        let table = pushType(this.tableData2, 4);

        for (let index = 0; index < table.length; index++) {
          const element = table[index];
          let item = {
            ep_homepagesettingid: "",
            ep_type: element.type,
            ep_attr1: "" + element.curyear,
            ep_attr2: this.changeMatTypes(element.matname),
            ep_attr3: "" + element.qty,
            createdby: creater,
            createdon: createTime,
          };
          postObj.push(item);
        }
      } else {
        postObj.push({
          ep_sqlsettingid: "",
          ep_attr2: replaceSQLString(this.sqlString2),
          createdby: creater,
          createdon: createTime,
        });
      }
      this.$store
        .dispatch("setInfo/SaveTableMess", {
          data: postObj,
          param: {
            tablename: this.switchBtn.enteryearsales
              ? "ep_homepagesetting"
              : "ep_sqlsetting",
            type: "4",
            flg: this.switchBtn.enteryearsales ? "1" : "0",
            sqlflg: "2",
          },
        })
        .then((res) => {
          if (res.data > 0) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.reload();
          } else {
            this.$message({
              message: "保存失败",
              type: "error",
            });
          }
        });
    },
  },
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

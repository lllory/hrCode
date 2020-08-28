<template>
  <el-dialog
    :append-to-body="true"
    :title="dataForm.id == undefined || dataForm.id == '' || typeof(dataForm.id) == 'undefined' ? '新增' :'修改'"
    :close-on-click-modal="false"
    @open="flag = false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="110px"
    >
      <el-form-item label="员工姓名" prop="staffName">
        <el-input v-model="dataForm.staffName" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="员工编号" prop="staffNo">
        <el-input v-model="dataForm.staffNo" placeholder="员工编号" :disabled="typeof(dataForm.id) !=='undefined'"></el-input>
      </el-form-item>

      <el-form-item label="部门名称" prop="staffDepartment">
        <el-select v-model="dataForm.staffDepartment" placeholder="请选择">
          <el-option
            v-for="item in collectingBusiness"
            :key="item.id"
            :label="item.depName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参保地" prop="placeOfTaxation">
        <el-input v-model="dataForm.placeOfTaxation" placeholder="参保地"></el-input>
      </el-form-item>
      <el-form-item label="工资" prop="salary">
        <el-input v-model="dataForm.salary" placeholder="工资"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="dataForm.idCard" placeholder="身份证号"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="!flag" @click="dataFormSubmit()" type="primary">确定</el-button>
      <el-button v-else disabled>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cardId } from "../../../../utils/validate";
export default {
  data() {
      const cardIdReg = (rule, value, callback) => {
        if (!cardId(value)) {
          return callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      }
    return {
      showSelect: false,
      visible: false,
      flag: false,
      collectingBusiness: [],
      dataForm: {
        staffName: "",
        staffNo: "",
        staffDepartment: "",
        placeOfTaxation: "",
        salary: "",
        idCard: ""
      },

      dataRule: {
        staffName: [
          {
            required: true,
            message: "员工姓名不能为空",
            trigger: "blur"
          }
        ],
        staffNo: [
          {
            required: true,
            message: "员工编号不能为空",
            trigger: "blur"
          }
        ],
        staffDepartment: [
          {
            required: true,
            message: "部门不能为空",
            trigger: ["blur",'change']
          }
        ],
        placeOfTaxation: [
          {
            required: true,
            message: "参保地不能为空",
            trigger: "blur"
          }
        ],
        salary: [
          {
            required: true,
            message: "工资不能为空",
            trigger: "blur"
          },
           {
            validator:this.isNum,
            trigger:["blur", "change"]
          }
        ],
        idCard: [
          {
            required: true,
            message: "身份证不能为空",
            trigger: "blur"
          },
          {
            validator:cardIdReg,
            trigger:["blur", "change"]
          }
        ]
      }
    };
  },
  created(){
    this.attendanceName();
  },
  mounted() {
    this.attendanceName();
  },
  methods: {
    init(item) {
      this.visible = true;
      this.$nextTick(()=>{
      this.$refs["dataForm"].resetFields();
      if (item !== "" && item !== undefined) {
              let dataList = []
              dataList.push(item)
              dataList.map((item,index)=>item.id = index + 1)
              this.dataForm = dataList[0];
            } else {
              this.dataForm = {
                staffName: "",
                staffNo: "",
                staffDepartment: "",
                placeOfTaxation: "",
                salary: "",
                idCard: "",
              };
            }
      })
      
      
    },
    //枚举汉字转换为key值
    getKey(array, text){
      console.log(array,text)
      let depKey = "";
      if (array && array.length > 0) {
        array.forEach(item => {
          if (item.depName == text) {
            return (depKey = item.id);
          } 
        });
      } else {
        return (depKey = "");
      }
      return depKey;
    },
    //枚举转换
    getValue(array, text) {
      let depValue = "";
      if (array && array.length > 0) {
        array.forEach(item => {
          if (item.depName == text) {
            return (depValue = item.id);
          } else if (item.id == text) {
            return (depValue = this.dataForm.staffDepartment);
          }
        });
      } else {
        return (depValue = "");
      }
      return depValue;
    },
    attendanceName() {
      this.$http({
        url: this.$http.adornUrl(`/department/getlist`),
        method: "post",
        data: this.$http.adornParams()
      }).then(({ data }) => {
        if (data.code == 0) {
          this.collectingBusiness = data.list;
        } else {
          this.collectingBusiness = [];
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.dataForm.staffDepartment = this.getValue(
        this.collectingBusiness,
        this.dataForm.staffDepartment
      )
        ? this.getValue(this.collectingBusiness, this.dataForm.staffDepartment)
        : "";
      this.flag = true;
      this.$refs["dataForm"].validate(valid => {
        if (valid == false) {
          this.$message.error("请完整正确填写信息");
        }
        if (valid) {
          // let d1 = new Date(this.dataForm.registerDate.getTime())
          // let time = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d1.getHours() +
          //   ':' + d1.getMinutes() + ':' + d1.getSeconds()
          this.$http({
            url: this.$http.adornUrl(
              `/stafflist/${
                !this.dataForm.id ? "addStaff" : "updateStaff"
              }`
            ),
            method: "post",
            data: this.dataForm
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  // this.$emit("refreshDataList");
                  this.$emit('emitDataSelectionsList')
                }
              });
            } else {
              this.flag = false;
              this.$message.error(data.msg);
            }
          });
        } else {
          this.flag = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  height: 35vh;
  overflow: hidden;
}

.el-form-item {
  float: left;
}

.el-form-item__content,
.el-form-item {
  width: 48%;
}

.el-select,
.el-autocomplete,
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

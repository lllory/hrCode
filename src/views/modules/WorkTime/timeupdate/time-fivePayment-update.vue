<template>
  <el-dialog
    :append-to-body="true"
    title="修改"
    :close-on-click-modal="false"
    @open="flag = false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="140px"
    >
      <el-form-item label="养老保险个人" prop="endowmentInsurancePer">
        <el-input v-model="dataForm.endowmentInsurancePer" placeholder="养老保险个人" ></el-input>
      </el-form-item>
      <el-form-item label="养老保险单位" prop="endowmentInsuranceCom">
        <el-input v-model="dataForm.endowmentInsuranceCom" placeholder="养老保险单位" ></el-input>
      </el-form-item>
      <el-form-item label="失业保险个人" prop="unemploymentInsurancePer">
        <el-input v-model="dataForm.unemploymentInsurancePer" placeholder="失业保险个人" ></el-input>
      </el-form-item>
      <el-form-item label="失业保险单位" prop="unemploymentInsuranceCom">
        <el-input v-model="dataForm.unemploymentInsuranceCom" placeholder="失业保险单位" ></el-input>
      </el-form-item>
      <el-form-item label="工伤保险" prop="industrialInsurance">
        <el-input v-model="dataForm.industrialInsurance" placeholder="工伤保险" ></el-input>
      </el-form-item>
      <el-form-item label="医疗保险个人" prop="medicalInsurancePer">
        <el-input v-model="dataForm.medicalInsurancePer" placeholder="医疗保险个人" ></el-input>
      </el-form-item>
      <el-form-item label="医疗保险单位" prop="medicalInsuranceCom">
        <el-input v-model="dataForm.medicalInsuranceCom" placeholder="医疗保险单位" ></el-input>
      </el-form-item>

      <el-form-item label="大病个人" prop="sicknessInsurancePer">
        <el-input v-model="dataForm.sicknessInsurancePer" placeholder="大病个人" ></el-input>
      </el-form-item>
      <el-form-item label="大病单位" prop="sicknessInsuranceCom">
        <el-input v-model="dataForm.sicknessInsuranceCom" placeholder="大病单位" ></el-input>
      </el-form-item>
      <el-form-item label="生育险" prop="maternityInsurance">
        <el-input v-model="dataForm.maternityInsurance" placeholder="生育险" ></el-input>
      </el-form-item>
      <el-form-item label="公积金个人" prop="housingFundPer">
        <el-input v-model="dataForm.housingFundPer" placeholder="公积金个人" ></el-input>
      </el-form-item>
      <el-form-item label="公积金单位" prop="housingFundCom">
        <el-input v-model="dataForm.housingFundCom" placeholder="公积金单位" ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width:96%">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
export default {
  data() {
    return {
      showSelect: false,
      visible: false,
      flag: false,
      collectingBusiness: [],
      dataForm: {
        id:"",
        city:"",
        endowmentInsurancePer:"",//养老个人
        endowmentInsuranceCom:"",//单位
        unemploymentInsurancePer:"",//失业个人
        unemploymentInsuranceCom:"",//单位
        industrialInsurance:"",//工伤保险
        medicalInsurancePer:"",//医疗个人
        medicalInsuranceCom:"",//单位
        sicknessInsurancePer:"",//大病个人
        sicknessInsuranceCom:"",//单位
        maternityInsurance:"",//生育险
        housingFundPer:"",//公积金个人
        housingFundCom:"",//单位
        remark:"",//备注
      },

      dataRule: {
        endowmentInsurancePer: [
          {
            required: true,
            message: "养老保险个人不能为空",
            trigger: "blur"
          }
        ],
        endowmentInsuranceCom: [
          {
            required: true,
            message: "养老保险单位不能为空",
            trigger: "blur"
          }
        ],
        unemploymentInsurancePer: [
          {
            required: true,
            message: "失业保险个人不能为空",
            trigger: "blur"
          }
        ],
        unemploymentInsuranceCom: [
          {
            required: true,
            message: "失业保险单位不能为空",
            trigger: "blur"
          }
        ],
        industrialInsurance: [
          {
            required: true,
            message: "工伤保险不能为空",
            trigger: "blur"
          }
        ],
        medicalInsurancePer: [
          {
            required: true,
            message: "医疗保险个人不能为空",
            trigger: "blur"
          }
        ],
        medicalInsuranceCom: [
          {
            required: true,
            message: "医疗保险单位不能为空",
            trigger: "blur"
          }
        ],
        sicknessInsurancePer: [
          {
            required: true,
            message: "大病保险个人不能为空",
            trigger: "blur"
          }
        ],
        sicknessInsuranceCom: [
          {
            required: true,
            message: "大病保险单位不能为空",
            trigger: "blur"
          }
        ],
        maternityInsurance: [
          {
            required: true,
            message: "生育保险不能为空",
            trigger: "blur"
          }
        ],
        housingFundCom: [
          {
            required: true,
            message: "公积金单位不能为空",
            trigger: "blur"
          }
        ],
        housingFundPer: [
          {
            required: true,
            message: "公积金个人不能为空",
            trigger: "blur"
          }
        ],
        
        
      },
    };
  },
  mounted() {
  },
  methods: {
    init(item) {
      if(item !== '' && item !== undefined) this.dataForm = item
        this.visible = true
         
    },
    // 表单提交
    dataFormSubmit() {
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
            url: this.$http.adornUrl(`/worktime/updatePaymentProportion`),
            method: "post",
            data: this.dataForm
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '修改成功',
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
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
    },
  }
};
</script>

<style scoped>
.el-form {
  height: 55vh;
  overflow: hidden;
  overflow-y: auto;
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

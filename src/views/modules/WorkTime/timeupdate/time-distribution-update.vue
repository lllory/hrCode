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
      label-width="110px"
    >
      <el-form-item label="员工姓名" prop="model">
        <el-input v-model="dataForm.model" placeholder="员工姓名" ></el-input>
      </el-form-item>
      <el-form-item label="员工编号" prop="model">
        <el-input v-model="dataForm.model" placeholder="员工编号" ></el-input>
      </el-form-item>

      <el-form-item label="部门" prop="department">
        <el-select v-model="dataForm.department" placeholder="请选择">
          <el-option
            v-for="item in collectingBusiness"
            :key="item.depCode"
            :label="item.depName"
            :value="item.depCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成本中心代码" prop="model">
        <el-input v-model="dataForm.model" placeholder="成本中心代码" ></el-input>
      </el-form-item>
      <el-form-item label="项目代码" prop="model">
        <el-input v-model="dataForm.model" placeholder="项目代码" ></el-input>
      </el-form-item>
      <el-form-item label="月工时" prop="model">
        <el-input v-model="dataForm.model" placeholder="月工时" ></el-input>
      </el-form-item>
      <el-form-item label="项目工时" prop="latitude">
        <el-input v-model="dataForm.latitude" placeholder="项目工时" ></el-input>
      </el-form-item>
      <el-form-item label="纳税地" prop="model">
        <el-input v-model="dataForm.model" placeholder="纳税地" ></el-input>
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
        
      },

      dataRule: {
        terminalName: [
          {
            required: true,
            message: "终端名称不能为空",
            trigger: "blur"
          }
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    init() {
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
            url: this.$http.adornUrl(
              `/terminal/tsinfo/${
                !this.dataForm.terminalId ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
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

<template>
<el-dialog :append-to-body="true" title="文件上传" :close-on-click-modal="false" @open="flag = false" @close='close'
:visible.sync="visible" id="dialog_wrap" v-loading="addTaskState">
<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px" class="fileUpdate ">
<div>
<el-form-item label="上传打卡文件" prop="fileName1">
<!-- <span class="btn btn-success fileinput-button"> -->
<span class="btn btn-success ">
<el-input type='text' class="text_Class" v-model="dataForm.fileName1" ref='fileName1'
placeholder="未选择任何文件" readonly></el-input>
</span>
<el-input type='file' class="fileClass" id="fileClass" @change="changeFile1()" name='file' 
v-if='clearFile1'  accept=".xls,.xlsx,.txt"></el-input>
<span class="btn-Class">选择</span>
</el-form-item>
</div>
<div>
<el-form-item label="上传明细文件" prop="fileName2">
<!-- <span class="btn btn-success fileinput-button"> -->
<span class="btn btn-success ">
<el-input type='text' class="text_Class" v-model="dataForm.fileName2" ref='fileName2'
placeholder="未选择任何文件" readonly></el-input>
</span>
<el-input type='file' class="fileClass1" id="fileClass1" @change="changeFile2()" name='file' accept=".xls,.xlsx,.txt"
v-if='clearFile2'></el-input>
<span class="btn-Class btn-Class1">选择</span>
</el-form-item>
</div>

</el-form>
<span slot="footer" class="dialog-footer" style="text-align: center;">
<el-button @click="visible = false">取消</el-button>
<el-button type="primary" @click="dataFormSubmit()" :disabled="showDis">导入</el-button>
</span>
</el-dialog>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      flag: false,
      cannot: false,
      showDis:false,
      active: 1,
      formData: new FormData(),
      dataForm: {
        fileName1:"",
        fileName2:""
      },
      custId: "",
      clearFile1: true,
      clearFile2:true,
      addTaskState: false,
      file1:"",
      file2:'',
      time:"",
      newdate:"",
      dataRule: {
        fileName1: [{
          required: true,
          message: "打卡表不能为空",
          trigger: ['change','blur']
        }],
        fileName2: [{
          required: true,
          message: "明细表不能为空",
          trigger:  ['change','blur']
        }],
        
      },
    };
  },
  mounted(){
   const time = new Date(new Date().getTime());
   this.newdate = time.getFullYear() + "-" + ((time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (
    time.getMonth() + 1)) + "-" + (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate())
 },
 methods: {
  init(time) {
    this.visible = true;
    this.clearFile1 = true
    this.clearFile2 = true
    this.time = time
    this.$nextTick(() => {
      this.$refs["dataForm"].resetFields();
    });
  },
  changeFile1(e) {
    var fileId = document.getElementById("fileClass")
    let self = this;
    if (fileId.files[0].size <= 50 * 1024 * 1024) {
      this.file1 = fileId.files[0];
      if (
        fileId.files[0].name.substring(this.file1.name.length - 3) == "xlsx" || fileId.files[0].name.substring(this.file1.name.length - 3) == "xls" || fileId.files[0].name.substring(this.file1.name.length - 3) == "lsx" || fileId.files[0].name.substring(this.file1.name.length - 3) == "txt"
        ) {
        this.dataForm.fileName1 = fileId.files[0].name;
    } else {
      this.$message.error("请选择后缀名为.xlsx或者.xls,.txt的文件");
      this.dataForm.fileName1 = "";
    }
  } else {
    this.$message.error("不能大于50M");
  }
},
changeFile2(e) {
  var fileId = document.getElementById("fileClass1")
  let self = this;
  if (fileId.files[0].size <= 50 * 1024 * 1024) {
    this.file2 = fileId.files[0];
    if (
      fileId.files[0].name.substring(this.file2.name.length - 3) == "xlsx" || fileId.files[0].name.substring(this.file2.name.length - 3) == "xls" || fileId.files[0].name.substring(this.file2.name.length - 3) == "lsx"|| fileId.files[0].name.substring(this.file2.name.length - 3) == "txt"
      ) {
      this.dataForm.fileName2 = fileId.files[0].name;
  } else {
    this.$message.error("请选择后缀名为.xlsx或者.xls,.txt的文件");
    this.dataForm.fileName2 = "";
  }
} else {
  this.$message.error("不能大于50M");
}
},
close() {
  this.clearFile1 = false
  this.clearFile2 = false
  this.formData = new FormData();
},
    // 表单提交
    dataFormSubmit() {
      var vm = this
        // let CancelToken = axios.CancelToken
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            this.formData.append("yearmonth", this.time ? this.time : '');
            this.formData.append("file1", this.file1);
            this.formData.append("file2", this.file2);
            this.$http({
              url: this.$http.adornUrl(`/file/import`),
              method: "post",
              headers: {
                "Content-Type": "multipart/form-data"
              },
              data: this.formData,
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
               this.$message({
                 message: "操作成功",
                 type: "success",
                 duration: 1500,
                 onClose: () => {
                   this.visible = false;
                   this.clearFile1 = false;
                   this.clearFile2 = false;
                 }
               });
             } else if(data && data.code === 1){
               this.formData = new FormData();
               this.$message.error(data.msg);
               this.clearFile1 = true;
               this.clearFile2 = true;
             }else{
               this.formData = new FormData();
               this.$message.error(data.msg);
               this.visible = false;
               this.clearFile1 = true;
               this.clearFile2 = true;
             }
              // else{
              //   this.$message({
              //    message: "操作取消",
              //    type: "warning",
              //    duration: 1500,
              //    onClose: () => {
              //      this.visible = false;
              //      this.visible1 = false
              //      this.$emit("refreshDataList");
              //      this.showDis = false;
              //      this.clearFile = false;
              //    }
              //  });
              // }

            });
          }
        });
      }
      
    },
    destroyed() {
     
    }
  };
  </script>

  <style>
  #dialog_wrap .el-dialog {
    width: 560px;
    height: 40vh;
    margin-top: 7vh !important;
  }
  /* #dialog_wrap .el-dialog__header {
    padding: 0px 20px 10px;
  } */
  #dialog_wrap .el-dialog__body{
    padding: 20px 20px 10px;
  }
  #dialog_wrap .el-dialog__footer{
    text-align: center !important;
  }
  /* #dialog_wrap .form-Bottom {
    height: 610px;
  } */
  #dialog_wrap .dialog-footer button {
    padding: 10px 20px !important;
  }
  #dialog_wrap .el-dialog__header {
    border-bottom: 2px solid #e8e8e8;
  }
  #dialog_wrap .el-step__head.is-success,
  #dialog_wrap .el-step__title.is-success {
    color: #1890ff;
    border-color: #1890ff;
  }
  .backColor {
    color: #1890ff;
    background: #e6f7ff;
  }
  /* .fileUpdate .fileinput-button {
    position: relative;
    display: block;
    overflow: hidden;
  } */
  .fileUpdate {
    position: relative;
    display: block;
    overflow: hidden;
    padding: 0 5%;
  }
  .fileUpdate .fileClass , .fileUpdate .fileClass1 {
    width: 11%;
    position: absolute !important;
    right: 15px;
    top: 0px;
    border: 0;
    opacity: 0;
    -ms-filter: "alpha(opacity=0)";
    z-index: 100;
  }
  .fileUpdate .fileClass1 {
    /* top: 59px; */
  }
  .fileUpdate .text_Class input {
    text-indent: 0em;
    width: 80% !important;
  }

  .fileUpdate #fileClass ,.fileUpdate #fileClass1 {
    width: 100%;
    border: 0;
    font-size: 16px;
    color: aqua;
  }

  .fileUpdate .btn-Class , .fileUpdate .btn-Class1 {
    display: block;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    border: 1px solid rgba(192, 196, 204, 1);
    position: absolute;
    top: 0px;
    right: 15px;
  }
  .fileUpdate .btn-Class1{
    /* top: 59px; */
  }
  </style>
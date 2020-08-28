<template>
  <div>
    <div class="tableDiv" >
     <table border="1"  width = 100%>
       <thead>
         <tr >
           <th v-for='(item,index) in tableHeader' :key="item.index" :style="{width:index==0 ? '15%' :''}">{{item.label}}</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th ><div>缴费单位个数</div> </th>
           <th>1</th>
           <th>{{tabledata.endowmentInsurancenum}}</th>
           <th>{{tabledata.unemploymentInsurancenum}}</th>
           <th>{{tabledata.industrialInsurancenum}}</th>
           <th>{{tabledata.maternityInsurancenum}}</th>
           <th>{{tabledata.medicalInsurancenum}}</th>
           <th>{{tabledata.sicknessInsurancenum}}</th>
           <th>{{tabledata.collectnum}}</th>
         </tr>
         <tr>
           <th> <div class="right_oneTh">本月合计</div>
            <div class="left_F" >
              <span class="left_F_Span" >缴</span>
              <span class="left_F_Span" >费</span>
              <span class="left_F_Span" >人</span>
              <span class="left_F_Span" >数</span>
            </div> </th>
            <th>2</th>
            <th>{{tabledata.endowmentInsurancenow}}</th>
            <th>{{tabledata.unemploymentInsurancenow}}</th>
            <th>{{tabledata.industrialInsurancenow}}</th>
            <th>{{tabledata.maternityInsurancenow}}</th>
            <th>{{tabledata.medicalInsurancenow}}</th>
            <th>{{tabledata.sicknessInsurancenow}}</th>
            <th>{{tabledata.collectnow}}</th>
            
         </tr>
          <tr>
           <th><div class="right_oneTh">上月人数</div> </th>
            <th>3</th>
            <th>{{tabledata.endowmentInsurancelast}}</th>
            <th>{{tabledata.unemploymentInsurancelast}}</th>
            <th>{{tabledata.industrialInsurancelast}}</th>
            <th>{{tabledata.maternityInsurancelast}}</th>
            <th>{{tabledata.medicalInsurancelast}}</th>
            <th>{{tabledata.sicknessInsurancelast}}</th>
            <th>{{tabledata.collectlast}}</th>
         </tr>
          <tr>
           <th><div class="right_oneTh">本月增加</div> </th>
            <th>4</th>
            <th>{{tabledata.endowmentInsuranceadd}}</th>
            <th>{{tabledata.unemploymentInsuranceadd}}</th>
            <th>{{tabledata.industrialInsuranceadd}}</th>
            <th>{{tabledata.maternityInsuranceadd}}</th>
            <th>{{tabledata.medicalInsuranceadd}}</th>
            <th>{{tabledata.sicknessInsuranceadd}}</th>
            <th>{{tabledata.collectadd}}</th>
         </tr>
           <tr>
           <th><div class="right_oneTh">本月减少</div> </th>
            <th>5</th>
            <th>{{tabledata.endowmentInsurancered}}</th>
            <th>{{tabledata.unemploymentInsurancered}}</th>
            <th>{{tabledata.industrialInsurancered}}</th>
            <th>{{tabledata.maternityInsurancered}}</th>
            <th>{{tabledata.medicalInsurancered}}</th>
            <th>{{tabledata.sicknessInsurancered}}</th>
            <th>{{tabledata.collectred}}</th>
         </tr>
          <tr>
           <th>缴费基数合计</th>
            <th>6</th>
            <th>{{tabledata.endowmentinsurance}}</th>
            <th>{{tabledata.unemploymentinsurance}}</th>
            <th>{{tabledata.industrialinsurance}}</th>
            <th>{{tabledata.maternityinsurance}}</th>
            <th>{{tabledata.medicalinsurance}}</th>
            <th>{{tabledata.sicknessinsurance}}</th>
            <th>--</th>
         </tr>
           <tr>
           <th><div class="right_oneTh">应缴合计</div> 
            <div class="left_F_B" >
              <span class="left_F_B_Span" >应</span>
              <span class="left_F_B_Span" >缴</span>
              <span class="left_F_B_Span" >保</span>
              <span class="left_F_B_Span" >险</span>
              <span class="left_F_B_Span" >费</span>
            </div></th>
            <th>7</th>
            <th>{{tabledata.endowmentInsuranceCollect}}</th>
            <th>{{tabledata.unemploymentInsuranceCollect}}</th>
            <th>{{tabledata.industrialInsuranceCollect}}</th>
            <th>{{tabledata.maternityInsuranceCollect}}</th>
            <th>{{tabledata.medicalInsuranceCollect}}</th>
            <th>{{tabledata.sicknessInsuranceCollect}}</th>
            <th>{{tabledata.collectall}}</th>
         </tr>
          <tr>
           <th><div class="right_oneTh">单位缴费</div> </th>
            <th>8</th>
            <th>{{tabledata.endowmentInsuranceCom}}</th>
            <th>{{tabledata.unemploymentInsuranceCom}}</th>
            <th>{{tabledata.industrialInsuranceCom}}</th>
            <th>{{tabledata.maternityInsuranceCom}}</th>
            <th>{{tabledata.medicalInsuranceCom}}</th>
            <th>{{tabledata.sicknessInsuranceCom}}</th>
            <th>{{tabledata.collectcom}}</th>
         </tr>
         <tr>
           <th><div class="right_twoTh">统筹基金</div>
            <div class="left_F_B_L" >
              <span class="left_F_B_L_Span"  >其</span>
              <span class="left_F_B_L_Span" >中</span>
            </div> </th>
            <th>9</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
         </tr>
         <tr>
           <th><div class="right_twoTh">划入账户</div> </th>
            <th>10</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
            <th>--</th>
         </tr>
         <tr>
           <th><div class="right_oneTh">个人缴费</div> </th>
            <th>11</th>
            <th>{{tabledata.endowmentInsurancePer}}</th>
            <th>{{tabledata.unemploymentInsurancePer}}</th>
            <th>{{tabledata.industrialInsurancePer}}</th>
            <th>{{tabledata.maternityInsurancePer}}</th>
            <th>{{tabledata.medicalInsurancePer}}</th>
            <th>{{tabledata.sicknessInsurancePer}}</th>
            <th>{{tabledata.collectper}}</th>
         </tr>
         <tr>
           <th><div class="right_oneTh">其他缴费</div> </th>
            <th>12</th>
            <th>{{tabledata.endowmentInsuranceOther}}</th>
            <th>{{tabledata.unemploymentInsuranceOther}}</th>
            <th>{{tabledata.industrialInsuranceOther}}</th>
            <th>{{tabledata.maternityInsuranceOther}}</th>
            <th>{{tabledata.medicalInsuranceOther}}</th>
            <th>{{tabledata.sicknessInsuranceOther}}</th>
            <th>{{tabledata.collectother}}</th>
         </tr>
       </tbody>
     </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tableHeight: window.innerHeight - 200,
      headLeft: {
        totolLeftList: [
          "缴费单位个数",
          "本月合计",
          "上月人数",
          "本月增加",
          "本月减少",
          "缴费基数合计",
          "应缴合计",
          "单位缴费",
          "统筹基金",
          "划入账户",
          "个人缴费",
          "其他缴费"
        ]
      },
    };
  },
  props: {
    tableHeader: {
      type: Array,
      required: true
    },
    // 表格的数据
    tabledata: {
      type: Object,
      required: true
    },
    spanRow: {
      type: Boolean,
      required: true
    },
    tabWinHeight:{
      type:Number,
      required:true
    }
  },
  mounted(){
    let a = {a:1}
    let b = {b:2}
    console.log(Object.assign(a,b))
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 多选
    selectionChangeHandle(val) {
      console.log(val, "this.dataListSelections");
      this.dataListSelections = val;
      if (this.dataListSelections != "") {
        this.dataListSelections.forEach(item => {
          let obj = {};
          obj.id = item.id;
          //   this.attendanceList.push(obj)
        });
      }
    }
  },
  computed: {
    
  }
};
</script>

<style   lang='scss'>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.tableDiv table{
  border-collapse: collapse;
 border: 1px solid #ebeef5;
//  height: 100%;
}

.tableDiv table tbody tr th{
  color:#606266 ;
  height: 35px;
  line-height: 35px;
  font-weight: 500;
  position: relative;
}
.tableDiv table thead tr th{
  color:#909399 ;
  font-weight: 600;
   height: 35px;
  line-height: 35px;
}
.tableDiv table .right_oneTh{
  margin-left: 15%;
}
.tableDiv table .right_twoTh{
  margin-left: 50%;
}
.tableHover .el-table__body tr.hover-row > th{
  background: rgba(255,255,255,0) !important;
}
.left_F {
  height: 408%;
  width: 30%;
  position: absolute;
  left: 0;
  top: 0%;
  border-right: 1px solid #ebeef5;
}
.left_F_Span,
.left_F_B_Span,
.left_F_B_L_Span {
  display: block;
  width: 100%;
}
.left_F_B {
  height: 615%;
  width: 30%;
  position: absolute;
  left: 0;
  top: 0%;
  border-right: 1px solid #ebeef5;
}
.left_F_B_L {
  height: 202%;
  width: 30%;
  position: absolute;
  left: 30%;
  top: 0%;
  border-right: 1px solid #ebeef5;
}


</style>
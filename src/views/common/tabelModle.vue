<template>
  <div>
    <div>
      <el-table
        :data="tabledata"
        :height="tableHeight"
        border
        id="taskTable"
        class="tableHover"
        ref="tabelData"
        @selection-change="selectionChangeHandle"
        :row-key="getRowKey"
      >
        <template v-for="item in tableHeader">
          <el-table-column
            :key="item.id"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            align="center"
          ></el-table-column>
        </template>
        <el-table-column fixed="left" header-align="center" align="center" width="200" label="项目">
          <template slot-scope="scope">
            <div
              :style="{'textAlign':(index == 8 || index == 9 ? 'right' : '') ,'marginLeft':index != 0 && index !=5 && index != 8 && index != 9 ? '20%' : ''}"
              v-for="(itemMain,index) in headLeft.totolLeftList"
              v-if="scope.$index == index"
              :key="index"
            >{{itemMain}}</div>
            <div class="left_F" v-if="scope.$index == 1">
              <span class="left_F_Span" style="margin-top:5%">缴</span>
              <span class="left_F_Span" style="margin-top:10%">费</span>
              <span class="left_F_Span" style="margin-top:10%">人</span>
              <span class="left_F_Span" style="margin-top:10%">数</span>
            </div>
            <div class="left_F_B" v-if="scope.$index == 6">
              <span class="left_F_B_Span" style="margin-top:5%">应</span>
              <span class="left_F_B_Span" style="margin-top:11%">缴</span>
              <span class="left_F_B_Span" style="margin-top:13%">保</span>
              <span class="left_F_B_Span" style="margin-top:12%">险</span>
              <span class="left_F_B_Span" style="margin-top:10%">费</span>
            </div>
            <div class="left_F_B_L" v-if="scope.$index == 8">
              <span class="left_F_B_L_Span"  style="margin-top:5%">其</span>
              <span class="left_F_B_L_Span"  style="margin-top:10%">中</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
// .tableHover .el-table--enable-row-hover .el-table__body tr:hover>td{
//   background: #fff !important;
// }
// .tableHover .el-table__row:hover{
// background: #fff !important;
// }
.tableHover .el-table__body tr.hover-row > td{
  background: rgba(255,255,255,0) !important;
}
.left_F {
  height: 410%;
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
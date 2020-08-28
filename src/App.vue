<template>
  <transition name="fade">
    <router-view></router-view>     
  </transition>
</template>

<script>
export default {};
</script>
<style>
/* 全局解决表格表头错位 */
body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}
/* 表格宽度问题 */
.rightCon .tableUrl{
  width: 100% !important;
}
.site-sidebar--dark .site-sidebar__menu.el-menu .el-submenu.is-opened{
  background-color: #fff;
}
.site-sidebar--dark .site-sidebar__menu.el-menu .el-menu{
  background-color: rgba(217, 217, 217, .4);
}
/* .site-sidebar--dark .site-sidebar__menu.el-menu .treeList_class .el-menu-item{
  background: rgba(138,151,158,.4)
} */
.site-sidebar--dark .site-sidebar__menu.el-menu .treeList_class .el-menu-item:hover{
      background: #e6f7ff;
}
.rightCon .tableUrl .el-table{
  width: 100%;
  overflow: auto;
}
.rightCon .tableUrl .el-table>.el-table__body-wrapper{
  height: 169px !important;
  overflow: auto !important;
}
.rightCon .tableWidth {
  position: relative;
  width: 100% !important
}
.rightCon .tableWidth .el-table{
  position: absolute;
  width: 100%;
  overflow: auto;
}
.rightCon .tableWidth .el-table>.el-table__body-wrapper{
  height: 249px !important;
  overflow: auto !important;
}
.rightCon .scoreTabel{
  position: relative;
  width: 100% !important;
}
.rightCon .scoreTabel .el-table{
  position: absolute;
  width: 100%;
  overflow: auto;
}
.rightCon .scoreTabel .el-table>.el-table__body-wrapper{
  height: 279px !important;
  overflow: auto !important;
}
/* 输入框公共样式 */
.attendance .el-date-editor--datetimerange.el-input__inner {
    width: 100% !important;
}
.attendance .el-range-editor--medium .el-range-separator{
  text-indent: -10px;
}
.el-input--medium .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.el-button--medium {
  padding: 8px 20px;
}
@media screen and (max-width: 1280px) {
  .el-button--medium {
  font-size: 12px;
}
}
@media screen and (max-width: 1280px) {
  .el-form-item__content {
  font-size: 12px;
}
}
.el-form-item--medium .el-form-item__content {
  line-height: 32px;
}
.el-range-editor--medium.el-input__inner {
  height: 32px;
}
.el-range-editor--medium .el-range__icon {
  line-height: 24px;
}
.el-range-editor--medium .el-range-separator {
  line-height: 24px;
}
.el-table--medium td {
  padding: 3px 0 !important;
}
.el-table--medium th {
  padding: 7px 0 !important;
}
.operatBtn {
  /* margin-top: -15px; */
  margin-left: 0%;
  margin-bottom: 10px;
}
.query {
  border-bottom: 2px solid #f5f5f5;
  margin-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 25px;
}
.is-center {
  padding: 6px 0;
}
.el-card__body {
  background: #f1f4f5;
  padding: 0 !important;
}
.mod-config,
.mod-role,
.mod-config,
.mod-user,
.mod-menu,
.mod-log {
  background: #fff;
  padding: 10px;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background: #5ea7f8 !important;
}
.site-navbar__avatar .el-dropdown-link > img {
  width: 16px;
  height: auto;
  margin-right: 5px;
  vertical-align: middle;
}
.el-button + .el-button {
  margin-left: 4px;
}
#specialForm .el-form-item .el-form-item__content {
  display: block !important;
}
#specialForm .el-row .el-col-6 .el-autocomplete {
  width: 100%;
}
.mod-config p {
  float: left;
  width: 25%;
  text-align: right;
  height: 32px;
  line-height: 32px;
  margin: 0;
}
#specialForm .el-row {
  margin-bottom: 0;
}
#specialForm .el-row .el-col-6 {
  position: relative;
  overflow: hidden;
}
#specialForm .el-row .el-col-6 .el-form-item:nth-child(1) {
  position: absolute;
  left: 0;
}
#specialForm .el-row .el-col-6 .el-form-item:nth-child(2),
#specialForm .el-row .el-col-6 .el-select {
  width: 100%;
  margin-left: 70px;
  padding-right: 97px;
}
#specialForm .headForm .el-row .el-col-6 .el-form-item:nth-child(2){
  margin-left: 86px;
}
#specialForm .el-form {
  border-bottom: 2px solid #f5f5f5;
}
#specialForm .el-row .el-col-6 .el-select {
  margin-left: 0px;
  padding-right: 0px;
}
#specialForm .el-form-item {
  margin-bottom: 10px;
}
#alarmTerminal .el-row {
  margin-bottom: 0;
}
#alarmTerminal .el-col-12 .el-form-item {
  display: inline-block;
}
#alarmTerminal .el-row .el-col {
  line-height: 2;
  font-size: 16px;
}
@media screen and (max-width: 1280px) {
  #alarmTerminal .el-row .el-col {
  line-height: 2;
  font-size: 12px;
}
}
.el-menu-item {
  /* padding: 0 10px; */
  font-size: 16px !important;
}
@media screen and (max-width: 1280px) {
  .el-menu-item {
  padding: 0 10px;
  font-size: 12px !important;
}
}
@media screen and (max-width: 1360px) {
  .el-menu-item {
  padding: 0 10px;
  font-size: 12px !important;
}
}
#four_class #child_class{
  width: 40%;
  margin-left: 25%;
}
@media screen and (max-width: 1280px) {
  #four_class #child_class {
    width: 60%;
  margin-left: 15%;
}
}
@media screen and (max-width: 1360px) {
  #four_class #child_class {
    width: 60%;
  margin-left: 15%;
}
}
/* @media screen and (max-width: 1280px) {
  .el-form-item__content {
  font-size: 12px !important;
}
}
@media screen and (max-width: 1360px) {
  .el-form-item__content {
  font-size: 12px !important;
}
} */

/* 特殊弹出窗高度 */

#specialDialog .el-dialog__body {
  height: 50vh;
  overflow: auto;
}
.el-dialog__body{
  height: auto;
  overflow: hidden;
}
.el-icon-close:before {
  font-size: 24px;
}
.el-dialog__headerbtn {
  top: 10px !important;
}
.el-form-item__content .el-textarea .el-textarea__inner {
  height: 32px;
}
#tableIndex .el-table th > .cell {
  text-align: center !important;
}

/* 任务模板新建 */
#dialog_template .beizhu .el-form-item {
  width: 100%;
  position: relative;
}
#paramIpt .el-form-item__content,
#dialog_template .beizhu .el-form-item__content {
  width: 100%;
  position: absolute;
  padding: 0 110px 0 5px;
}
#paramIpt label {
  padding: 0;
  text-align: right;
  line-height: 32px;
}
#paramIpt .TerminalPerformance > label {
  width: 130px !important;
}
.el-tabs__item {
  padding: 0 20px;
  height: 57px;
  line-height: 57px;
  font-size: 16px !important;
  font-weight: 500 !important;
}
.el-step__title {
  font-size: 14px !important;
  margin-left: -12px;
}
.el-step__head.is-success {
  color: #1890ff !important;
  border-color: #1890ff !important;
}
.el-step__title.is-success {
  color: #1890ff !important;
}

.el-pagination {
  margin-top: 15px;
  text-align: right;
}
.el-table th,
.el-table tr,
.el-table thead.is-group th {
  background: #fff;
}
/* 模态框组件 */
.modalComponent .el-dialog {
  margin: 50px auto 0 !important;
}
.alarm .el-table__header,
.alarm .el-table__body {
  width: 100% !important;
}
.alarm .el-table th,
.el-table tr,
.el-table thead.is-group th {
  text-align: center;
}
.tablesTest .el-tabs__item {
  height: 32px !important;
  line-height: 32px !important;
}
#secondSteps .el-tabs--border-card > .el-tabs__content {
  padding: 15px !important;
}
/*--------修改type=number的样式---------*/
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#secondSteps .el-table th > .cell {
  float: left !important;
  text-align: center !important;
}
#scriptAddBox .text_Class input {
  text-indent: 6em !important;
}
.alarmBoxRight .el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  text-align: center;
}
/* 告警订阅 */
.clearfix.contents .el-form-item--medium .el-form-item__label {
  line-height: 32px;
}
.clearfix.contents .el-form-item--medium .el-form-item__content,
.clearfix.contents .el-form-item__error {
  width: 100%;
  padding-left: 90px;
}
.clearfix.contents .el-input {
  width: 100%;
}
/* 公共滚动条 */
.commonScroll::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  visibility: hidden;
  /* background: #b6b6b6; */
}

.commonScroll:hover::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

.commonScroll:hover::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
  width: 8px;
  height: 10px;
}

.commonScroll:hover::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  height: 10px;
}
/* vpn控制样式 */
#vpnClose .el-dialog{
  width: 782px !important;
}
#vpnClose .el-form-item label{
  line-height: 32px;
}
.otherStyle1>.el-form-item,.otherStyle1>.el-form-item label{
  color: red;
}

</style>


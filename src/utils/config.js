
import FileSaver from "file-saver";
import XLSX from "xlsx";

// 导出公共方法
const configFun = function(dom){
    let table = document.querySelector(dom);
    var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
    var wb = XLSX.utils.table_to_book(table, xlsxParam)

    /* get binary string as output */
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '1.xlsx')
    } catch (e) {
        if (typeof console !== 'undefined') {
        console.log(e, wbout)
        }
    }
    return wbout
};
const deleteFn=function(id,self,Ajaxurl,itemId){
     var ids = id ? [id] : self.dataListSelections.map(item => {
        return item[itemId]
    })
    self.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal:false,
      type: 'warning'
    }).then(() => {
        self.$http({
        url: self.$http.adornUrl(Ajaxurl),
        method: 'post',
        data: self.$http.adornData(ids, false)
        }).then(({data}) => {
        if (data && data.code === 0) {
            self.$message({
            message:data.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
                self.totalPage = self.totalPage - 1
                if (self.totalPage % 10 === 0) {
                    self.pageIndex = self.pageIndex - 1
                }
                self.getDataList()
            }
            })
        } else {
            self.$message.error(data.msg)
        }
        })
    }).catch(() => {
    });
}
export {configFun,deleteFn}

import FileSaver from "file-saver";
import XLSX from "xlsx";
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
const Base64 = function(){
    // private property  
    const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  

    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  

    // private method for UTF-8 encoding  
    const _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  

        }  
        return utftext;  
    }  

    // private method for UTF-8 decoding  
    const _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;
        var c1,c2,c3;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
};
const Loading = function(text,flag,self){
 let loading =  self.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if(flag){
        loading.close();
      }
}

export default {
    install(Vue, options) {
        // 导出pdf
        Vue.prototype.getPdf = function (dom) {
            this.flag = true
            var title = this.htmlTitle
            let shareContent = document.querySelector(dom),//需要截图的包裹的（原生的）DOM 对象
                width = shareContent.clientWidth, //获取dom 宽度
                height = shareContent.clientHeight; //获取dom 高度
            html2Canvas(document.querySelector(dom), {    
                //写需要截图的div     
                width: width,
                height: height,       
                taintTest : false,     
                useCORS : true,            
                allowTaint :false, 　　//这三串代码解决跨域问题     
            }).then((canvas) => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = (contentWidth / 592.28) * 841.89;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = (592.28 / contentWidth) * contentHeight;
                var pageData = canvas.toDataURL("image/jpeg", 1.0);
                var img=new Image();
                var PDF = new JsPDF("", "pt", "a4");
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        if (leftHeight > 0) {
                            PDF.addPage();
                        }
                    }
                }
                PDF.save(title + '.pdf')
                this.flag = false
            })
        }
        // 发送邮件
        Vue.prototype.getPdfImg = function (dom, val) {
            this.outputImg = true
            var title = this.htmlTitle
            let shareContent = document.querySelector(dom),//需要截图的包裹的（原生的）DOM 对象
                width = shareContent.clientWidth, //获取dom 宽度
                height = shareContent.clientHeight; //获取dom 高度
            html2Canvas(document.querySelector(dom), {    
                //写需要截图的div     
                width: width,
                height: height,       
                taintTest : false,     
                useCORS : true,            
                allowTaint :false, 　　//这三串代码解决跨域问题     
            }).then((canvas) => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = (contentWidth / 592.28) * 841.89;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = (592.28 / contentWidth) * contentHeight;
                var pageData = canvas.toDataURL("image/jpeg", 1.0);
                var img=new Image();
                var PDF = new JsPDF("", "pt", "a4");
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        if (leftHeight > 0) {
                            PDF.addPage();
                        }
                    }
                }
                let pdfData = PDF.output('datauristring')
                let fileName = pdfData.replace('data:application/pdf;filename=generated.pdf;base64,', '')
                var base = new Base64();
                this.$http({
                    url: this.$http.adornUrl("mail/sendAttachmentsMail"),
                    method: "post",
                    data: {
                        'fileName': fileName,
                        'companyEmail': base.encode(val.temail) ,//公司邮箱
                        'userEmail':base.encode(val.cemail) ,//用户邮箱
                        'userName':base.encode(val.cname) ,
                        'userAdress':base.encode(val.address) 
                    }
                  }).then(({ data }) => {
                    if (data.code === 0) {
                      this.$message({
                        message: data.msg
                      });
                    } else {
                      this.$message.error(data.msg);
                    }
                  });
                this.outputImg = false
            })
        }
        // 数字校验
        Vue.prototype.isNum=function(rule, value, callback) {
            if (value == "" || value == undefined || value == null) {
            callback();
            } else {
            const reg = /^\+?[1-9][0-9]*$/;
            if (!reg.test(value) && value != "") {
                callback(new Error("必须为数字"));
            } else {
                callback();
            }
            }
        }
    }
}
// 导出公共方法
const configFun = function (dom, name = 1) {
    let table = document.querySelector(dom);
    var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
    var wb = XLSX.utils.table_to_book(table, xlsxParam)

    /* get binary string as output */
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name + '.xlsx')
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.log(e, wbout)
        }
    }
    return wbout
};
const deleteFn = function (id, self, Ajaxurl, itemId) {
    var ids = id ? [id] : self.dataListSelections.map(item => {
        return item[itemId]
    })
    // `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示'
    self.$confirm(`确定进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
    }).then(() => {
        self.$http({
            url: self.$http.adornUrl(Ajaxurl),
            method: 'post',
            data: self.$http.adornData(ids, false)
        }).then(({ data }) => {
            if (data && data.code === 0) {
                self.$message({
                    message: data.msg,
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                        self.totalPage = self.totalPage - 1
                        if (self.totalPage % 10 === 0) {
                            self.currentChangeHandle(self.pageIndex - 1)
                        } else {
                            self.currentChangeHandle(self.pageIndex)
                        }
                    }
                })
            } else {
                self.$message.error(data.msg)
            }
        })
    }).catch(() => {
    });
}
var d = new Date();
var yy = d.getFullYear().toString().slice(2);
var MM = d.getMonth() + 1 >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
var DD = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
var h = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
var mm = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
let version = yy + MM + DD + h + mm;
const webName = ''
console.log(window.location.hostname == 'localhost','window.location')
if(window.location.hostname == 'localhost'){
    webName = ''
}else {
    webName = '/CTS-server' // '/ping-web/version'
}
// const webName = '/CTS-server' // '/ping-web/version'
// const webName = ''
const provinces = {
    "中国": webName + "/static/json/province/china.json",
    "海南": webName + "/static/json/province/hainan.json",
    "西藏": webName + "/static/json/province/xizang.json",
    "浙江": webName + "/static/json/province/zhejiang.json",
    "云南": webName + "/static/json/province/yunnan.json",
    "新疆": webName + "/static/json/province/xinjiang.json",
    "天津": webName + "/static/json/province/tianjin.json",
    "四川": webName + "/static/json/province/sichuan.json",
    "陕西": webName + "/static/json/province/shanxi1.json",
    "山西": webName + "/static/json/province/shanxi.json",
    "上海": webName + "/static/json/province/shanghai.json",
    "山东": webName + "/static/json/province/shandong.json",
    "青海": webName + "/static/json/province/qinghai.json",
    "宁夏": webName + "/static/json/province/ningxia.json",
    "内蒙古": webName + "/static/json/province/neimenggu.json",
    "辽宁": webName + "/static/json/province/liaoning.json",
    "吉林": webName + "/static/json/province/jilin.json",
    "江西": webName + "/static/json/province/jiangxi.json",
    "江苏": webName + "/static/json/province/jiangsu.json",
    "湖南": webName + "/static/json/province/hunan.json",
    "湖北": webName + "/static/json/province/hubei.json",
    "河南": webName + "/static/json/province/henan.json",
    "黑龙江": webName + "/static/json/province/heilongjiang.json",
    "河北": webName + "/static/json/province/hebei.json",
    "贵州": webName + "/static/json/province/guizhou.json",
    "广西": webName + "/static/json/province/guangxi.json",
    "广东": webName + "/static/json/province/guangdong.json",
    "甘肃": webName + "/static/json/province/gansu.json",
    "重庆": webName + "/static/json/province/chongqing.json",
    "澳门": webName + "/static/json/province/aomen.json",
    "安徽": webName + "/static/json/province/anhui.json",
    "北京": webName + "/static/json/province/beijing.json",
    "福建": webName + "/static/json/province/fujian.json",
    "香港": webName + "/static/json/province/xianggang.json",
    "北京市": webName + "/static/json/geometryCouties/110100.json",
    "天津市": webName + "/static/json/geometryCouties/120100.json",
    "上海市": webName + "/static/json/geometryCouties/310100.json",
    "重庆市": webName + "/static/json/geometryCouties/500100.json",
    // "崇明县": webName + "/static/json/geometryCouties/310200.json",            // ??
    "湖北省直辖县市": webName + "/static/json/geometryCouties/429000.json",       // ??
    "铜仁市": webName + "/static/json/geometryCouties/522200.json",            // ??
    "毕节市": webName + "/static/json/geometryCouties/522400.json",            // ??   
    "石家庄市": webName + "/static/json/geometryCouties/130100.json",
    "唐山市": webName + "/static/json/geometryCouties/130200.json",
    "秦皇岛市": webName + "/static/json/geometryCouties/130300.json",
    "邯郸市": webName + "/static/json/geometryCouties/130400.json",
    "邢台市": webName + "/static/json/geometryCouties/130500.json",
    "保定市": webName + "/static/json/geometryCouties/130600.json",
    "张家口市": webName + "/static/json/geometryCouties/130700.json",
    "承德市": webName + "/static/json/geometryCouties/130800.json",
    "沧州市": webName + "/static/json/geometryCouties/130900.json",
    "廊坊市": webName + "/static/json/geometryCouties/131000.json",
    "衡水市": webName + "/static/json/geometryCouties/131100.json",
    "太原市": webName + "/static/json/geometryCouties/140100.json",
    "大同市": webName + "/static/json/geometryCouties/140200.json",
    "阳泉市": webName + "/static/json/geometryCouties/140300.json",
    "长治市": webName + "/static/json/geometryCouties/140400.json",
    "晋城市": webName + "/static/json/geometryCouties/140500.json",
    "朔州市": webName + "/static/json/geometryCouties/140600.json",
    "晋中市": webName + "/static/json/geometryCouties/140700.json",
    "运城市": webName + "/static/json/geometryCouties/140800.json",
    "忻州市": webName + "/static/json/geometryCouties/140900.json",
    "临汾市": webName + "/static/json/geometryCouties/141000.json",
    "吕梁市": webName + "/static/json/geometryCouties/141100.json",
    "呼和浩特市": webName + "/static/json/geometryCouties/150100.json",
    "包头市": webName + "/static/json/geometryCouties/150200.json",
    "乌海市": webName + "/static/json/geometryCouties/150300.json",
    "赤峰市": webName + "/static/json/geometryCouties/150400.json",
    "通辽市": webName + "/static/json/geometryCouties/150500.json",
    "鄂尔多斯市": webName + "/static/json/geometryCouties/150600.json",
    "呼伦贝尔市": webName + "/static/json/geometryCouties/150700.json",
    "巴彦淖尔市": webName + "/static/json/geometryCouties/150800.json",
    "乌兰察布市": webName + "/static/json/geometryCouties/150900.json",
    "兴安盟": webName + "/static/json/geometryCouties/152200.json",
    "锡林郭勒盟": webName + "/static/json/geometryCouties/152500.json",
    "阿拉善盟": webName + "/static/json/geometryCouties/152900.json",
    "沈阳市": webName + "/static/json/geometryCouties/210100.json",
    "大连市": webName + "/static/json/geometryCouties/210200.json",
    "鞍山市": webName + "/static/json/geometryCouties/210300.json",
    "抚顺市": webName + "/static/json/geometryCouties/210400.json",
    "本溪市": webName + "/static/json/geometryCouties/210500.json",
    "丹东市": webName + "/static/json/geometryCouties/210600.json",
    "锦州市": webName + "/static/json/geometryCouties/210700.json",
    "营口市": webName + "/static/json/geometryCouties/210800.json",
    "阜新市": webName + "/static/json/geometryCouties/210900.json",
    "辽阳市": webName + "/static/json/geometryCouties/211000.json",
    "盘锦市": webName + "/static/json/geometryCouties/211100.json",
    "铁岭市": webName + "/static/json/geometryCouties/211200.json",
    "朝阳市": webName + "/static/json/geometryCouties/211300.json",
    "葫芦岛市": webName + "/static/json/geometryCouties/211400.json",
    "长春市": webName + "/static/json/geometryCouties/220100.json",
    "吉林市": webName + "/static/json/geometryCouties/220200.json",
    "四平市": webName + "/static/json/geometryCouties/220300.json",
    "辽源市": webName + "/static/json/geometryCouties/220400.json",
    "通化市": webName + "/static/json/geometryCouties/220500.json",
    "白山市": webName + "/static/json/geometryCouties/220600.json",
    "松原市": webName + "/static/json/geometryCouties/220700.json",
    "白城市": webName + "/static/json/geometryCouties/220800.json",
    "延边朝鲜族自治州": webName + "/static/json/geometryCouties/222400.json",
    "哈尔滨市": webName + "/static/json/geometryCouties/230100.json",
    "齐齐哈尔市": webName + "/static/json/geometryCouties/230200.json",
    "鸡西市": webName + "/static/json/geometryCouties/230300.json",
    "鹤岗市": webName + "/static/json/geometryCouties/230400.json",
    "双鸭山市": webName + "/static/json/geometryCouties/230500.json",
    "大庆市": webName + "/static/json/geometryCouties/230600.json",
    "伊春市": webName + "/static/json/geometryCouties/230700.json",
    "佳木斯市": webName + "/static/json/geometryCouties/230800.json",
    "七台河市": webName + "/static/json/geometryCouties/230900.json",
    "牡丹江市": webName + "/static/json/geometryCouties/231000.json",
    "黑河市": webName + "/static/json/geometryCouties/231100.json",
    "绥化市": webName + "/static/json/geometryCouties/231200.json",
    "大兴安岭地区": webName + "/static/json/geometryCouties/232700.json",
    "南京": webName + "/static/json/geometryCouties/320100.json",
    "无锡市": webName + "/static/json/geometryCouties/320200.json",
    "徐州市": webName + "/static/json/geometryCouties/320300.json",
    "常州市": webName + "/static/json/geometryCouties/320400.json",
    "苏州市": webName + "/static/json/geometryCouties/320500.json",
    "南通市": webName + "/static/json/geometryCouties/320600.json",
    "连云港市": webName + "/static/json/geometryCouties/320700.json",
    "淮安市": webName + "/static/json/geometryCouties/320800.json",
    "盐城市": webName + "/static/json/geometryCouties/320900.json",
    "扬州市": webName + "/static/json/geometryCouties/321000.json",
    "镇江市": webName + "/static/json/geometryCouties/321100.json",
    "泰州市": webName + "/static/json/geometryCouties/321200.json",
    "宿迁市": webName + "/static/json/geometryCouties/321300.json",
    "杭州市": webName + "/static/json/geometryCouties/330100.json",
    "宁波市": webName + "/static/json/geometryCouties/330200.json",
    "温州市": webName + "/static/json/geometryCouties/330300.json",
    "嘉兴市": webName + "/static/json/geometryCouties/330400.json",
    "湖州市": webName + "/static/json/geometryCouties/330500.json",
    "绍兴市": webName + "/static/json/geometryCouties/330600.json",
    "金华市": webName + "/static/json/geometryCouties/330700.json",
    "衢州市": webName + "/static/json/geometryCouties/330800.json",
    "舟山市": webName + "/static/json/geometryCouties/330900.json",
    "台州市": webName + "/static/json/geometryCouties/331000.json",
    "丽水市": webName + "/static/json/geometryCouties/331100.json",
    "合肥市": webName + "/static/json/geometryCouties/340100.json",
    "芜湖市": webName + "/static/json/geometryCouties/340200.json",
    "蚌埠市": webName + "/static/json/geometryCouties/340300.json",
    "淮南市": webName + "/static/json/geometryCouties/340400.json",
    "马鞍山市": webName + "/static/json/geometryCouties/340500.json",
    "淮北市": webName + "/static/json/geometryCouties/340600.json",
    "铜陵市": webName + "/static/json/geometryCouties/340700.json",
    "安庆市": webName + "/static/json/geometryCouties/340800.json",
    "黄山市": webName + "/static/json/geometryCouties/341000.json",
    "滁州市": webName + "/static/json/geometryCouties/341100.json",
    "阜阳市": webName + "/static/json/geometryCouties/341200.json",
    "宿州市": webName + "/static/json/geometryCouties/341300.json",
    "六安市": webName + "/static/json/geometryCouties/341500.json",
    "亳州市": webName + "/static/json/geometryCouties/341600.json",
    "池州市": webName + "/static/json/geometryCouties/341700.json",
    "宣城市": webName + "/static/json/geometryCouties/341800.json",
    "福州市": webName + "/static/json/geometryCouties/350100.json",
    "厦门市": webName + "/static/json/geometryCouties/350200.json",
    "莆田市": webName + "/static/json/geometryCouties/350300.json",
    "三明市": webName + "/static/json/geometryCouties/350400.json",
    "泉州市": webName + "/static/json/geometryCouties/350500.json",
    "漳州市": webName + "/static/json/geometryCouties/350600.json",
    "南平市": webName + "/static/json/geometryCouties/350700.json",
    "龙岩市": webName + "/static/json/geometryCouties/350800.json",
    "宁德市": webName + "/static/json/geometryCouties/350900.json",
    "南昌市": webName + "/static/json/geometryCouties/360100.json",
    "景德镇市": webName + "/static/json/geometryCouties/360200.json",
    "萍乡市": webName + "/static/json/geometryCouties/360300.json",
    "九江市": webName + "/static/json/geometryCouties/360400.json",
    "新余市": webName + "/static/json/geometryCouties/360500.json",
    "鹰潭市": webName + "/static/json/geometryCouties/360600.json",
    "赣州市": webName + "/static/json/geometryCouties/360700.json",
    "吉安市": webName + "/static/json/geometryCouties/360800.json",
    "宜春市": webName + "/static/json/geometryCouties/360900.json",
    "抚州市": webName + "/static/json/geometryCouties/361000.json",
    "上饶市": webName + "/static/json/geometryCouties/361100.json",
    "济南市": webName + "/static/json/geometryCouties/370100.json",
    "青岛市": webName + "/static/json/geometryCouties/370200.json",
    "淄博市": webName + "/static/json/geometryCouties/370300.json",
    "枣庄市": webName + "/static/json/geometryCouties/370400.json",
    "东营市": webName + "/static/json/geometryCouties/370500.json",
    "烟台市": webName + "/static/json/geometryCouties/370600.json",
    "潍坊市": webName + "/static/json/geometryCouties/370700.json",
    "济宁市": webName + "/static/json/geometryCouties/370800.json",
    "泰安市": webName + "/static/json/geometryCouties/370900.json",
    "威海市": webName + "/static/json/geometryCouties/371000.json",
    "日照市": webName + "/static/json/geometryCouties/371100.json",
    "莱芜市": webName + "/static/json/geometryCouties/371200.json",
    "临沂市": webName + "/static/json/geometryCouties/371300.json",
    "德州市": webName + "/static/json/geometryCouties/371400.json",
    "聊城市": webName + "/static/json/geometryCouties/371500.json",
    "滨州市": webName + "/static/json/geometryCouties/371600.json",
    "菏泽市": webName + "/static/json/geometryCouties/371700.json",
    "郑州市": webName + "/static/json/geometryCouties/410100.json",
    "开封市": webName + "/static/json/geometryCouties/410200.json",
    "洛阳市": webName + "/static/json/geometryCouties/410300.json",
    "平顶山市": webName + "/static/json/geometryCouties/410400.json",
    "安阳市": webName + "/static/json/geometryCouties/410500.json",
    "鹤壁市": webName + "/static/json/geometryCouties/410600.json",
    "新乡市": webName + "/static/json/geometryCouties/410700.json",
    "焦作市": webName + "/static/json/geometryCouties/410800.json",
    "濮阳市": webName + "/static/json/geometryCouties/410900.json",
    "许昌市": webName + "/static/json/geometryCouties/411000.json",
    "漯河市": webName + "/static/json/geometryCouties/411100.json",
    "三门峡市": webName + "/static/json/geometryCouties/411200.json",
    "南阳市": webName + "/static/json/geometryCouties/411300.json",
    "商丘市": webName + "/static/json/geometryCouties/411400.json",
    "信阳市": webName + "/static/json/geometryCouties/411500.json",
    "周口市": webName + "/static/json/geometryCouties/411600.json",
    "驻马店市": webName + "/static/json/geometryCouties/411700.json",
    "省直辖县级行政区划": webName + "/static/json/geometryCouties/469000.json",
    "武汉": webName + "/static/json/geometryCouties/420100.json",
    "黄石市": webName + "/static/json/geometryCouties/420200.json",
    "十堰市": webName + "/static/json/geometryCouties/420300.json",
    "宜昌市": webName + "/static/json/geometryCouties/420500.json",
    "襄阳市": webName + "/static/json/geometryCouties/420600.json",
    "鄂州市": webName + "/static/json/geometryCouties/420700.json",
    "荆门市": webName + "/static/json/geometryCouties/420800.json",
    "孝感市": webName + "/static/json/geometryCouties/420900.json",
    "荆州市": webName + "/static/json/geometryCouties/421000.json",
    "黄冈市": webName + "/static/json/geometryCouties/421100.json",
    "咸宁市": webName + "/static/json/geometryCouties/421200.json",
    "随州市": webName + "/static/json/geometryCouties/421300.json",
    "恩施土家族苗族自治州": webName + "/static/json/geometryCouties/422800.json",
    "长沙": webName + "/static/json/geometryCouties/430100.json",
    "株洲市": webName + "/static/json/geometryCouties/430200.json",
    "湘潭市": webName + "/static/json/geometryCouties/430300.json",
    "衡阳市": webName + "/static/json/geometryCouties/430400.json",
    "邵阳市": webName + "/static/json/geometryCouties/430500.json",
    "岳阳市": webName + "/static/json/geometryCouties/430600.json",
    "常德市": webName + "/static/json/geometryCouties/430700.json",
    "张家界市": webName + "/static/json/geometryCouties/430800.json",
    "益阳市": webName + "/static/json/geometryCouties/430900.json",
    "郴州市": webName + "/static/json/geometryCouties/431000.json",
    "永州市": webName + "/static/json/geometryCouties/431100.json",
    "怀化市": webName + "/static/json/geometryCouties/431200.json",
    "娄底市": webName + "/static/json/geometryCouties/431300.json",
    "湘西土家族苗族自治州": webName + "/static/json/geometryCouties/433100.json",
    "广州市": webName + "/static/json/geometryCouties/440100.json",
    "韶关市": webName + "/static/json/geometryCouties/440200.json",
    "深圳市": webName + "/static/json/geometryCouties/440300.json",
    "珠海市": webName + "/static/json/geometryCouties/440400.json",
    "汕头市": webName + "/static/json/geometryCouties/440500.json",
    "佛山市": webName + "/static/json/geometryCouties/440600.json",
    "江门市": webName + "/static/json/geometryCouties/440700.json",
    "湛江市": webName + "/static/json/geometryCouties/440800.json",
    "茂名市": webName + "/static/json/geometryCouties/440900.json",
    "肇庆市": webName + "/static/json/geometryCouties/441200.json",
    "惠州市": webName + "/static/json/geometryCouties/441300.json",
    "梅州市": webName + "/static/json/geometryCouties/441400.json",
    "汕尾市": webName + "/static/json/geometryCouties/441500.json",
    "河源市": webName + "/static/json/geometryCouties/441600.json",
    "阳江市": webName + "/static/json/geometryCouties/441700.json",
    "清远市": webName + "/static/json/geometryCouties/441800.json",
    "东莞市": webName + "/static/json/geometryCouties/441900.json",
    "中山市": webName + "/static/json/geometryCouties/442000.json",
    "潮州市": webName + "/static/json/geometryCouties/445100.json",
    "揭阳市": webName + "/static/json/geometryCouties/445200.json",
    "云浮市": webName + "/static/json/geometryCouties/445300.json",
    "南宁市": webName + "/static/json/geometryCouties/450100.json",
    "柳州市": webName + "/static/json/geometryCouties/450200.json",
    "桂林市": webName + "/static/json/geometryCouties/450300.json",
    "梧州市": webName + "/static/json/geometryCouties/450400.json",
    "北海市": webName + "/static/json/geometryCouties/450500.json",
    "防城港市": webName + "/static/json/geometryCouties/450600.json",
    "钦州市": webName + "/static/json/geometryCouties/450700.json",
    "贵港市": webName + "/static/json/geometryCouties/450800.json",
    "玉林市": webName + "/static/json/geometryCouties/450900.json",
    "百色市": webName + "/static/json/geometryCouties/451000.json",
    "贺州市": webName + "/static/json/geometryCouties/451100.json",
    "河池市": webName + "/static/json/geometryCouties/451200.json",
    "来宾市": webName + "/static/json/geometryCouties/451300.json",
    "崇左市": webName + "/static/json/geometryCouties/451400.json",
    "海口市": webName + "/static/json/geometryCouties/460100.json",
    "三亚市": webName + "/static/json/geometryCouties/460200.json",
    "三沙市": webName + "/static/json/geometryCouties/460300.json",
    "成都市": webName + "/static/json/geometryCouties/510100.json",
    "自贡市": webName + "/static/json/geometryCouties/510300.json",
    "攀枝花市": webName + "/static/json/geometryCouties/510400.json",
    "泸州市": webName + "/static/json/geometryCouties/510500.json",
    "德阳市": webName + "/static/json/geometryCouties/510600.json",
    "绵阳市": webName + "/static/json/geometryCouties/510700.json",
    "广元市": webName + "/static/json/geometryCouties/510800.json",
    "遂宁市": webName + "/static/json/geometryCouties/510900.json",
    "内江市": webName + "/static/json/geometryCouties/511000.json",
    "乐山市": webName + "/static/json/geometryCouties/511100.json",
    "南充市": webName + "/static/json/geometryCouties/511300.json",
    "眉山市": webName + "/static/json/geometryCouties/511400.json",
    "宜宾市": webName + "/static/json/geometryCouties/511500.json",
    "广安市": webName + "/static/json/geometryCouties/511600.json",
    "达州市": webName + "/static/json/geometryCouties/511700.json",
    "雅安市": webName + "/static/json/geometryCouties/511800.json",
    "巴中市": webName + "/static/json/geometryCouties/511900.json",
    "资阳市": webName + "/static/json/geometryCouties/512000.json",
    "阿坝藏族羌族自治州": webName + "/static/json/geometryCouties/513200.json",
    "甘孜藏族自治州": webName + "/static/json/geometryCouties/513300.json",
    "凉山彝族自治州": webName + "/static/json/geometryCouties/513400.json",
    "贵阳市": webName + "/static/json/geometryCouties/520100.json",
    "六盘水市": webName + "/static/json/geometryCouties/520200.json",
    "遵义市": webName + "/static/json/geometryCouties/520300.json",
    "安顺市": webName + "/static/json/geometryCouties/520400.json",
    "黔西南布依族苗族自治州": webName + "/static/json/geometryCouties/522300.json",
    "黔东南苗族侗族自治州": webName + "/static/json/geometryCouties/522600.json",
    "黔南布依族苗族自治州": webName + "/static/json/geometryCouties/522700.json",
    "昆明市": webName + "/static/json/geometryCouties/530100.json",
    "曲靖市": webName + "/static/json/geometryCouties/530300.json",
    "玉溪市": webName + "/static/json/geometryCouties/530400.json",
    "保山市": webName + "/static/json/geometryCouties/530500.json",
    "昭通市": webName + "/static/json/geometryCouties/530600.json",
    "丽江市": webName + "/static/json/geometryCouties/530700.json",
    "普洱市": webName + "/static/json/geometryCouties/530800.json",
    "临沧市": webName + "/static/json/geometryCouties/530900.json",
    "楚雄彝族自治州": webName + "/static/json/geometryCouties/532300.json",
    "红河哈尼族彝族自治州": webName + "/static/json/geometryCouties/532500.json",
    "文山壮族苗族自治州": webName + "/static/json/geometryCouties/532600.json",
    "西双版纳傣族自治州": webName + "/static/json/geometryCouties/532800.json",
    "大理白族自治州": webName + "/static/json/geometryCouties/532900.json",
    "德宏傣族景颇族自治州": webName + "/static/json/geometryCouties/533100.json",
    "怒江傈僳族自治州": webName + "/static/json/geometryCouties/533300.json",
    "迪庆藏族自治州": webName + "/static/json/geometryCouties/533400.json",
    "拉萨市": webName + "/static/json/geometryCouties/540100.json",
    "昌都地区": webName + "/static/json/geometryCouties/542100.json",
    "山南地区": webName + "/static/json/geometryCouties/542200.json",
    "日喀则地区": webName + "/static/json/geometryCouties/542300.json",
    "那曲地区": webName + "/static/json/geometryCouties/542400.json",
    "阿里地区": webName + "/static/json/geometryCouties/542500.json",
    "林芝地区": webName + "/static/json/geometryCouties/542600.json",
    "西安市": webName + "/static/json/geometryCouties/610100.json",
    "铜川市": webName + "/static/json/geometryCouties/610200.json",
    "宝鸡市": webName + "/static/json/geometryCouties/610300.json",
    "咸阳市": webName + "/static/json/geometryCouties/610400.json",
    "渭南市": webName + "/static/json/geometryCouties/610500.json",
    "延安市": webName + "/static/json/geometryCouties/610600.json",
    "汉中市": webName + "/static/json/geometryCouties/610700.json",
    "榆林市": webName + "/static/json/geometryCouties/610800.json",
    "安康市": webName + "/static/json/geometryCouties/610900.json",
    "商洛市": webName + "/static/json/geometryCouties/611000.json",
    "兰州市": webName + "/static/json/geometryCouties/620100.json",
    "嘉峪关市": webName + "/static/json/geometryCouties/620200.json",
    "金昌市": webName + "/static/json/geometryCouties/620300.json",
    "白银市": webName + "/static/json/geometryCouties/620400.json",
    "天水市": webName + "/static/json/geometryCouties/620500.json",
    "武威市": webName + "/static/json/geometryCouties/620600.json",
    "张掖市": webName + "/static/json/geometryCouties/620700.json",
    "平凉市": webName + "/static/json/geometryCouties/620800.json",
    "酒泉市": webName + "/static/json/geometryCouties/620900.json",
    "庆阳市": webName + "/static/json/geometryCouties/621000.json",
    "定西市": webName + "/static/json/geometryCouties/621100.json",
    "陇南市": webName + "/static/json/geometryCouties/621200.json",
    "临夏回族自治州": webName + "/static/json/geometryCouties/622900.json",
    "甘南藏族自治州": webName + "/static/json/geometryCouties/623000.json",
    "西宁市": webName + "/static/json/geometryCouties/630100.json",
    "海东地区": webName + "/static/json/geometryCouties/632100.json",
    "海北藏族自治州": webName + "/static/json/geometryCouties/632200.json",
    "黄南藏族自治州": webName + "/static/json/geometryCouties/632300.json",
    "海南藏族自治州": webName + "/static/json/geometryCouties/632500.json",
    "果洛藏族自治州": webName + "/static/json/geometryCouties/632600.json",
    "玉树藏族自治州": webName + "/static/json/geometryCouties/632700.json",
    "海西蒙古族藏族自治州": webName + "/static/json/geometryCouties/632800.json",
    "银川市": webName + "/static/json/geometryCouties/640100.json",
    "石嘴山市": webName + "/static/json/geometryCouties/640200.json",
    "吴忠市": webName + "/static/json/geometryCouties/640300.json",
    "固原市": webName + "/static/json/geometryCouties/640400.json",
    "中卫市": webName + "/static/json/geometryCouties/640500.json",
    "乌鲁木齐市": webName + "/static/json/geometryCouties/650100.json",
    "克拉玛依市": webName + "/static/json/geometryCouties/650200.json",
    "吐鲁番地区": webName + "/static/json/geometryCouties/652100.json",
    "哈密地区": webName + "/static/json/geometryCouties/652200.json",
    "昌吉回族自治州": webName + "/static/json/geometryCouties/652300.json",
    "博尔塔拉蒙古自治州": webName + "/static/json/geometryCouties/652700.json",
    "巴音郭楞蒙古自治州": webName + "/static/json/geometryCouties/652800.json",
    "阿克苏地区": webName + "/static/json/geometryCouties/652900.json",
    "克孜勒苏柯尔克孜自治州": webName + "/static/json/geometryCouties/653000.json",
    "喀什地区": webName + "/static/json/geometryCouties/653100.json",
    "和田地区": webName + "/static/json/geometryCouties/653200.json",
    "伊犁哈萨克自治州": webName + "/static/json/geometryCouties/654000.json",
    "塔城地区": webName + "/static/json/geometryCouties/654200.json",
    "阿勒泰地区": webName + "/static/json/geometryCouties/654300.json",
    "自治区直辖县级行政区划": webName + "/static/json/geometryCouties/659000.json",
    "台湾省": webName + "/static/json/geometryCouties/710000.json",
    "香港特别行政区": webName + "/static/json/geometryCouties/810100.json",
    "澳门特别行政区": webName + "/static/json/geometryCouties/820000.json",
    "太谷县": ''
}
const citys = {
    "中国": webName + "/static/json/province/china.json",
    "海南": webName + "/static/json/province/hainan.json",
    "西藏": webName + "/static/json/province/xizang.json",
    "浙江": webName + "/static/json/province/zhejiang.json",
    "云南": webName + "/static/json/province/yunnan.json",
    "新疆": webName + "/static/json/province/xinjiang.json",
    "天津": webName + "/static/json/province/tianjin.json",
    "四川": webName + "/static/json/province/sichuan.json",
    "陕西": webName + "/static/json/province/shanxi1.json",
    "山西": webName + "/static/json/province/shanxi.json",
    "上海": webName + "/static/json/province/shanghai.json",
    "山东": webName + "/static/json/province/shandong.json",
    "青海": webName + "/static/json/province/qinghai.json",
    "宁夏": webName + "/static/json/province/ningxia.json",
    "内蒙古": webName + "/static/json/province/neimenggu.json",
    "辽宁": webName + "/static/json/province/liaoning.json",
    "吉林": webName + "/static/json/province/jilin.json",
    "江西": webName + "/static/json/province/jiangxi.json",
    "江苏": webName + "/static/json/province/jiangsu.json",
    "湖南": webName + "/static/json/province/hunan.json",
    "湖北": webName + "/static/json/province/hubei.json",
    "河南": webName + "/static/json/province/henan.json",
    "黑龙江": webName + "/static/json/province/heilongjiang.json",
    "河北": webName + "/static/json/province/hebei.json",
    "贵州": webName + "/static/json/province/guizhou.json",
    "广西": webName + "/static/json/province/guangxi.json",
    "广东": webName + "/static/json/province/guangdong.json",
    "甘肃": webName + "/static/json/province/gansu.json",
    "重庆": webName + "/static/json/province/chongqing.json",
    "澳门": webName + "/static/json/province/aomen.json",
    "安徽": webName + "/static/json/province/anhui.json",
    "北京": webName + "/static/json/province/beijing.json",
    "福建": webName + "/static/json/province/fujian.json",
    "香港": webName + "/static/json/province/xianggang.json"
}
let time = new Date(new Date().getTime());
let intime =
    time.getFullYear() +
    "-" +
    (time.getMonth() + 1) +
    "-" +
    time.getDate() +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds();



export {Base64, configFun, deleteFn, provinces, citys, intime ,Loading}

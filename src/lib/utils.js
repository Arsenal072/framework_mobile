import { formatDate } from '../filter/index';
import _ from 'lodash';
import * as md5 from './md5';
import Vue from 'vue'

const utils = {}
utils.isNotEmpty = (obj => {
  if (obj === undefined || obj === '' || obj === null || obj === 'undefined') {
    return false;
  }
  return true;
});

//toast提示
export function toast(msg) {
    new Vue().$vux.toast.show({
        text: msg,
        position: 'middle',
        time: 3 * 1000,
        type:'text',
        width:'auto'
    })
}

// 获取url链接后面的参数
utils.GetQueryString = (name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var subUrl = '?'+ window.location.href.split('?')[1]
    var r = subUrl.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
// 获取客户端类型
utils.getFullPlatform = () => {
    var t = navigator.userAgent.toLowerCase(),
        e = {
            platform: "other",
            version: "1.0"
        };
    return - 1 != t.indexOf("rubikui") ? (e = {
        platform: "native",
        version: "1.0"
    },
    -1 != t.indexOf("monkeycenter") && (e.monkey = !0)) : -1 != t.indexOf("micromessenger") ? (e = {
        platform: "weixin",
        version: "1.0"
    },
    -1 != t.indexOf("wxwork") && (e.work = !0)) : -1 != t.indexOf("alipayclient") && (e = {
        platform: "alipay",
        version: "1.0"
    }), e
}

// 验证身份证合法性
utils.isIdentityCodeValid = (code) => {
    code = code.toUpperCase();

    var reg, city = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏",
        33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
        41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西",
        46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
        54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
        65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
    };

    if(!city[code.substr(0, 2)]) {
        return false;
    }

    if (code.length == 15) {
        reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

        if(reg.test(code)){
            return isValidityBrithBy15IdCard(code);
        }

        return false;

    } else if (code.length == 18) {
        reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

        if (!reg.test(code)) {
            return false;
        } else {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }

            if (parity[sum % 11] != code[17]) {
               return false;
            }
            return true;
        }
    }

    return false;
}
//民族
utils.nationList = [
    [
        "汉族",
        '蒙古族',
        '回族',
        '藏族',
        '维吾尔族',
        '苗族',
        '彝族',
        '壮族',
        '布依族',
        '朝鲜族',
        '满族',
        '侗族',
        '瑶族',
        '白族',
        '土家族',
        '哈尼族',
        '哈萨克族',
        '傣族',
        '黎族',
        '傈僳族',
        '佤族',
        '畲族',
        '高山族',
        '拉祜族',
        '水族',
        '东乡族',
        '纳西族',
        '景颇族',
        '柯尔克孜族',
        '土族',
        '达斡尔族',
        '仫佬族',
        '羌族',
        '布朗族',
        '撒拉族',
        '毛南族',
        '仡佬族',
        '锡伯族',
        '阿昌族',
        '普米族',
        '怒族',
        '乌孜别克族',
        '俄罗斯族',
        '鄂温克族',
        '德昂族',
        '保安族',
        '裕固族',
        '京族',
        '塔塔尔族',
        '独龙族',
        '鄂伦春族',
        '赫哲族',
        '门巴族',
        '珞巴族',
        '基诺族',
        '其他'
    ]
]

/*根据进度生成小数*/
utils.getDecimal = (length) => {
    let temp = "";
    if (length === 0) return '1';
    for (let i = 0; i < length - 1; i++) {
        temp += "0"
    }
    return Number.parseFloat("0." + temp + "1")
}

//解析url参数
utils.parseUrlParam = (key, path) => {
    let hash = window.location.hash ? window.location.hash.split('?')[1] : '',
        search = window.location.search ? window.location.search.split('?')[1] : '';
    path = path ? path.split('?')[1] : ''

    const params = path || hash || search;

    if (params) {
        let items = params.split('&'),
            len = items.length,
            i = 0,
            obj = {};
        for (; i < len; i++) {
            const item = items[i].split('='),
                name = item[0],
                value = item[1] || '';
            obj[name] = decodeURIComponent(value);
        }
        if (!key) {
            return obj;
        }
        return obj[key];
    }
}

utils.parseParam = (param, key) => {
    let paramStr = ""
    Object.keys(param).forEach(function (key) {
        paramStr += (paramStr ? '&' : '') + key + '=' + param[key]
    });
    return paramStr;
};

/*获取当前时间之前的时间段*/
utils.getRangeDateBeforeNow = (day, format = 'YYYY-MM-DD') => {
    let now = new Date().getTime();
    let before = now - 3600 * 1000 * 24 * day;

    now = utils.formatDate(now)
    before = utils.formatDate(before)
    return {
        before,
        now
    }
}

utils.formatDate = value => {
    return formatDate(value, 'YYYY-MM-DD')
}
//格式化日期时间
utils.formatDateTime = (d) => {
    return _formatDate(d)
}
//过滤空值
utils.filterEmpty = (obj) => {
    _.forIn(obj, function (value, key) {
        !value && delete obj[key]
    });
    return obj
}

// 创建签名
utils.createSignature = (params => {
    let paramArray = [];
    for (let key in params) {
      paramArray.push(key);
    }
    paramArray.sort();
    let sortStr = "";
    for (let i = 0; i < paramArray.length; i++) {
      let key = paramArray[i];
      if ('' != params[key] && null != params[key] && undefined != params[key]) {
        sortStr = sortStr + key + "=" + params[key] + "&";
      }
    }
    sortStr = sortStr.substring(0, sortStr.lastIndexOf("&"));
    return md5.MD5(sortStr);
});

utils.parseQueryString = (url => {
    let arr, json = {};
    if (url.indexOf("?") == -1) {
      return json;
    }
    let str = url.split("?")[1];
    if (str.indexOf("&") != -1) {
      let iterms = str.split("&");
      for (let i = 0; i < iterms.length; i++) {
        arr = iterms[i].split("=");
        json[arr[0]] = arr[1];
      }
    } else {
      arr = str.split("=");
      json[arr[0]] = arr[1];
    }
    return json;
});

export default utils

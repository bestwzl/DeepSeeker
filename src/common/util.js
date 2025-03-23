import { createPinia } from 'pinia'
const pinia = createPinia()
import { useGlobalStore } from '../store/global'
const globals = useGlobalStore(pinia);

// 校验是否是json字符串
function isJsonString(str) {
    if (typeof str === 'string') {
        try {
        const obj = JSON.parse(str)
        if (typeof obj === 'object' && obj) {
            return true
        } else {
            return false
        }
        } catch (e) {
        return false
        }
    } else {
        return false
    }
}

function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time);
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    })
    return time_str;
}

// 获取路由参数
export function getUrlParams(){
    let currentUrl = window.location.search.substr(1).split("&");
    let urlParams = {}
    currentUrl.map((item , index)=>{
        let itemArr = item.split("=");
        urlParams[itemArr[0]] = itemArr[1];
    })
    return urlParams;
}

// 获取一个随机字符串
function getRandomKey() {
    const randomString = Math.random().toString(36).substring(2);
    return `${Date.now()}${randomString}`;
}

// 去除字符串中的空格
function removeStringSplice(str, type) {
    const sourceStr = str.toString() || '';
    let newString = sourceStr || '';
    if(type === 'left'){
        newString = sourceStr.replace(/^\s*/,""); // 左侧的
    } else if(type === 'right') {
        newString = sourceStr.replace(/(\s*$)/g,""); // 右侧的
    } else if(type === 'leftRight') {
        newString = sourceStr.replace(/^\s*|\s*$/g,""); // 两头的
    } else{
        newString = sourceStr.replace(/\s*/g,""); // 全部的
    }
    return newString;

}

// =============================== sessionStorage相关 ===================================
const prefix = 'boger_';
//添加 sessionStorage
export function setSessionItem(key, value) {
    globals.setLoginUserInfo(prefix+key, value);
    const session = window.sessionStorage;
    if(session){
        session.setItem(prefix+key, value);
    }
}
//获取 sessionStorage
export function getSessionItem(key) {
    const pValue = globals.getLoginUserInfo(prefix+key);
    const sValue = sessionStorage.getItem(prefix+key);
    return sValue || pValue;
}

//删除 sessionStorage
export function removeSessionItem(key) {
    globals.setLoginUserInfo(prefix+key, '');
    return sessionStorage.removeItem(prefix+key)
}

export function clearSessionAfterLogOut() {
    removeSessionItem("operatorTime"); // 清除时间
    removeSessionItem("operatorCode"); // 清除用户code
    removeSessionItem("operatorInfo"); // 清除用户code
    globals.setOperatorTime('');
    globals.setOperatorCode('');
    globals.setOperatorInfo('');
}

const commonUtils = {
    isJsonString: function(str){
        return isJsonString(str)
    },
    // 去除字符串中的空格
    removeStringSplice: function(str, type){
        return removeStringSplice(str, type)
    },
    getRandomKey: function () {
        return getRandomKey()
    },
    parseTime: function (time, cFormat) {
        return parseTime(time, cFormat)
    },
    getUrlParams: function () {
        return getUrlParams()
    },
    setSessionItem: function (key, value) {
        return setSessionItem(key, value)
    },
    getSessionItem: function (key) {
        return getSessionItem(key)
    },
    removeSessionItem: function (key) {
        return removeSessionItem(key)
    },
    clearSessionAfterLogOut: function(){
        return clearSessionAfterLogOut()
    },
}
export {
    commonUtils
}


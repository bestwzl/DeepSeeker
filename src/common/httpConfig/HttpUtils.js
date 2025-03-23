// 配置请求方法

// import Vue from 'vue'
import axios from "axios";
import { urlUtils } from "./apiConfig";
import { commonUtils } from "../util";


/**
 * 拦截请求数据，在请求开始的时候展示loading
 **/
// import { urlConfig } from './ipConfig';
// const baseURL = `${urlConfig.baseUrl}`;
// axios.defaults.baseURL = baseURL; // 会在传入的url前边拼接上这个baseURL

// axios.defaults.baseURL = ''; // 会在传入的url前边拼接上这个baseURL

/**
 * 每次发送请求的时候拦截请求
 */
axios.interceptors.request.use(
  function (config) {
    const newTime = new Date().getTime();
    commonUtils.setSessionItem("operatorTime", newTime);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * 拦截响应
 */
const errMsg = {
  400: "请求错误(400)",
  401: "请重新登录(401)",
  403: "拒绝访问(403)",
  404: "请求出错(404)",
  408: "请求超时(408)",
  409: "dataset被引用(409)", // 自定义
  500: "服务器错误(500)",
  501: "服务未实现(501)",
  502: "网络错误(502)",
  503: "服务不可用(503)",
  504: "网络超时(504)",
  505: "HTTP版本不受支持(505)",
};
axios.interceptors.response.use(
  function (response) {
    if (response.data.code === 401) {
      commonUtils.clearSessionAfterLogOut();
    }
    return response;
  },
  function (err) {
    if (err && err.response) {
      if (err.response.status === 401) {
        err.message = "token失效，请重新登录(401)";
        commonUtils.clearSessionAfterLogOut();
      } else {
        err.message =
          errMsg[err.response.status] || `连接出错(${err.response.status})!`;
      }
    } else {
      if (err && err.message.includes("timeout")) {
        // 判断请求异常信息中是否含有超时timeout字符串
        err.message = "网络连接超时"; // reject这个错误信息
      } else {
        err.message = "连接服务器失败!";
      }
    }
    return Promise.reject(err);
  }
);

// 拼接参数
function splicingUrlString(baseUrl, obj) {
  let pageUrl = baseUrl;
  for (let key in obj) {
    if (obj[key] && obj[key] !== "undefined" && obj[key] !== "null") {
      pageUrl = pageUrl + `${encodeURIComponent(obj[key])}`;
    }
  }
  return pageUrl;
}

// 获取完整请求路径带参数
function getUrl(url, params = {}) {
  let targetUrl = url;
  if (url.indexOf("http") === -1 && !url.includes("/apis")) {
    targetUrl = params
      ? splicingUrlString(urlUtils[url], params)
      : urlUtils[url];
  }
  return targetUrl;
}

// 获取token
function getTokenParams(operatorInfo) {
  const { token } = operatorInfo;
  return token;
}

// 如果有公共参数，可以在这里加入
function setPublicParams(operatorInfo, data) {
  const { userId } = operatorInfo;
  console.log('请求数据：：：：：：：',{userId, ...data})
  return {
    userId,
    ...data,
  }
}

// 请求方法
const myRequest = (method, url, data, header = {}, params = {}) => {
  const operatorInfoStr = commonUtils.getSessionItem("operatorInfo") || "{}";
  const operatorInfo = JSON.parse(operatorInfoStr);
  let targetMethod = method;
  let contentType = "application/json;charset=UTF-8";
  let getParams = {};
  if (method === "formData") {
    targetMethod = "post";
    contentType = "multipart/form-data";
  }
  if (method === "get") {
    getParams = data;
  }
  return new Promise((resolve, reject) => {
    axios({
      method: targetMethod,
      url: getUrl(url, params),
      headers: Object.assign(
        {
          timeout: 30 * 1000,
          Authorization: getTokenParams(operatorInfo),
          "Content-Type": contentType, // 默认
        },
        header
      ),
      params: {
        ...getParams,
      },
      data: setPublicParams(operatorInfo, data)
    })
      .then(
        (promiseData) => {
          if (promiseData.status && promiseData.status === 200) {
            resolve(promiseData.data);
          } else {
            reject(promiseData);
          }
        },
        (e) => {
          reject(e);
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 暴露请求方法
 * url 请求的链接
 * data 请求的数据
 * header 自定义请求头
 * params 需要拼接在路由后边的参数例如:https://www.unicom.cn/udt/dst/user/wuzl91 中的‘/dst/user/wuzl91’部分，不是由‘？’后边拼接的
 */
const httpRequest = {
  post: (url, data, header = {}, params = {}) => {
    return myRequest("post", url, data, header, params);
  },

  get: (url, data, header = {}, params = {}) => {
    return myRequest("get", url, data, header, params);
  },

  put: (url, data, header = {}, params = {}) => {
    return myRequest("put", url, data, header, params);
  },

  delete: (url, data, header = {}, params = {}) => {
    return myRequest("delete", url, data, header, params);
  },

  formData: (url, data, header = {}, params = {}) => {
    return myRequest("formData", url, data, header, params);
  }

}

export { httpRequest };

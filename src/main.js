import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import { createPinia } from 'pinia';

import './style.css';
import "vant/lib/index.css";


import { commonUtils } from "./common/util"; // 公用方法
import { httpRequest } from "./common/httpConfig/HttpUtils"; // 公用方法
import constants from "./common/constants"; // 常量枚举
// import eventBus from "./common/eventBus.js"; // 按需引用的事件总线部分

// const { busEmit, busOn, busOff } = eventBus();



const myApp = createApp(App);
const pinia = createPinia();
// 添加全局方法
myApp.config.globalProperties.$constants = constants; // 常量
myApp.config.globalProperties.$commonUtils = commonUtils; // 将公用方法放进全局
myApp.config.globalProperties.$httpRequest = httpRequest; // 将网络请求模块添加进全局
// myApp.config.globalProperties.$eventBus = { busEmit, busOn, busOff }; // 将事件总线加到全局

// 这样也可以全局注入一个变量， 在组件中使用inject 就可以拿到了。
// myApp.provide('$echarts', echarts);

myApp.use(router).use(pinia).mount("#app");

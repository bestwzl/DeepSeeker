/**
 * 配置不同环境下的请求地址
 * @type {string}
 */

const env = import.meta.env.VITE_CURRENTMODE || 'DEV';
console.log("当前环境："  , import.meta.env);


const GlobalConfig = {
    DEV: {
        env: 'DEV',
        baseUrl: '/apiproxy',  // 走代理
    },
    PROD: {
        env: 'PROD',
        baseUrl: '/apiproxy', // 生产环境
        // baseUrl: 'https://api.deepseek.com', // 生产环境
    },
}

const urlConfig = GlobalConfig[env];

export {
    urlConfig,
    env
}

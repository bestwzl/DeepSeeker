import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { // Vite 的代理配置语法与常见的 Webpack 或 Vue CLI 略有不同。 后两者不需要 server:{}
    proxy: {
      '/apiproxy': {
        target: 'http://192.168.10.198:9999', // 本地flask
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        rewrite: (path) => path.replace(/^\/apiproxy/, ""), // 这里重写路径
      }
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
  // 文件名加上hash 避免cdn缓存。
  chainWebpack: config => {
    config.output.filename('[name].[hash:6].js').end();
    config.output.chunkFilename('[name].[hash:6].js').end();
  }
})

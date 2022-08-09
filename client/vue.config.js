const path = require("path");
const debug = process.env.NODE_ENV !== "production";
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/", //跟域上下文目录
  outputDir: "dist", //构建输出目录
  assetsDir: "assets", //静态资源目录（js，css，img，fonts）
  runtimeCompiler: true, //运行时版本是否需要编译
  productionSourceMap: true, //是否在构建生产包时生成sourceMap文件，false将提高构建速度
  transpileDependencies: true,
  configureWebpack: (config) => {
    //webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      //开发环境配置
      config.devtool = "eval-cheap-module-source-map";
    } else {
      //生产环境配置
    }
  },
  chainWebpack: (config) => {
    //webpack链接API，用于生成和修改webpack配置
    if (debug) {
      //本地开发配置
    } else {
      //生产开发配置
    }
  },
  parallel: require("os").cpus().length > 1,
  pluginOptions: {
    //第三方插件配置
  },
  pwa: {
    //单页插件相关配置
  },
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: true,
    // openPage: "about",
    hot: true,
    // disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000/api",
        ws: true,
        changeOrigin: true,
        // secure: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});

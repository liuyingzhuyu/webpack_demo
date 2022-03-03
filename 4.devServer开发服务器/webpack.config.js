
const { resolve} = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                'style-loader',// 创建style标签，把css块导入到style标签中
                'css-loader',// 把css转成css块
              ]
          },
          {
            //排除其他文件
            exclude: /\.(js|css|html)$/,
            use: [
              'file-loader',
            ]
        }
      ]
    },
    plugins:[
        new htmlWebpackPlugin({
           template: './src/index.html',// 设置模板
           filename: 'a.html',//设置打包生成的html的文件名
        })
    ],
    mode: 'development',
    // 开发服务器 用来自动化（自动化编译、自动化打开浏览器、自动化刷新）
    // 特点：只在内存中打包，不会有任何输出
    devServer:{
      contentBase: resolve(__dirname,'build'),// 设置打包后的文件路径
      compress: true,//gzip压缩
      port:3003,// 端口
      open: true,// 自动打开浏览器
    }
}
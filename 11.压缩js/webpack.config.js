
const { options } = require('less')
const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),// __dirname 当前目录绝对路径
    },
    // loader配置
    module: {
    },  
    // plugin（插件）配置
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    // mode: 'development',
    // 生产环境下会自动压缩js代码
    mode: 'production'
}
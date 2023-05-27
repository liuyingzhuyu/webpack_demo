
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
        rules: [
            /*
             js兼容性处理 babel-loader @babel/core 
               1. 基本兼容处理 @babel/preset-env
                 问题：只能转换基本语法，如promise高级语法不能转换
               2.全局js兼容处理 -->@babel/polyfill
               问题：只解决部分兼容性问题，但是所有兼容性代码全部引入，体积太大
               3.按需加载--> core-js
            */
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                options: {
                    //预设置一组插件来便捷的使用这些插件所提供的功能
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js版本
                                corejs: {
                                    version: 3,
                                },
                                // 指定兼容性做到那个浏览器版本
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    safari: '11.1',
                                    ie: '9',
                                    edge:'17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    // plugin（插件）配置
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // mode: 'production'
}
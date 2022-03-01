
/*
loader: 安装  ----> 使用
plugin：安装----->引入-----> 使用
*/

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 设置html 文件模板
module.exports = {
    // 入口
    entry: './src/index.js',
    // 打包出口
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build")
    },
    // loader
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {

                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader', // 安装两个loader url-loader和file-loader
                        options: {
                            limit: 8192,
                        },
                    },
                ],

            }
        ]
    },
    // 插件
    plugins: [
        // new HtmlWebpackPlugin() //  创建一个空的html，并引入打好的包
        new HtmlWebpackPlugin({
            template: './src/index.html',// 打包模板
            filename: 'a.html',// 打完包的文件名（build下的文件名）
        })
    ],
    // 环境
    mode: 'development'
}
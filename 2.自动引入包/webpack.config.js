

const { resolve} = require('path')

const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',// 出口文件名
        path: resolve(__dirname,'build'),// 设置出口文件路径、文件目录 
    },
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
            {// 不能打包html标签里的图片路径，只能打包css里的图片路径
                test: /\.(jpg|jpeg)$/,
                loader: "url-loader",// 使用一个loader，可以用loader配置项； 需要安装url-loader、 file-loader 两个loader
                options:{ 
                    // 小于limit的文件，打包成base64的格式 
                    //优点：减少请求数量缺点：增加包的体积； 一般限制8-12kb的图片打包成base64的格式
                   limit: 40* 1024,
                }
            },
            {//打包html标签里的图片路径,比如img标签等
                test: /\.html$/,
                loader: "html-loader",
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',// 设置html模板
            filename: 'b.html',//设置文件名
        })
    ],
    mode: 'development'
}
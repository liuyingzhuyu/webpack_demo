
const { options } = require('less')
const {resolve}  = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build'),// __dirname 当前目录绝对路径
    },
    // loader配置
    module: {
        rules:[
            /*
            语法检查 eslint eslint-loader
            注意：只检查自己写的原代码，第三方的库是不用检查的
            设置检验规则： 
            pakage.json中的eslintConfig
                "eslintConfig": {
                    "extends": "airbnb-base"
                }
            airbnb 规则-->eslint eslint-config-airbnb-base  eslint-plugin-import
            */
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除
                loader: 'eslint-loader',
                options:{
                    fix: true,// 自动修复eslint错误
                }
            },
            
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
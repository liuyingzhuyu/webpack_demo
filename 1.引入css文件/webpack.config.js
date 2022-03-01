
const {resolve}  = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build'),// __dirname 当前目录绝对路径
    },
    // loader配置
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    // use中数组的执行顺序，从右向左，从下到上
                    // 创建style标签，把js中的样式插入进去，添加到head中生效
                   'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                   'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // use中数组的执行顺序，从右向左，从下到上
                    // 创建style标签，把js中的样式插入进去，添加到head中生效
                   'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                   'css-loader',
                   // 将less文件变成转成css文件
                   'less-loader',
                ]
            },
        ]
    },
    // plugin（插件）配置
    plugins: [

    ],
    mode: 'development',
    // mode: 'production'
}

const {resolve}  = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',// js放到js文件夹下
        path: resolve(__dirname,'build')
    },
    module: {
      rules:[
          // 处理css
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          // 处理less
          {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        // 处理图片
        {
            test: /\.(jpg|jpeg|png|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 8* 1024,
                name: '[hash:10].[ext]',//文件名规则： hash取10位，后面接文件后缀名
                esModule: false,// 关闭es6模块化
                outputPath: 'imgs',// 图片放到imgs文件夹下
            }
        },
        // 处理html中的img资源
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        // 处理其他资源，如字体图标icon
        {
           exclude: /\.(css|js|less|html|jpg|png|jpeg)$/,
           loader: 'file-loader',
           options: {
               name: '[hash:10].[ext]',//文件名规则： hash取10位，后面接文件后缀名
               outputPath: 'media',//其他资源放到media文件夹下
           }
        }
      ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    mode: 'development',
    devServer: {
     contentBase: resolve(__dirname,'build'),// 启动文件夹
     compress: true,//gzip压缩
     open: true,
     port: 3003
    }
}
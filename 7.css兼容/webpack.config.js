
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = 'development'
console.log(process.env.NODE_ENV ,'process.env.NODE_ENV ');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build'),
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,// 取代style-loader，提取css成单独文件
                    'css-loader',
                    /* 
                      css兼容处理： postcss ===> postcss-loader (帮助postcss在webpack中使用) postcss-preset-env(postcss识别环境，兼容性精确到摸一个浏览器的版本)
                      postcss-preset-env帮助postcss找到pakage.json里的browserslist配置，通过配置加载指定的css配置项
                        "browserslist": {
                            "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            "production": [
                            ">0.1%",// 兼容市场上99.9%的浏览器
                            "not dead",// 不兼容淘汰的浏览器
                            "not op_mini all"// 不兼容欧朋mini
                            ]
                        }
                    */
                    // 默认使用
                    // 'postcss-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: ()=> [
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',// 对生成的css文件重命名
        }),
    ],
    mode: 'development',

}
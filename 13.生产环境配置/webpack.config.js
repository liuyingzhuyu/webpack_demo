
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //提取css到单独文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const htmlWebpackPlugin = require('html-webpack-plugin') //设置html模板

// css 公共处理loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader, // 提取css到单独文件
    'css-loader',// 把css打包到js中
    {
        // 还需要在pakage.json中配置browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => {
                require('postcss-preset-env')()
            }
        }
    } // 为css添加兼容
]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),// __dirname 当前目录绝对路径
    },
    // loader配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    ...commonCssLoader
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    'less-loader' // 把less解析为css
                ]
            },
            /**
            * 正常来讲，一个文件只能被一个loader处理
            * 当一个文件被多个loader处理，那么一定要指定loader执行的先后顺序；
            * 先执行eslint再执行babel
            * 原因一：eslint 是做语法检查的，如果语法出错，后面就不用解析了；
            * 原因二： babel会将es6转化为es5语法，一旦转换完后在经过eslint检查，会报语法错误，var等语法不能用   
            * enforce: 'pre',// js文件优先执行这个loader
           */
            {
                // 还需要在pakage.json中配置eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',// js文件优先执行这个loader
                loader: 'eslint-loader',// 检查js规范
                options: {
                    fix: true,
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',// 检查js兼容
                options: {
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
                                    firefox: '50'
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs/',
                    esModule: false, // 关闭es6 module
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',// 处理html中的图片，使用的commonjs

            },
            {
                // 处理其他文件，原封不动输出
                exclude: /\.(js|css|html|jpg|png|gif)$/,// 排除这些格式的文件
                loader: 'file-loader',// 处理html中的图片，使用的commonjs
                options: {
                    outputPath: 'media',
                }
            },
        ]
    },
    // plugin（插件）配置
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new htmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html
            minify: {
                //移除空格
                collapseWhitespace: true,
                //删除注释
                removeComments: true,
            }
        })
    ],
    // mode: 'development',
    // 生产环境下会自动压缩js代码
    mode: 'production'
}
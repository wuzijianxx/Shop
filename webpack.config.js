const path = require('path')
//第二步
const webpack = require('webpack')
//插件的两个作用
//1.自动把内存中根据指定页面生成一个内存的页面
//2.自动打包好的bundle.js追加到页面中
const HtmlWebpackPlugin = require('html-webpack-plugin')

//vue-loader@15.以后的版本必须带有VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')



// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

// const HOST = process.env.HOST
// const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口 要使用webpack 打包哪个文件
    output: {
        path: path.join(__dirname, './dist'), // 指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' //指定输出的文件的名称
    },
    //开发服务器，实时重新加载
    // devServer: {
    //   open: true,
    //   port:3000,
    //   contentBase:'src',
    //   hot:true  //第一步
    // },
    plugins: [
        //启用自动打开 第三部
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定 模板页面，将来
            //会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' //指定生成的页面的名称
        }),

        new VueLoaderPlugin()
    ],
    module: { //这个节点，用于配置所有第三方模块加载器
        rules: [ //所有第三方模块的匹配规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            //配置处理.css文件的第三方loader规则
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=53556&name=[hash:8]-[name].[ext]'
                //limit 图片大小  小于就不是base64 大于就是base64
                //name 图片本身名字  hash前八位 区分一样的名字
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
        ]
    },
    resolve: {
        alias: { //修改 vue被导入时候的包的路径
            // "vue$": 'vue/dist/vue.js'
        }
    }

}

//--contentBase src 默认进哪个网页
// module.exports = {
//     // 多入口，根据入口起点名称动态生成bundle名称
//     entry: {
//       app: './src/main.js',
//     },
//     // 开发服务器，实时重新加载
//     devServer: {
//       contentBase: './dist'
//     },
//     plugins: [
//       // 每次构建前清理dist文件夹
//       new CleanWebpackPlugin(['dist']),
//       // html-webpack-plugin插件默认生成index.html文件
//       new HtmlWebpackPlugin({
//         title: 'Document'
//       })
//     ],
//     output: {
//       filename: '[name].bundle.js',
//       path: path.resolve(__dirname, 'dist')
//     }
//   }
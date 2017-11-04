const path = require('path'); // 操作路径如生成绝对路径
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 用来提取单独的打包文件的插件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 用来清除目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 用来在html引入动态打包的文件 如有hash值文件的插件

// webpack认为一切皆模块 但是webpack本身只认识js 所以loader的作用就是使webpack可以认识别的类型文件css，sass，less，img 使webpack可以按模块的方式处理它们
// plugin则是在webpack整个构建过程中都起作用的 拓展webpack功能的插件

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             }
//         ]
//     }
// };


// module.exports = {
//     entry: { // 多入口文件配置 filename参数指定了打包后文件的名字，不写默认打包后叫main 因为extract-text-webpack-plugin插件一个入口只会提取出一个文件 所以想less生成的css是独立的需要多入口（可能还有别的情况需要多入口）
//         'index': './src/js/index.js',
//         'storyMarket_v4': './src/less/entry_storyMarket_v4.js',
//         'storyMarket_v5': './src/less/entry_storyMarket_v5.js',
//         'storyMarket_v6': './src/less/entry_storyMarket_v6.js'
//     },
//     output: {
//         filename: '[name]_[chunkhash:8].js', // 注意output的filename的hash写法
//         path: path.resolve(__dirname, 'dist') // 建议配置为绝对路径（相对路径不会报错）还可以在 path 中用使用 [hash] 模板
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ExtractTextPlugin.extract({
//                     fallback: "style-loader",
//                     use: "css-loader"
//                 })
//             },
//             {
//                 test: /\.less$/,
//                 use: ExtractTextPlugin.extract({
//                     fallback: "style-loader",
//                     use: ['css-loader', 'less-loader']
//                 })
//             }
//         ]
//     },
//     plugins: [
//         new CleanPlugin('dist'), // 删除文件夹
//         new ExtractTextPlugin({
//             filename: './css/[name]_[contenthash:8].css', // hash取了8位
//             allChunks: false, // 设为false即不把文件打包成一个文件 true就是打包成一个 看文档
//             disable: false
//         }),
//         // new webpack.optimize.CommonsChunkPlugin({})
//     ]
// };


// 当有不同的文件类型或不同的策略需要ExtractTextPlugin提取时，
// 应该生成多个ExtractTextPlugin实例可以使用不同的配置，并且不同的ExtractTextPlugin的实例可以使用不同的loader
// 震惊ExtractTextPlugin的配置项里的filename可以是function，通过默认传入的getPath方法，可以修改提取出的文件路径 可以加逻辑
// const extractCSS = new ExtractTextPlugin({
//     filename: function (getPath) {
//         if (1) {
//             var url = '../css/';
//             return getPath(url + '[name]_[contenthash:8].css');
//         }
//     },
//     allChunks: true, // 注意这里是true
//     disable: false
// });
// const extractLESS = new ExtractTextPlugin({
//     filename: '../css/[name]_[contenthash:8].css',
//     allChunks: false,
//     disable: false
// });
// const extractSCSS = new ExtractTextPlugin({
//     filename: '../css/[name]_[contenthash:8].css',
//     allChunks: false,
//     disable: false
// });
// module.exports = {
//     entry: {
//         'index': './src/js/index.js',
//         'storyMarket_v4': './src/less/entry_storyMarket_v4.js',
//         'storyMarket_v5': './src/less/entry_storyMarket_v5.js',
//         'storyMarket_v6': './src/less/entry_storyMarket_v6.js',
//         'zx': './src/css/entry_zx.js'
//     },
//     output: {
//         filename: '[name]_[chunkhash:8].js',
//         path: path.resolve(__dirname, 'dist/js')
//     },
//     devtool: 'inline-source-map', // 利用sourceMap追踪打包到一个文件里的各个模块，这样如果报错，报错来源可以正确指向源文件，而不是打包后的js，有多种工具可选
//     devServer: {
//         contentBase: './views'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: extractCSS.extract({
//                     fallback: "style-loader",
//                     use: ["css-loader"]
//                 })
//             },
//             {
//                 test: /\.less$/,
//                 use: extractLESS.extract({
//                     fallback: "style-loader",
//                     use: ['css-loader', 'less-loader']
//                 })
//             },
//             {
//                 test: /\.scss$/,
//                 use: extractSCSS.extract({
//                     fallback: "style-loader",
//                     use: ['css-loader', 'sass-loader']
//                 })
//             }
//         ]
//     },
//     plugins: [
//         new CleanWebpackPlugin(['dist']), // 可以传入数组啊
//         new HtmlWebpackPlugin({ // 这个插件默认会生成一个新的index.html放到打包后的目录里，在这个html中会引用全部的入口文件，及入口文件中引入的文件，及入口文件抽离出来的文件
//             title: 'Output Management',
//             filename: '../../views/index_bundle.html', // 输出目录相对于output的输出目录
//             hash: true, // 它会给html引入的问价添加hash
//             chunks: ['index', 'storyMarket_v4']
//         }),
//         extractCSS,
//         extractLESS,
//         extractSCSS
//     ]
// };






const webpack = require('webpack'); // 注意使用CommonsChunkPlugin需要引入这个，之前没用过
const extractCSS = new ExtractTextPlugin({
    filename: function (getPath) {
        if (1) {
            var url = '../css/';
            return getPath(url + '[name]_[contenthash:8].css');
        }
    },
    allChunks: true,
    disable: false
});
const extractLESS = new ExtractTextPlugin({
    filename: '../css/[name]_[contenthash:8].css',
    allChunks: false,
    disable: false
});
const extractSCSS = new ExtractTextPlugin({
    filename: '../css/[name]_[contenthash:8].css',
    allChunks: false,
    disable: false
});
module.exports = {
    devtool: 'inline-source-map',
    entry: {
        another: './src/js/another-module.js', // 一个额外的模块，它里面也依赖lodash和index一样，不用CommonsChunkPlugin的话，相同的依赖会被打包两次
        index: './src/js/index.js',
        storyMarket_v4: './src/less/entry_storyMarket_v4.js',
        storyMarket_v5: './src/less/entry_storyMarket_v5.js',
        storyMarket_v6: './src/less/entry_storyMarket_v6.js',
        zx: './src/css/entry_zx.js'
    },
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist/js')
    },
    devServer: {
        contentBase: './views'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename: '../../views/index_bundle.html',
            hash: true,
            chunks: ['index', 'storyMarket_v4']
        }),
        extractCSS,
        extractLESS,
        extractSCSS,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lalala', // 指定提取出来的公共包名, 与filename定死名称不同，这个name值可用于拼接hash之类的，类似[name]
            filename: 'common.js',
            minChunks: 2, // 注意不加这个不起作用，这个参数指定模块被引用几次，才会被移动到公共模块，要大于等于2，不加这个不起作用
            // chunks: ['another', 'index'] // 注意，这个是指定哪些模块的公共模块会被打包到公共模块，省略默认全部模块，一开始没写这个option，不知道为啥，CommonsChunkPlugin没有起作用 （没用上面的minChunks参数）
        }),
    ]
};
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");




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
const extractCSS = new ExtractTextPlugin({
    filename: './css/[name]_[contenthash:8].css',
    allChunks: false,
    disable: false
});
const extractLESS = new ExtractTextPlugin({
    filename: './css/[name]_[contenthash:8].css',
    allChunks: false,
    disable: false
});


module.exports = {
    entry: {
        'index': './src/js/index.js',
        'storyMarket_v4': './src/less/entry_storyMarket_v4.js',
        'storyMarket_v5': './src/less/entry_storyMarket_v5.js',
        'storyMarket_v6': './src/less/entry_storyMarket_v6.js',
        'zx': './src/css/entry_zx.js'
    },
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist')
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
                    fallback: "",
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new CleanPlugin('dist'),
        extractCSS,
        extractLESS
    ]
};
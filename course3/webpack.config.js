
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 用来在html引入动态打包的文件 如有hash值文件的插件

// webpack认为一切皆模块 但是webpack本身只认识js 所以loader的作用就是使webpack可以认识别的类型文件css，sass，less，img 使webpack可以按模块的方式处理它们
// plugin则是在webpack整个构建过程中都起作用的 拓展webpack功能的插件


const path = require('path'); // 操作路径如生成绝对路径
const webpack = require('webpack'); // 注意使用CommonsChunkPlugin需要引入这个，之前没用过
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 用来提取单独的打包文件的插件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 用来清除目录的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 用来优化压缩css （解决extract-text-webpack-plugin的css复制问题，不明白什么意思）
const ExtraneousFileCleanPlugin = require('webpack-extraneous-file-cleanup-plugin'); // 用来提取分离的css文件后，删除生成的对应的多余的css打包的js模块

// webpack使用插件需要实例化，因为可能在多处调用，所以每次使用都需要实例化，实例化的时候可以传入配置参数，但是如果都写在plugins数组里会看起来很乱，可以把实例化写在外面，用变量存储，plugins里调用的时候直接传入变量，这样好看点而且好加注释
const cleanDist = new CleanWebpackPlugin(['dist']);
const createHTMLwithbundle = new HtmlWebpackPlugin({
    title: 'Output Management',
    filename: '../../views/index_bundle.html',
    hash: true,
    chunks: ['index', 'storyMarket_v4']
});
const extractCSS = new ExtractTextPlugin({
    filename: function (getPath) {
        if (1) {
            var url = '../css/';
            return getPath(url + '[name]_[contenthash:8].css');
        }
    },
    allChunks: true,
    disable: false,

});
const extractLESS = new ExtractTextPlugin({
    filename: '../css/[name]_[contenthash:8].css',
    allChunks: true,
    disable: false
});
const extractSCSS = new ExtractTextPlugin({
    filename: '../css/[name]_[contenthash:8].css',
    allChunks: false,
    disable: false
});
const shareChunk = new webpack.optimize.CommonsChunkPlugin({
        name: 'lalala', // 指定提取出来的公共包名, 与filename定死名称不同，这个name值可用于拼接hash之类的，类似[name]
        filename: 'common.js',
        minChunks: 2, // 注意不加这个不起作用，这个参数指定模块被引用几次，才会被移动到公共模块，要大于等于2，不加这个不起作用
        // chunks: ['another', 'index'] // 注意，这个是指定哪些模块的公共模块会被打包到公共模块，省略默认全部模块，一开始没写这个option，不知道为啥，CommonsChunkPlugin没有起作用 （没用上面的minChunks参数）
    });
const optimizeCSSwithprocessor = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: {
            removeAll: true
        }
    },
    canPrint: true
});
const extraneousfilecleanplugin = new ExtraneousFileCleanPlugin({
    extensions: ['.js']
});

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        storyMarket_v4: './src/less/storyMarket_v4.less',
        storyMarket_v5: './src/less/storyMarket_v5.less',
        storyMarket_v6: './src/less/storyMarket_v6.less',
        another: './src/js/another-module.js', // 一个额外的模块，它里面也依赖lodash和index一样，不用CommonsChunkPlugin的话，相同的依赖会被打包两次
        index: './src/js/index.js',
        zx: './src/css/zx.css'
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
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true // 使用css预处理器的压缩，要在预处理器对应的test下对应的css-loader里配置minimize，如果只在test css里写minimize是没用的。
                        }
                    },{
                        loader: 'less-loader'
                    }]
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
        cleanDist,
        createHTMLwithbundle,
        extractCSS,
        extractLESS,
        extractSCSS,
        shareChunk,
        // optimizeCSSwithprocessor,
        // extraneousfilecleanplugin 有问题会报错
    ]
};
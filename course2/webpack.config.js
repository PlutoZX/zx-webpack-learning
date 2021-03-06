const env = process.env.NODE_ENV;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./public", // 本地服务器所加载的页面所在的目录
        port: "7777", // 端口号
        inline: true, // 实时刷新
        historyApiFallback: true, // 所有跳转指向index.html
    },
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // use: ['style-loader','css-loader'] // 这种简单的写成loader名数组的方式虽然简单但是有个问题，不能对单独的loader进行配置
                // use: ['css-loader', 'style-loader'] // 这个就会报错说明，loader加载器有顺序之分
                use: env === 'production'
                    ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true, // 启用css module
                                    localIdentName: '[path][name]__[local]-[hash:base64:5]', // css module 中类名的命名格式，path是该css文件所在目录，name是css文件名，local是该类名在css文件中的本名，hash是hash值
                                    minimize: true,
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                    : [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true, // 启用css module
                                localIdentName: '[path][name]__[local]-[hash:base64:5]', // css module 中类名的命名格式，path是该css文件所在目录，name是css文件名，local是该类名在css文件中的本名，hash是hash值
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
            }
        ]
    },
    plugins: env === 'production'
        ? [
            new ExtractTextPlugin({
                filename: '[name].css'
            }),
            new webpack.BannerPlugin('版权赵旋所有，我也是抄别人的学习中，欢迎翻版') // 这种插件webpack内置可以直接用不需要npm i 但是需要require(webpack)
        ]
        : []
};

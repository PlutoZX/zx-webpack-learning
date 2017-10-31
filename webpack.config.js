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
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    }


};
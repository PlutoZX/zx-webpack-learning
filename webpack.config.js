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
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }


};
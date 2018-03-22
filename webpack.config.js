const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const config = require('./config');

module.exports = {
    entry: [
        // index文件的入口，一般来说，入口只会处理js
        path.resolve(__dirname, './src/index.jsx')
    ],
    output: {
        // 打包的路径
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            exclude: /node_modules/,
            use: {
                // require.resolve解决路径问题，因为build文件可能在其它曾经的文件夹下
                loader: require.resolve("babel-loader"),
                // 配置放在.babelrc中
            }
        }, {
            test: /(\.jsx|\.js)$/,
            exclude: /node_modules/,
            use: {
                loader: require.resolve("eslint-loader"),
                // 配置放在.eslintrc.js中
            }
        }, {
            // 除了一些特殊的文件，其它的都通过file-loader打包
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.less$/,
                /\.css$/,
                /\.json$/,
                /\.bmp$/,
                /\.gif$/,
                /\.jpe?g$/,
                /\.png$/,
            ],
            use: {
                loader: require.resolve("file-loader"),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        }, {
            // 一些图片使用url-loader打包
            // 小于特定大小的图片会被直接转成base64
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            use: {
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        }, {
            // 解析less文件
            test: /\.less$/,
            // 使用多个loader
            use: [
                // 这两个loader没有额外配置
                {
                    loader: require.resolve("style-loader"),
                },
                {
                    loader: require.resolve("css-loader"),
                },
                {
                    loader: require.resolve("postcss-loader"),
                    options: {
                        // https://webpack.js.org/guides/migrating/#complex-options
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    // React doesn't support IE8 anyway
                                    'not ie < 9',
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                },
                {
                    loader: require.resolve("less-loader"),
                    options: {
                        // 别名定义
                        modifyVars: {
                            "@primary-color": "#404040"
                        },
                    },
                },
            ]
        }, {
            // 这里要排除第三方库
            // css的处理
            // 和less一样，先用预处理，然后回到css，回到style
            test: /\.css$/,
            exclude: [
                // 目前规定，在libs下的就是第三方库
                 /\/libs\/.*\.css$/,
            ],
            use: ExtractTextPlugin.extract(
                Object.assign({
                        fallback: require.resolve('style-loader'),
                        use: [{
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    minimize: true,
                                    sourceMap: false,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                // React doesn't support IE8 anyway
                                                'not ie < 9',
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                        ],
                    },
                    // 暂时配置为空
                    {}
                )
            ),
        }, {
            // 第三方库的css处理，不进行postcss，不进行压缩
            // 目前规定，在libs下的就是第三方库
            test: /\/libs\/.*\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: require.resolve('style-loader'),
                use: [{
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        minimize: false,
                        sourceMap: false,
                    },
                }],
            }),
        }]
    },
    // 需要在模块导入时进行自己的别名转换，否则jsx可能无法导出
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        // 自动基于模板，生成最终引入了脚本后的页面
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: './dist/bundle.js',
        }),
        // 这样会定义，所有js文件中通过require引入的css都会被打包一个css
        // 默认这个css命名为对应文件
        new ExtractTextPlugin({
            filename: function(getPath) {
                let fullName = "[name]-[contenthash:8].css";

                fullName = 'static/css/' + fullName;

                return getPath(fullName);
            }
        }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin()
    ],
    // 服务器相关配置
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        //content-base就是 codeResource -需要监听源码
        contentBase: './src',
        watchContentBase: true,
        // 默认的服务器访问路径，这里和配置中一致，需要提取成纯粹的host:ip
        public: /https?:\/\/([^\/]+?)\//.exec(config.publicPath)[1]
    },
};
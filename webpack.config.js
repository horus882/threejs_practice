// const ip = require('internal-ip')
// const portFinderSync = require('portfinder-sync')

// const infoColor = (_message) => {
//     return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
// }

const path = require('path')
const CopyWebpackPlugin      = require('copy-webpack-plugin')
const HtmlWebpackPlugin      = require('html-webpack-plugin')
const MiniCSSExtractPlugin   = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// let fs = require('fs');
// const header = fs.readFileSync(__dirname + '/src/include/header.html');

module.exports = {
    target: 'web',
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, './src'),
    entry: {
        sample: ['./js/sample.js'],
        lv1: ['./js/lv1.js'],
        lv2: ['./js/lv2.js'],
        lv4: ['./js/lv4.js'],
        lv5: ['./js/lv5.js'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[contenthash].js',
    },
    devtool: 'source-map',
    module: {
        rules:
        [

            // HTML
            // {
            //     test: /\.(html)$/,
            //     use: ['html-loader']
            // },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        grid: 'autoplace',
                                    })
                                ]
                            }
                        },
                    },
                ]
            },

            // SASS
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        grid: 'autoplace',
                                    })
                                ]
                            }
                        },
                    },
                    'sass-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options:
                    //     {
                    //         name: '[name].[hash:6].[ext]',
                    //         outputPath: 'assets/images/',
                    //         publicPath: 'assets/images/',
                    //         emitFile: true,
                    //         esModule: false
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: false,
                            // esModule: false,
                            name: '[path][name].[ext]?[hash:8]',
                            context: path.resolve(__dirname, 'src'),
                            publicPath: '../',
                            fallback: require.resolve('file-loader'),
                            // outputPath: './'
                        }
                    },
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },

            // Models
            {
                test: /\.(obj|fbx|mtl|gltf|bin)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            name: '[name].[ext]',
                            outputPath: 'assets/models/',
                            publicPath: 'assets/models/',
                        }
                        // options:
                        // {
                        //     outputPath: 'assets/models/'
                        // }
                    }
                ]
            }

        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, './static') }
            ]
        }),
        new MiniCSSExtractPlugin({
            filename: './css/style.css?[hash:6]'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/sample.html'),
            inject: 'body',
            chunks: ['sample'],
            filename: 'sample.html',
            minify: {
                removeRedundantAttributes: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/lv1.html'),
            // minify: true,
            inject: 'body',
            chunks: ['lv1'],
            filename: 'lv1.html',
            minify: {
                removeRedundantAttributes: false
            }
            // header: header
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/lv2.html'),
            inject: 'body',
            chunks: ['lv2'],
            filename: 'lv2.html',
            minify: {
                removeRedundantAttributes: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/lv4.html'),
            inject: 'body',
            chunks: ['lv4'],
            filename: 'lv4.html',
            minify: {
                removeRedundantAttributes: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/lv5.html'),
            inject: 'body',
            chunks: ['lv5'],
            filename: 'lv5.html',
            minify: {
                removeRedundantAttributes: false
            }
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 7777,
        // contentBase: './dist',
        contentBase: path.join(__dirname, '/'),
        watchContentBase: true,
        open: true,
        https: false,
        useLocalIp: true,
        hot: true
        // disableHostCheck: true,
        // overlay: true,
        // noInfo: true,
        // after: function(app, server, compiler)
        // {
        //     const port = server.options.port
        //     const https = server.options.https ? 's' : ''
        //     const localIp = ip.v4.sync()
        //     const domain1 = `http${https}://${localIp}:${port}`
        //     const domain2 = `http${https}://localhost:${port}`
            
        //     console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)
        // }
    }
}

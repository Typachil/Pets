const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(jpg|jpeg|gif|mp3)$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [{ removeTitle: false }],
                                floatPrecision: 2,
                            },
                        },
                    },
                ],
            }
        ],
    },
};

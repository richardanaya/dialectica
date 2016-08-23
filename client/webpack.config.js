var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

    module.exports = [{
        entry: './entry.js',
        output: {path: __dirname, filename: '../static/app.js'},
        devtool: 'source-map',
        module: {
                loaders: [
                    {
                        test: /.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    },
                    {
                        test: /\.less$/,
                        loader: "style!css!less"
                    }
                ]
            }
    }];

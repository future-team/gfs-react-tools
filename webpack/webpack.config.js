var path = require('path');
var webpack = require('webpack');
var config = require('../package.json');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var es3ifyPlugin = require('es3ify-webpack-plugin');

var ent = {
    example: [path.join(process.cwd(), 'example/src/index.jsx')]
};
ent[config.name] = [path.join(process.cwd(), 'src/index.jsx')];
module.exports = {
    entry: ent,
    resolve: {
        modulesDirectories: [
            'node_modules',
            'bower_components',
            'lib'
        ],
        extensions: ["", ".js", ".ts", ".tsx", ".jsx"]
    },
    output: {
        libraryTarget: 'umd',
        library: 'RTools',
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js'
    },
    externals: [{
        "jquery": {
            "root": "$",
            "commonjs2": "jquery",
            "commonjs": "jquery",
            "amd": "jquery"
        },
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    }],
    module: {
        preLoaders: [{
            test: /\.(jsx|es6|js)$/,
            loaders: ['eslint-loader'],
            exclude: /node_modules/
        }],
        loaders: [{
                test: /\.(jsx|es6|js)$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                //style-loader!css-loader!less-loader
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.css/,
                //style-loader!css-loader!less-loader
                loader: ExtractTextPlugin.extract("css?-restructuring")
            },
            {
                test: /\.html$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.(mp3|ogg|wav|swf)\??.*$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=35000'
            }
            /*,
                         {
                         test: /\.less$/,
                         loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                         },*/
        ]
    },
    plugins: [
        new ExtractTextPlugin(config.name + ".css", {
            disable: false,
            allChunks: true
        }),
        new es3ifyPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
        /*,
                 new webpack.DefinePlugin({
                 'process.env':{
                 'NODE_ENV': JSON.stringify('production')
                 }
                 })*/
        //new webpack.optimize.CommonsChunkPlugin('common.js')
        //new ExtractTextPlugin(path.join(config.name+'.css'))
    ]
};
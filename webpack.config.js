const path = require('path');
const webpack = require('webpack');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './app/app.module.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: './dist/[name].js',
        path: path.join(__dirname)
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        ),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: './dist'
            }
        }),
        new CopyWebpackPlugin([
            {
                from: {
                    glob: './**/*.html',
                    dot: true
                },
                to: './dist',
                ignore: [
                    {
                        dots: true,
                        glob: 'node_modules/**/*'
                    },
                    {
                        dots: true,
                        glob: 'dist/**/*'
                    }
                ]
            }
        ])
    ]
};
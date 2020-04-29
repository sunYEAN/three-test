const path = require('path');
const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');

function getEntries(path) {
    const temp = glob.sync(path);
    const entries = {};
    temp.forEach(item => {
        const name = item.split('/').slice(-1)[0].match(/(.*)\.js$/)[1];
        entries[name] = item;
    });
    return entries;
}

let entries = getEntries('./entries/*.js');

function getTemplate(path) {
    return Object.keys(entries).map(key => {
        return new HTMLWebpackPlugin({
            template: path,
            filename: `${key}/index.html`,
            chunks: [key],
            title: key,
            env: process.env.NODE_ENV === 'production' ? 'production' : 'development'
        })
    });
}

const resolve = (_path) => path.resolve(__dirname, _path);

module.exports = {
    entry: entries,
    output: {
        filename: "[name].js"
    },
    devServer: {
        port: 8080,
        host: '0.0.0.0',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        ...getTemplate(resolve('./index.html'))
    ]
};

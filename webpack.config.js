import HtmlWebpackPlugin from 'html-webpack-plugin';

// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
    require('os').networkInterfaces();
} catch (e) {
    require('os').networkInterfaces = () => ({});
}

module.exports = {

    entry: [
        `bootstrap/scss/bootstrap.scss`,
        `font-awesome/scss/font-awesome.scss`,
        `babel-polyfill`,
        `expose?React!react`,
        `${__dirname}/sources/client`
    ],

    output: {
        path: `${__dirname}/build`,
        filename: `[name].js`
    },

    resolve: {
        modules: [ `${__dirname}/sources`, `node_modules` ],
        symlinks: false
    },

    module: {
        loaders: [ {
            test: /\.js$/,
            include: [ `${__dirname}/sources` ],
            loader: `babel`
        }, {
            test: /\.scss$/,
            loader: `style!css!sass`
        }, {
            test: /\.(ttf|woff2?|svg|eot)(\?[^?]*)?$/,
            loader: `file`
        } ]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ]

};

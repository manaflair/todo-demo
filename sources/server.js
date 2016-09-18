import historyApiFallback                                                       from 'connect-history-api-fallback';
import express                                                                  from 'express';
import webpack                                                                  from 'webpack';
import webpackDevMiddleware                                                     from 'webpack-dev-middleware';

Promise.resolve().then(() => {

    return new Promise((resolve, reject) => {

        let base = express();

        let config = require(`../webpack.config.js`);
        let compiler = webpack(config);

        base.use(historyApiFallback());
        base.use(webpackDevMiddleware(compiler));

        base.listen(42000, err => err ? reject(err) : resolve());

    });

}).catch(error => {

    console.log(error.stack);

});

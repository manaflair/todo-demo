import historyApiFallback                                                       from 'connect-history-api-fallback';
import express                                                                  from 'express';
import Sequelize                                                                from 'sequelize';
import webpack                                                                  from 'webpack';
import webpackDevMiddleware                                                     from 'webpack-dev-middleware';

let database = new Sequelize({ dialect: `sqlite`, storage: `:memory:` });

Promise.resolve().then(() => {

    return database.sync();

}).then(() => {

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

import { makeSequelizeBackend }                                                 from '@manaflair/json-server/sequelize';
import { JsonServer }                                                           from '@manaflair/json-server';
import bodyParser                                                               from 'body-parser';
import historyApiFallback                                                       from 'connect-history-api-fallback';
import express                                                                  from 'express';
import { BOOLEAN, STRING, UUID, UUIDV4 }                                        from 'sequelize';
import Sequelize                                                                from 'sequelize';
import webpack                                                                  from 'webpack';
import webpackDevMiddleware                                                     from 'webpack-dev-middleware';

let database = new Sequelize({ dialect: `sqlite`, storage: `:memory:` });

let Section = database.define(`Section`, {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    title: { type: STRING, allowNull: false, defaultValue: `` }
});

let Note = database.define(`Note`, {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    content: { type: STRING, allowNull: false, defaultValue: `` },
    status: { type: BOOLEAN, allowNul: false, defaultValue: false }
});

Section.hasMany(Note);
Note.belongsTo(Section);

Promise.resolve().then(() => {

    return database.sync();

}).then(() => {

    function bulkCreate(Target, attributeList) {

        return attributeList.reduce((promise, attributes) => {

            return promise.then(resources => {
                return Target.create(attributes).then(resource => {
                    return resources.concat([ resource ]);
                });
            });

        }, Promise.resolve([]));

    }

    return Section.create({ id: `00000000-0000-0000-0001-000000000000`, title: `Movies I have to see` }).then(section => {

        return bulkCreate(Note, [

            { id: `00000000-0000-0000-0001-000000000001`, content: `Django`, status: true },
            { id: `00000000-0000-0000-0001-000000000002`, content: `Sucker Punch`, status: false },
            { id: `00000000-0000-0000-0001-000000000003`, content: `Tron Legacy`, status: true },
            { id: `00000000-0000-0000-0001-000000000004`, content: `A Clockwork Orange`, status: false }

        ]).then(resources => {

            return section.setNotes(resources);

        });

    });

}).then(() => {

    return new Promise((resolve, reject) => {

        let base = express();

        let config = require(`../webpack.config.js`);
        let compiler = webpack(config);

        let jsonServer = new JsonServer();
        jsonServer.add(makeSequelizeBackend(Section));
        jsonServer.add(makeSequelizeBackend(Note));

        base.use(bodyParser.json());
        base.use(`/api`, jsonServer.middleware);

        base.use(historyApiFallback());
        base.use(webpackDevMiddleware(compiler));

        base.listen(42000, err => err ? reject(err) : resolve());

    });

}).catch(error => {

    console.log(error.stack);

});

const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(initOptions);

const config = {
    host: 'localhost',
    port: 5432,
    database: 'meetmytype',
    user: 'postgres',
    password: 'pwd'
};

const db = pgp(config);

module.exports = db;
'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

module.exports = {
    mbti: {
        getAll: sql('./mbti/getAll.sql'),
        getById: sql('./mbti/getById.sql')
    },
    orientation: {
        getAll: sql('./orientation/getAll.sql'),
        getById: sql('./orientation/getById.sql')
    },
    users: {
        add: sql('./users/add.sql'),
        getAll: sql('./users/getAll.sql'),
    }
};

function sql(file) {
    const fullPath = path.join(__dirname, file);
    const options = {
        minify: true,
        params: {
            schema: 'public'
        }
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}
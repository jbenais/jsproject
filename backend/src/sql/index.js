'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

module.exports = {
    mbti: {
        getAll: sql('./mbti/getAll.sql'),
        getById: sql('./mbti/getById.sql')
    },
    address:{
        add: sql('./address/add.sql'),
        getAll: sql('./address/getAll.sql'),
        getById: sql('./address/getById.sql'),
        getByIdUser: sql('./address/getByIdUser.sql')
    },
    target: {
        getAll: sql('./target/getAll.sql'),
        getById: sql('./target/getById.sql')
    },
    orientation: {
        getAll: sql('./orientation/getAll.sql'),
        getById: sql('./orientation/getById.sql')
    },
    users: {
        add: sql('./users/add.sql'),
        getAll: sql('./users/getAll.sql'),
        getByEmail: sql('./users/getByEmail.sql')
    },
    userPreferences: {
        add: sql('./userPreferences/add.sql'),
        getAll: sql('./userPreferences/getAll.sql'),
        getById: sql('./userPreferences/getById.sql'),
        getByIdUser: sql('./userPreferences/getByIdUser.sql'),
        getByIdMBTI: sql('./userPreferences/getByIdMBTI.sql')
    },
    userTarget: {
        add: sql('./userTarget/add.sql'),
        getAll: sql('./userTarget/getAll.sql'),
        getById: sql('./userTarget/getById.sql'),
        getByIdUser: sql('./userTarget/getByIdUser.sql'),
        getByIdTarget: sql('./userTarget/getByIdTarget.sql')
    },
    matches: {
        add: sql('./matches/add.sql'),
        getAll: sql('./matches/getAll.sql'),
        getById: sql('./matches/getById.sql'),
        getByIdUser: sql('./matches/getByIdUser.sql'),
        getByIdUsers: sql('./matches/getByIdUsers.sql'),
        update: sql('./matches/update.sql')
    },
    userPicture:{
        add: sql('./userPicture/add.sql'),
        getByIdUser: sql('./userPicture/getByIdUser.sql'),
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
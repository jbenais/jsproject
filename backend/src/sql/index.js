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
        getByIdUser: sql('./address/getByIdUser.sql'),
        update: sql('./address/update.sql')
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
        getById: sql('./users/getById.sql'),
        getMonoPossibleByIdUser: sql('./users/getMonoPossibleByIdUser.sql'),
        getBiPossibleByIdUser: sql('./users/getBiPossibleByIdUser.sql'),
        getByEmail: sql('./users/getByEmail.sql'),
        update: sql('./users/update.sql')
    },
    userPreferences: {
        add: sql('./userPreferences/add.sql'),
        getAll: sql('./userPreferences/getAll.sql'),
        getById: sql('./userPreferences/getById.sql'),
        getByIdUser: sql('./userPreferences/getByIdUser.sql'),
        getByIdMBTI: sql('./userPreferences/getByIdMBTI.sql'),
        delete: sql('./userPreferences/delete.sql')
    },
    userTarget: {
        add: sql('./userTarget/add.sql'),
        getAll: sql('./userTarget/getAll.sql'),
        getById: sql('./userTarget/getById.sql'),
        getByIdUser: sql('./userTarget/getByIdUser.sql'),
        getByIdTarget: sql('./userTarget/getByIdTarget.sql'),
        delete: sql('./userTarget/delete.sql')
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
    },
    channel:{
        add: sql('./channel/add.sql'),
        getAll: sql('./channel/getAll.sql'),
        getByIdUsers: sql('./channel/getByIdUsers.sql'),
    },
    messages:{
        add: sql('./messages/add.sql'),
        getAll: sql('./messages/getAll.sql'),
        getMessageBeforeDate: sql('./messages/getMessageBeforeDate.sql'),  
    },
    notification:{
        add: sql('./notification/add.sql'),
        getAll: sql('./notification/getAll.sql'),
        getByIdUserChannel: sql('./notification/getByIdUserChannel.sql'),  
        update: sql('./notification/update.sql')
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
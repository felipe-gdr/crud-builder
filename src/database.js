const set = require('lodash/set');

const db = {
    user: {
        'id': {}
    }
};

const idsMap = {
    users: 0,
};

const getNextId = entityName => {
    const nextId = idsMap[entityName] || 0;

    idsMap[entityName] = nextId;

    return nextId;
};

const buildAddFn = entityName => value => {
    const id = getNextId(entityName);

    set(db, `${entityName}.${id}`, value);

    return id;
};

const buildGetFn = entityName => id => {
    return db[entityName][id];
};

module.exports = {
    buildAddFn,
    buildGetFn,
};
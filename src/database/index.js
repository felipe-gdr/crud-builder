const set = require('lodash/set');

const db = {};

const idsMap = {};

const getNextId = entityName => {
    const nextId = (idsMap[entityName] || 0) + 1;

    idsMap[entityName] = nextId;

    return nextId;
};

const buildAddFn = entityName => value => {
    const id = getNextId(entityName);

    set(db, `${entityName}.${id}`, value);

    return {...value, id};
};

const buildGetFn = entityName => id => {
    const entity = db[entityName][id];

    if (!entity) {
        return null;
    }

    return {...entity, id};
};

module.exports = {
    buildAddFn,
    buildGetFn,
};
const {
    GraphQLString,
    GraphQLBoolean,
} = require('graphql');

const typeMap = {
    "string": GraphQLString,
    "boolean": GraphQLBoolean,
};

const buildFields = fields => Object.keys(fields)
    .map(key => ({
        [key]: {
            type: typeMap[fields[key]]
        },
    }))
    .reduce((acc, obj) => ({...acc, ...obj}));

module.exports = {
    buildFields,
}

import { GraphQLString, GraphQLBoolean } from 'graphql';

const typeMap = {
    "string": GraphQLString,
    "boolean": GraphQLBoolean,
};

export const buildFields = fields => Object.keys(fields)
    .map(key => ({
        [key]: {
            type: typeMap[fields[key]]
        },
    }))
    .reduce((acc, obj) => ({...acc, ...obj}));

const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');

const {buildOutputTypes, buildInputTypes} = require('./type');
const {buildFindByIdQueries} = require('./query');
const {buildAddMutations} = require('./mutation');

const mockModel = {
    entities: [
        {
            name: "user",
            fields: {
                "name": "string",
                "email": "string",
            }
        }
    ],
};

const {entities} = mockModel;

const outputTypes = buildOutputTypes(entities);
const inputTypes = buildInputTypes(entities);

const buildSchema = database => {
    const {buildGetFn, buildAddFn} = database;
    const queryFields = buildFindByIdQueries({entities, outputTypes, buildGetFn});
    const mutationFields = buildAddMutations({entities, outputTypes, inputTypes, buildAddFn});

    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'RootQueryType',
            fields: queryFields,
        }),
        mutation: new GraphQLObjectType({
            name: 'RootMutationType',
            fields: mutationFields,
        }),
    });
};

module.exports = {buildSchema};
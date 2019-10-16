"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const type_1 = require("./type");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
exports.buildSchema = (model, database) => {
    const { entities } = model;
    const outputTypes = type_1.buildOutputTypes(entities);
    const inputTypes = type_1.buildInputTypes(entities);
    const { buildGetByIdFn, buildAddFn } = database;
    const queryFields = query_1.buildFindByIdQueries({
        entities,
        outputTypes,
        buildGetByIdFn
    });
    const mutationFields = mutation_1.buildAddMutations({
        entities,
        outputTypes,
        inputTypes,
        buildAddFn
    });
    return new graphql_1.GraphQLSchema({
        query: new graphql_1.GraphQLObjectType({
            name: 'RootQueryType',
            fields: queryFields
        }),
        mutation: new graphql_1.GraphQLObjectType({
            name: 'RootMutationType',
            fields: mutationFields
        })
    });
};
//# sourceMappingURL=index.js.map
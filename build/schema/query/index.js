"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.buildFindByIdQueries = ({ entities, outputTypes, buildGetByIdFn }) => {
    return entities
        .map(entity => {
        const type = outputTypes[entity.name];
        const get = buildGetByIdFn(entity.name);
        return {
            [entity.name]: {
                type,
                resolve: (_, { id }) => {
                    return get(id);
                },
                args: {
                    id: {
                        type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                    }
                }
            }
        };
    })
        .reduce((acc, obj) => {
        return { ...acc, ...obj };
    }, {});
};
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const typeMap = {
    string: graphql_1.GraphQLString,
    boolean: graphql_1.GraphQLBoolean
};
exports.buildFields = (fields) => Object.keys(fields)
    .map(key => ({
    [key]: {
        type: typeMap[fields[key]]
    }
}))
    .reduce((acc, obj) => ({ ...acc, ...obj }));
//# sourceMappingURL=fields.js.map
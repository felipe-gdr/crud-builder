"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const camelCase_1 = __importDefault(require("lodash/camelCase"));
const fields_1 = require("./fields");
const getIdTypeDef = () => ({
    id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
});
exports.buildOutputTypes = (entities) => {
    return entities
        .map(entity => {
        const fields = fields_1.buildFields(entity.fields);
        const type = new graphql_1.GraphQLObjectType({
            name: capitalize_1.default(entity.name),
            fields: { ...fields, ...getIdTypeDef() }
        });
        return { [entity.name]: type };
    })
        .reduce((acc, obj) => ({ ...acc, ...obj }));
};
exports.buildInputTypes = (entities) => {
    return entities
        .map(entity => {
        const fields = fields_1.buildFields(entity.fields);
        const type = new graphql_1.GraphQLInputObjectType({
            // TODO: extract name formation into its own function
            name: capitalize_1.default(camelCase_1.default(entity.name)) + 'Input',
            fields: { ...fields }
        });
        const nonNullType = graphql_1.GraphQLNonNull(type);
        return { [entity.name]: nonNullType };
    })
        .reduce((acc, obj) => ({ ...acc, ...obj }));
};
//# sourceMappingURL=index.js.map
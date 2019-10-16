"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cypher_query_builder_1 = require("cypher-query-builder");
const dotenv_1 = __importDefault(require("dotenv"));
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const uuid_1 = __importDefault(require("uuid"));
dotenv_1.default.config();
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;
const getLabelName = (entityName) => capitalize_1.default(entityName);
let db = new cypher_query_builder_1.Connection('bolt://localhost:7687', {
    username: user,
    password,
});
exports.buildAddFn = entityName => async (value) => {
    const id = uuid_1.default.v1();
    const obj = { ...value, id };
    await db
        .createNode(entityName, getLabelName(entityName), obj)
        .run();
    return obj;
};
exports.buildGetByIdFn = entityName => async (id) => {
    const result = await db
        .matchNode(entityName, getLabelName(entityName), { id })
        .return(entityName)
        .run();
    if (result && result[0] && result[0][entityName]) {
        return result[0][entityName].properties;
    }
};
//# sourceMappingURL=index.js.map
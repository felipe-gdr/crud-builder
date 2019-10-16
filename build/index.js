"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = require("./schema");
const database = __importStar(require("./database"));
const app = express_1.default();
const port = 3000;
const mockModel = {
    entities: [
        {
            name: 'user',
            fields: {
                name: 'string',
                email: 'string'
            }
        },
    ]
};
app.use('/graphql', express_graphql_1.default({
    schema: schema_1.buildSchema(mockModel, database),
    // rootValue: root,
    graphiql: true
}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map
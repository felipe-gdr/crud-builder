"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelCase_1 = __importDefault(require("lodash/camelCase"));
exports.buildAddMutations = ({ entities, inputTypes, outputTypes, buildAddFn }) => {
    return entities
        .map(entity => {
        const { name } = entity;
        const mutationName = camelCase_1.default(`add-${name}`);
        const outputType = outputTypes[name];
        const inputType = inputTypes[name];
        const add = buildAddFn(name);
        return {
            [mutationName]: {
                type: outputType,
                args: {
                    input: {
                        type: inputType
                    }
                },
                resolve: (_, { input }) => {
                    return add(input);
                }
            }
        };
    })
        .reduce((acc, obj) => {
        return { ...acc, ...obj };
    }, {});
};
//# sourceMappingURL=index.js.map
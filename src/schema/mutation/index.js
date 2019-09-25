import camelCase from 'lodash/camelCase';

export const buildAddMutations = ({entities, inputTypes, outputTypes, buildAddFn}) => {
    return entities
        .map(entity => {
            const {name} = entity;

            const mutationName = camelCase(`add-${name}`);
            const outputType = outputTypes[name];
            const inputType = inputTypes[name];
            const add = buildAddFn(name);

            return {
                [mutationName]: {
                    type: outputType,
                    args: {
                        input: {
                            type: inputType,
                        }
                    },
                    resolve: (_, {input}) => {
                        return add(input);
                    }
                }
            }
        })
        .reduce((acc, obj) => {
            return {...acc, ...obj};
        }, {});
};

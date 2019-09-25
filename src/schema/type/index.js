const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const capitalize = require('lodash/capitalize');
const camelCase = require('lodash/camelCase');

const {buildFields} = require('./fields');

const getIdTypeDef = () => ({
    id: {type: GraphQLNonNull(GraphQLID)},
});

const buildOutputTypes = entities => {
    return entities
        .map(entity => {
            const fields = buildFields(entity.fields);

            const type = new GraphQLObjectType({
                name: capitalize(entity.name),
                fields: {...fields, ...getIdTypeDef()},
            });

            return {[entity.name]: type};
        })
        .reduce((acc, obj) => ({...acc, ...obj}));
};

const buildInputTypes = entities => {
    return entities
        .map(entity => {
            const fields = buildFields(entity.fields);

            const type = new GraphQLInputObjectType({
                    // TODO: extract name formation into its own function
                    name: capitalize(camelCase(entity.name)) + 'Input',
                    fields: {...fields},
                }
            );

            const nonNullType = GraphQLNonNull(type);

            return {[entity.name]: nonNullType};
        })
        .reduce((acc, obj) => ({...acc, ...obj}));
};

module.exports = {
    buildInputTypes,
    buildOutputTypes
};

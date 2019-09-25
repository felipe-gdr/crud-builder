const {
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const buildFindByIdQueries = ({entities, outputTypes, buildGetFn}) => {
    return entities
        .map(entity => {
            const type = outputTypes[entity.name];

            const get = buildGetFn(entity.name);

            return {
                [entity.name]: {
                    type,
                    resolve: (_, {id}) => {
                        return get(id);
                    },
                    args: {
                        id: {
                            type: GraphQLNonNull(GraphQLID),
                        }
                    }
                }
            }
        })
        .reduce((acc, obj) => {
            return {...acc, ...obj};
        }, {});
};

module.exports = {
    buildFindByIdQueries,
};

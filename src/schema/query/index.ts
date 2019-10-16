import { GraphQLID, GraphQLNonNull } from 'graphql';

export const buildFindByIdQueries = ({ entities, outputTypes, buildGetByIdFn }) => {
  return entities
    .map((entity) => {
      const type = outputTypes[entity.name];

      const get = buildGetByIdFn(entity.name);

      return {
        [entity.name]: {
          args: {
            id: {
              type: GraphQLNonNull(GraphQLID),
            },
          },
          resolve: (_, { id }) => {
            return get(id);
          },
          type,
        },
      };
    })
    .reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
};

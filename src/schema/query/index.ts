import { GraphQLID, GraphQLNonNull } from 'graphql';

export const buildFindByIdQueries = ({ entities, outputTypes, buildGetByIdFn }) => {
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
              type: GraphQLNonNull(GraphQLID)
            }
          }
        }
      };
    })
    .reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
};

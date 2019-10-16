import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import camelCase from 'lodash/camelCase';
import capitalize from 'lodash/capitalize';
import { EntitiesModel } from '../../common/types';
import { buildFields } from './fields';

const getIdTypeDef = () => ({
  id: { type: GraphQLNonNull(GraphQLID) },
});

export const buildOutputTypes = (entities: EntitiesModel) => {
  return entities
    .map((entity) => {
      const fields = buildFields(entity.fields);

      const type = new GraphQLObjectType({
        fields: { ...fields, ...getIdTypeDef() },
        name: capitalize(entity.name),
      });

      return { [entity.name]: type };
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }));
};

export const buildInputTypes = (entities: EntitiesModel) => {
  return entities
    .map((entity) => {
      const fields = buildFields(entity.fields);

      const type = new GraphQLInputObjectType({
        fields: { ...fields },
        // TODO: extract name formation into its own function
        name: capitalize(camelCase(entity.name)) + 'Input',
      });

      const nonNullType = GraphQLNonNull(type);

      return { [entity.name]: nonNullType };
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }));
};

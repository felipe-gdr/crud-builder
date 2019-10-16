import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import capitalize from 'lodash/capitalize';
import camelCase from 'lodash/camelCase';
import { buildFields } from './fields';
import { EntitiesModel } from '../../common/types';

const getIdTypeDef = () => ({
  id: { type: GraphQLNonNull(GraphQLID) }
});

export const buildOutputTypes = (entities: EntitiesModel) => {
  return entities
    .map(entity => {
      const fields = buildFields(entity.fields);

      const type = new GraphQLObjectType({
        name: capitalize(entity.name),
        fields: { ...fields, ...getIdTypeDef() }
      });

      return { [entity.name]: type };
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }));
};

export const buildInputTypes = (entities: EntitiesModel) => {
  return entities
    .map(entity => {
      const fields = buildFields(entity.fields);

      const type = new GraphQLInputObjectType({
        // TODO: extract name formation into its own function
        name: capitalize(camelCase(entity.name)) + 'Input',
        fields: { ...fields }
      });

      const nonNullType = GraphQLNonNull(type);

      return { [entity.name]: nonNullType };
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }));
};

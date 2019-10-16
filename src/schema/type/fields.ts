import { GraphQLString, GraphQLBoolean } from 'graphql';
import { FieldsModel } from '../../common/types';

const typeMap = {
  string: GraphQLString,
  boolean: GraphQLBoolean
};

export const buildFields = (fields: FieldsModel) =>
  Object.keys(fields)
    .map(key => ({
      [key]: {
        type: typeMap[fields[key]]
      }
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }));

import { GraphQLBoolean, GraphQLString } from 'graphql';
import { FieldsModel } from '../../common/types';

const typeMap = {
  boolean: GraphQLBoolean,
  string: GraphQLString,
};

export const buildFields = (fields: FieldsModel) =>
  Object.keys(fields)
    .map((key) => ({
      [key]: {
        type: typeMap[fields[key]],
      },
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }));

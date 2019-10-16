import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { buildOutputTypes, buildInputTypes } from './type';
import { buildFindByIdQueries } from './query';
import { buildAddMutations } from './mutation';
import { Database, RootModel } from '../common/types';

const mockModel: RootModel = {
  entities: [
    {
      name: 'user',
      fields: {
        name: 'string',
        email: 'string'
      }
    }
  ]
};

const { entities } = mockModel;

const outputTypes = buildOutputTypes(entities);
const inputTypes = buildInputTypes(entities);

export const buildSchema = (database: Database): GraphQLSchema => {
  const { buildGetByIdFn, buildAddFn } = database;
  const queryFields = buildFindByIdQueries({
    entities,
    outputTypes,
    buildGetByIdFn
  });
  const mutationFields = buildAddMutations({
    entities,
    outputTypes,
    inputTypes,
    buildAddFn
  });

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: queryFields
    }),
    mutation: new GraphQLObjectType({
      name: 'RootMutationType',
      fields: mutationFields
    })
  });
};

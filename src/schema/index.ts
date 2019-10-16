import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Database, RootModel } from '../common/types';
import { buildAddMutations } from './mutation';
import { buildFindByIdQueries } from './query';
import { buildInputTypes, buildOutputTypes } from './type';

export const buildSchema = (model: RootModel, database: Database): GraphQLSchema => {
const { entities } = model;

const outputTypes = buildOutputTypes(entities);

const inputTypes = buildInputTypes(entities);
const { buildGetByIdFn, buildAddFn } = database;
const queryFields = buildFindByIdQueries({
    buildGetByIdFn,
    entities,
    outputTypes,
  });
const mutationFields = buildAddMutations({
    buildAddFn,
    entities,
    inputTypes,
    outputTypes,
  });

return new GraphQLSchema({
    mutation: new GraphQLObjectType({
      fields: mutationFields,
      name: 'RootMutationType',
    }),
    query: new GraphQLObjectType({
      fields: queryFields,
      name: 'RootQueryType',
    }),
  });
};

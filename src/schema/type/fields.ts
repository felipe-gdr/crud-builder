import { GraphQLBoolean, GraphQLScalarType, GraphQLString, GraphQLID } from 'graphql';
import { FieldsModel, RelationshipModel, EntityName, RelationshipType } from '../../common/types';

// TODO: move this types somewhere else
// TODO: add other types
type SchemaFieldType = typeof GraphQLBoolean | typeof GraphQLString;

type SchemaFields = {
  [key: string]: SchemaFieldType,
};

type TypeMapModel = {
  [key: string]: SchemaFieldType,
};

const typeMap: TypeMapModel = {
  boolean: GraphQLBoolean,
  string: GraphQLString,
};

export const buildFields = (fields: FieldsModel) /*: SchemaFields*/ =>
  Object.keys(fields)
    .map((key) => ({
      [key]: {
        type: typeMap[fields[key]],
      },
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }));

const buildIdFieldName = (entityName: EntityName) => `${entityName}Id`;

const relationshipShouldBePartOfInsert = (relationshipName: RelationshipType) =>
  relationshipName.endsWith('to-one');

export const buildRelationshipInputType = (relationship: RelationshipModel) => {
  if (!relationship || !relationship.required || !relationshipShouldBePartOfInsert(relationship.type)) {
    return null;
  }

  return {
    [buildIdFieldName(relationship.to)]: {
      type: GraphQLID,
    },
  };
};

export const buildRelationshipsInputTypes = (relationships: RelationshipModel[]) =>
  relationships ?
    relationships
      .map(buildRelationshipInputType)
      .filter(Boolean)
      .reduce((acc, obj) => ({ ...acc, ...obj }), [])
    : {};

export type EntityName = string;
export type ID = any;
export type InputValue = any;
export type OutputValue = InputValue & { id: ID};

export type AddFn = (value: InputValue) => Promise<OutputValue>;
export type BuildAddFn = (entityName: EntityName, relationships: RelationshipsModel) => AddFn;

export type GetByIdFn = (id: ID) => Promise<OutputValue>;
export type BuildGetByIdFn = (entityName: EntityName) => GetByIdFn;

export type Database = {
    buildAddFn: BuildAddFn;
    buildGetByIdFn: BuildGetByIdFn;
};

// Model
export type FieldType = 'string' | 'integer' | 'float' | 'boolean';

export type FieldsModel = {
  [fieldName: string]: FieldType;
};

export type RelationshipType = 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';

export type RelationshipModel = {
  type: RelationshipType,
  to: EntityName,
  /**
   * Indicates whether this relationship is required.
   * If required is true, the insert operation for this entity will
   * validate the presence of this relationship.
   * Example: User -> Address has a one-to-one relationship. If 'required'
   * is defined as true on the User end, the add user operation will required
   * that an 'address' is passed in.
   */
  // TODO: Maybe this property makes sense only on "*to-one" relationships.
  required?: boolean,
  description?: string,
};

export type RelationshipsModel = RelationshipModel[];

export type EntityModel = {
  name: EntityName;
  fields: FieldsModel;
  relationships?: RelationshipsModel;
};

export type EntitiesModel = EntityModel[];

export type RootModel = {
  entities: EntitiesModel;
};

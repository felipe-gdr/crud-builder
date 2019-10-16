export type EntityName = string;
export type ID = any;
export type InputValue = any;
export type OutputValue = InputValue & { id: ID};

export type AddFn = (value: InputValue) => Promise<OutputValue>;
export type BuildAddFn = (entityName: EntityName) => AddFn;

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

export type EntityModel = {
  name: EntityName;
  fields: FieldsModel;
};

export type EntitiesModel = EntityModel[];

export type RootModel = {
  entities: EntitiesModel;
};

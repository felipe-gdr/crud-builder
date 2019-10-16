import { Connection, relation, node } from 'cypher-query-builder';
import dotenv from 'dotenv';
import capitalize from 'lodash/capitalize';
import uuid from 'uuid';
import { BuildAddFn, BuildGetByIdFn, EntityName, RelationshipsModel } from '../common/types';
import camelCase from 'lodash/camelCase';

type Label = string;

dotenv.config();

const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const getLabelName = (entityName: EntityName): Label => capitalize(entityName);

const db = new Connection('bolt://localhost:7687', {
    password,
    username: user,
});

const getRelationshipIds = (value: any, relationships: RelationshipsModel) =>
    relationships
        .filter(relationship => {
            return Object.keys(value).find(key => key === `${relationship.to}Id`);
        })
        .map(relationship => ({
            ...relationship,
            entityId: value[`${relationship.to}Id`],
        }));

export const buildAddFn: BuildAddFn = (
    entityName: EntityName,
    relationships: RelationshipsModel = [],
   ) => async (value) => {

    const id = uuid.v1();
    const obj = { ...value, id };

    if (relationships.length === 0) {
        await db
            .createNode(entityName, getLabelName(entityName), obj)
            .run();

        return obj;
    }

    const relationshipsWithIds = getRelationshipIds(value, relationships);

    let query = db.createNode(entityName, getLabelName(entityName), obj)
        .with(entityName);

    relationshipsWithIds.forEach(relationshipsWithId => {
        const { to, entityId, type, description } = relationshipsWithId;

        // TODO Make functional, not mutable
        query = query
            .matchNode(to, getLabelName(to), { id: entityId })
            .create([
                node(entityName),
                relation('out', 'rel', camelCase(type), { description }),
                node(to),
            ]);
    });

    query.return(['user', entityName]);

    const results = query.run();

    return results;
};

export const buildGetByIdFn: BuildGetByIdFn = (entityName) => async (id) => {
    const result = await db
        .matchNode(entityName, getLabelName(entityName), { id })
        .return(entityName)
        .run();

    if (result && result[0] && result[0][entityName]) {
        return result[0][entityName].properties;
    }
};

buildAddFn('todo', [
    {
        to: 'user',
        type: 'many-to-one',
        description: 'owned by',
    }
])({title: 'JS!', description: 'JavaScript!!!', userId: '94390e70-efbf-11e9-8e8a-bb303c27f40c'})
    .then(console.log);


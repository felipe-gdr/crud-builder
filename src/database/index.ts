import {Connection} from 'cypher-query-builder';
import dotenv from 'dotenv';
import capitalize from 'lodash/capitalize';
import uuid from 'uuid';
import { BuildAddFn, BuildGetByIdFn, EntityName } from '../common/types';

type Label = string;

dotenv.config();

const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const getLabelName = (entityName: EntityName): Label => capitalize(entityName);

let db = new Connection('bolt://localhost:7687', {
    username: user,
    password,
});

export const buildAddFn: BuildAddFn = entityName => async value => {
    const id = uuid.v1();
    const obj = {...value, id};

    await db
        .createNode(entityName, getLabelName(entityName), obj)
        .run();

    return obj;
};

export const buildGetByIdFn: BuildGetByIdFn = entityName => async id => {
    const result = await db
        .matchNode(entityName, getLabelName(entityName), { id })
        .return(entityName)
        .run();

    if (result && result[0] && result[0][entityName]) {
        return result[0][entityName].properties;
    }
};


import express from 'express';
import graphqlHTTP from 'express-graphql';
import { RootModel } from './common/types';
import * as database from './database';
import { buildSchema } from './schema';

const app = express();
const port = 3000;

const mockModel: RootModel = {
  entities: [
    {
      name: 'user',
      fields: {
        email: 'string',
        name: 'string',
      },
      relationships: [
        {
          type: 'one-to-many',
          to: 'todo',
          description: 'owns',
        },
      ],
    },
    {
      name: 'todo',
      fields: {
        title: 'string',
        description: 'string',
      },
      relationships: [
        {
          type: 'many-to-one',
          to: 'user',
          required: true,
          description: 'owned by',
        },
      ],
    },
  ],
};

app.use(
  '/graphql',
  graphqlHTTP({
    // rootValue: root,
    graphiql: true,
    schema: buildSchema(mockModel, database),
  }),
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

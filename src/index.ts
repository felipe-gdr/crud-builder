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
      fields: {
        email: 'string',
        name: 'string',
      },
      name: 'user',
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

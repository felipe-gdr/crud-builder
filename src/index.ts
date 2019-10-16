import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from './schema';
import * as database from './database';

const app = express();
const port = 3000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(database),
    // rootValue: root,
    graphiql: true
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

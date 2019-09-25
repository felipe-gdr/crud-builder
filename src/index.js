const express = require('express');
const graphqlHTTP = require('express-graphql');

const {buildSchema} = require('./schema');
const database = require('./database');

const app = express();
const port = 3000;

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(database),
    // rootValue: root,
    graphiql: true,
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

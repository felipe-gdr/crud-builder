const {buildSchema} = require('./schema');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');

const {graphql} = require('graphql');

const app = express();
const port = 3000;

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(),
    // rootValue: root,
    graphiql: true,
}));

// app.use(bodyParser.json());
//
// app.post('/graphql', async (req, res) => {
//     const schema = buildSchema();
//     const {query, variables} = req.body;
//
//     const result = await graphql(schema, query);
//
//     return res.send(result);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

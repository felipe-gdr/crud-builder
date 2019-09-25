const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
} = require('graphql');

const capitalize = require('lodash/capitalize');

const mockModel = {
    entities: [
        {
            name: "user",
            fields: {
                "name": "string",
                "email": "string",
            }
        }
    ],
};

const typeMap = {
    "string": GraphQLString,
    "boolean": GraphQLBoolean,
};

const buildFakeDb = model => {
    return model.entities.reduce((acc, entity) => {
        const partial = {[entity.name]: entity.fields};

        return {...acc, ...partial};
    }, {});
};

const fakeDb = buildFakeDb(mockModel);

const buildGetField = field => () => {
    return fakeDb[field];
};

// TODO make required
const getIdTypeDef = () => ({
    id: {type: GraphQLID},
});

const buildTypes = model => {
    return model.entities
        .map(entity => {
            const fields = Object.keys(entity.fields)
                .map(key => ({
                    [key]: {
                        type: typeMap[entity.fields[key]]
                    },
                }))
                .reduce((acc, obj) => ({...acc, ...obj}));

            const type = new GraphQLObjectType({
                name: capitalize(entity.name),
                fields: {...fields, ...getIdTypeDef()},
                // TODO: why is description not showing in docs (graphiql)?
                description: `Entity description ${entity.name}`,
            });

            return {[entity.name]: type};
        })
        .reduce((acc, obj) => ({...acc, ...obj}));
};

const types = buildTypes(mockModel);

const buildTopLevelQueries = model => {
    return model.entities
        .map(entity => {
            const type = types[entity.name];

            const resolver = buildGetField(entity.name);

            return {
                [entity.name]: {
                    type,
                    resolve: resolver,
                    // TODO: resolve query arguments
                    args: {
                        id: {
                            type: GraphQLID,
                            description: 'The entities id'
                        }
                    }
                }
            }
        })
        .reduce((acc, obj) => {
            return {...acc, ...obj};
        }, {});
};


const buildMutations = model => {

};

const buildSchema = () => {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'RootQueryType',
            fields: buildTopLevelQueries(mockModel),
        }),
        mutation: new GraphQLObjectType({
            name: 'RootMutationType',
            fields: {
                addUser: {
                    type: types.user,
                    args: {
                        name: {
                            type: GraphQLNonNull(GraphQLString)
                        },
                        email: {
                            type: GraphQLNonNull(GraphQLString)
                        }
                    },
                    resolve: (a,b,c,d) => {
                        console.log(a,b,c,d);
                    }
                }
            }
        }),
    });
};

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                },
            },
            // user: {
            //     type: userType,
            //     resolve() {
            //         return {
            //             name: "Ziggy",
            //             email: "ziggy@cats.com"
            //         }
            //     }
            // }
        },
    }),
});

module.exports = {schema, buildSchema};
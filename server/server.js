const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const { typeDefs, resolvers } = require('./schemas')

const sequelize = require('./config/config')

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/'));
})


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    sequelize.authenticate()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`API server running on port ${PORT}!`);
                console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
            })
        })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
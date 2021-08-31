'use strict'

// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const { readFileSync, read } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

// definiendo el esquema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })


// Ejecutar el query
// graphql(schema, '{hello}', resolvers).then(data => {
//     console.log(data)
// })

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

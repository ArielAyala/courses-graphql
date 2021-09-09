'use strict'

require('dotenv').config()

// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')

const { readFileSync, read } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

// definiendo el esquema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

// Ejecutar el query
// graphql(schema, '{hello}', resolvers).then(data => {
//     console.log(data)
// })
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

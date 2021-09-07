
const mutations = require('./mutation')
const queries = require('./queries')
const types = require('./types')

// const courses = [
//     {
//         _id: 'anyid1',
//         title: 'Mi titulo 1',
//         teacher: 'Mi profesor',
//         description: 'Descripcion',
//         topic: 'Programacion'
//     },
//     {
//         _id: 'anyid2',
//         title: 'Mi titulo 2',
//         teacher: 'Mi profesor',
//         description: 'Descripcion',
//         topic: 'Programacion'
//     }
// ]

// Configurar los resolvers
module.exports = {
    Query: queries,
    Mutation: mutations, 
    ...types
}
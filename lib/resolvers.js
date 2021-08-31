'use strict'

const courses = [
    {
        _id: 'anyid1',
        title: 'Mi titulo 1',
        teacher: 'Mi profesor',
        description: 'Descripcion',
        topic: 'Programacion'
    },
    {
        _id: 'anyid2',
        title: 'Mi titulo 2',
        teacher: 'Mi profesor',
        description: 'Descripcion',
        topic: 'Programacion'
    }
]

// Configurar los resolvers
module.exports = {
    Query: {
        getCourses: () => {
            return courses
        },
        getCourse: (root, args) => {
            const course = courses.filter(course => course._id === args.id)
            return course.pop()
        }
    }
}
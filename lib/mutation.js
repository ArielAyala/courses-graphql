'use strict'

const connectDB = require('./db')
const { ObjectID } = require('bson')
const errorHandler = require('./errorHandler')

module.exports = {
    createCourse: async (root, { _id, input }) => {

        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, input)
        let db
        let course

        try {
            db = await connectDB()
            course = await db.collection('courses').insertOne(input)
            newCourse._id = course.insertedId
        } catch (error) {
            errorHandler(error);
        }

        return newCourse
    },
    editCourse: async (root, { _id, input }) => {
        let db
        let course

        try {
            db = await connectDB()
            await db.collection('courses').updateOne({ _id: ObjectID(_id) }, { $set: input })
            course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
        } catch (error) {
            errorHandler(error);
        }
        return course;
    },
    deleteCourse: async (root, { _id }) => {
        let db, info
        try {
            db = await connectDB()
            info = await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
        } catch (error) {
            errorHandler(error);
        }
        return info
    },

    createStudent: async (root, { input }) => {

        let db
        let student

        try {
            db = await connectDB()
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId
        } catch (error) {
            errorHandler(error);
        }

        return input
    },

    editStudent: async (root, { _id, input }) => {
        let db
        let student

        try {
            db = await connectDB()
            await db.collection('students').updateOne({ _id: ObjectID(_id) }, { $set: input })
            student = await db.collection('students').findOne({ _id: ObjectID(_id) })
        } catch (error) {
            errorHandler(error)
        }

        return student
    },

    addPeople: async (root, { courseID, personID }) => {
        let db
        let person
        let course

        try {
            db = await connectDB()
            course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
            person = await db.collection('students').findOne({ _id: ObjectID(personID) })

            if (!course || !person) throw new Error('La Persona o el Curso no existe')

            await db.collection('courses').updateOne(
                { _id: ObjectID(courseID) },
                { $addToSet: { people: ObjectID(personID) } }
            )
        } catch (error) {
            errorHandler(error)
        }

        return course
    }

}
'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  stillInGame: {
    type: Boolean,
    default: true
  },
  targetId: {
    type: String
  },
  targetIdArray: {
    type: [String]
  },
  pastTargetsArray: {
    type: [String]
  },
  personId: {
    type: String
  },
  faceId: {
    type: String
  },
  name: {
    type: String
  },
  setUpAlready: {
    type: Boolean,
    default: false
  },
  house: {
    type: String
  },
}, { minimize: false });

TodoSchema.plugin(mongooseApiQuery)
TodoSchema.plugin(createdModified, { index: true })

const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo

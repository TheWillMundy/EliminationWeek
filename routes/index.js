'use strict'

//Dependencies
const _       = require('lodash'),
      errors  = require('restify-errors')

//Include Model
const Todo = require('../models/todo')
const Login = require('../models/logins')

//Login Requests

//List all Logins
server.get('/logins', function(req, res, next) {
  Login.apiQuery(req.params, function(err, doc) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Get Login by Service Type
server.get('/logins/:serviceType', function(req, res, next) {
  Login.findOne({serviceType: req.params.serviceType}, function(err, doc) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Create New Login
server.post('/logins', function(req, res, next) {
  let data = req.body || {}
  let login = new Login(data)
  login.save(function(err) {
    if (err) {
      log.error(err)
      return next(new errors.InternalError(err.message))
      next()
    }
    res.send(201)
    next()
  })
})

//Delete Login
server.del('/logins/:login_id', function(req, res, next) {
  Login.remove({ _id: req.params.login_id }, function(err) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(204)
    next()
  })
})

//Todo Requests

//Post Route
server.post('/todos', function(req, res, next) {
  let data = req.body || {}
  let todo = new Todo(data)
  todo.save(function(err) {
    if (err) {
      log.error(err)
      return next(new errors.InternalError(err.message))
      next()
    }
    res.send(201)
    next()
  })
})

//List all todos
server.get('/todos', function(req, res, next) {
  Todo.apiQuery(req.params, function(err, docs) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(docs)
    next()
  })
})

//Get Todo by Todo's Id
server.get('/todos/:todo_id', function(req, res, next) {
  Todo.findOne({ _id: req.params.todo_id }, function(err, doc) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Get Todo by User's Name
server.get('/todos', function(req, res, next) {
  Todo.apiQuery(req.params.name, function(err, todos) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Get Todo by User's unique UID
server.get('/todos', function(req, res, next) {
  Todo.apiQuery(req.params.uid, function(err, todos) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Get Todo by User's personId
server.get('/todos', function(req, res, next) {
  Todo.apiQuery(req.params.personId, function(err, todos) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Get Todo by User's faceId
server.get('/todos', function(req, res, next) {
  Todo.apiQuery(req.params.faceId, function(err, todos) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(doc)
    next()
  })
})

//Update Individual Todo
server.put('/todos/:todo_id', function(req, res, next) {
  let data = req.body || {}

  if (!data._id) {
    _.extend(data, {
      _id: req.params.todo_id
    })
  }

  Todo.findOne({ _id: req.params.todo_id }, function(err, doc) {
    if(err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    else if(!doc) {
      return next(new errors.ResourceNotFoundError('The resource you tried to access could not be found.'))
    }

    Todo.update({ _id: data._id }, data, function(err) {
      if (err) {
        log.error(err)
        return next(new errors.InvalidContentError(err.errors.name.message))
      }
      res.send(200, data)
      next()
    })
  })
})

//Delete Todo by Id
server.del('/todos/:todo_id', function(req, res, next) {
  Todo.remove({ _id: req.params.todo_id }, function(err) {
    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    res.send(204)
    next()
  })
})

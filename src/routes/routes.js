import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';

mongoose.Promise = global.Promise;

const router = express.Router();

import Login from '../models/logins';
import Todo from '../models/todo';

const routes = () => {
  router.get('/logins', (req, res, next) => {
    Login.apiQuery(req.params, function(err, doc) {
      if (err) {
         res.status(502).send(err);
         return;
      }
      if (doc == null) {
        res.status(404).send('Not Found');
      }
      else {
        res.send(doc);
      }
    });
  });

  router.get('/logins/:serviceType', (req, res, next) => {
    Login.findOne({serviceType: req.params.serviceType}, (err, doc) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      if (doc == null) {
        res.status(404).send('Not Found');
      }
      else {
        res.send(doc);
      }
    });
  });

  router.post('/logins', (req, res, next) => {
    let data = req.body || {};
    let login = new Login(data);
    login.save((err) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.status(201).send();
    });
  });

  router.delete('/logins/:login_id', (req, res, next) => {
    Login.remove({ _id: req.params.login_id }, (err) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.status(204).send();
    });
  });

  router.post('/todos', (req, res, next) => {
    let data = req.body || {};
    let todo = new Todo(data);
    todo.save((err) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.status(201).send();
    });
  });

  router.get('/todos', (req, res, next) => {
    Todo.apiQuery(req.params, (err, docs) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.send(docs);
    });
  });

  router.get('/todos/:todo_id', (req, res, next) => {
    Todo.findOne({ _id: req.params.todo_id }, (err, doc) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.send(doc);
    });
  });

  router.get('/todos', (req, res, next) => {
    Todo.apiQuery(req.params.name, (err, todos) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.send(doc);
    });
  });

  router.get('/todos', (req, res, next) => {
    Todo.apiQuery(req.params.uid, (err, todos) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.send(doc);
    });
  });

  router.get('/todos', (req, res, next) => {
    Todo.apiQuery(req.params.personId, (err, todos) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.send(doc);
    });
  });

  router.get('/todos', (req, res, next) => {
    Todo.apiQuery(req.params.faceId, (err, todos) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.send(doc);
    });
  });

  router.put('/todos/:todo_id', (req, res, next) => {
    let data = req.body || {};

    if (!data._id) {
      _.extend(data, {
        _id: req.params.todo_id
      });
    }

    Todo.findOne({ _id: req.params.todo_id }, (err, doc) => {
      if(err) {
        res.status(502).send(err);
        return;
      }
      else if(!doc) {
        res.status(502).send('The resource you tried to access could not be found.');
        return;
      }

      Todo.update({ _id: data._id }, data, (err) => {
        if (err) {
          res.status(502).send(err);
          return;
        }
        res.status(200).send(data);
      });
    });
  });

  router.delete('/todos/:todo_id', (req, res, next) => {
    Todo.remove({ _id: req.params.todo_id }, (err) => {
      if (err) {
        res.status(502).send(err);
        return;
      }
      res.status(204).send();
    });
  });

  return router;
}

export default routes;

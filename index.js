'use strict'

/**
 * Module Dependencies
 */
const config        = require('./config'),
      restify       = require('restify'),
      bunyan        = require('bunyan'),
      winston       = require('winston'),
      bunyanWinston = require('bunyan-winston-adapter'),
      mongoose      = require('mongoose'),
      corsMiddleware = require('restify-cors-middleware'),
      MongoClient = require('mongodb').MongoClient

global.log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      timestamp: () => {
        return new Date().toString()
      },
      json: true
    }),
  ]
})

//Server initialization

global.server = restify.createServer({
  name: config.name,
  version: config.version,
  log: bunyanWinston.createAdapter(log)
})

//Middleware
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
//Allowing Origins to Access Server
// function corsHandler(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
//     res.setHeader('Access-Control-Max-Age', '1000');
//     return next();
// }
function corsHandler(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
    res.header('Access-Control-Allow-Methods', ['POST', 'GET', 'DELETE', 'PUT']);
    res.header('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time', 'Accept-Encoding', 'Accept-Language');
    res.header('Access-Control-Max-Age', '1000');
    return next();
}
function optionHandler(req, res, next) {
  res.send(200);
  next();
}
server.opts(/\.*/,
  corsHandler,
  optionHandler
);
server.pre(restify.CORS());
server.use(restify.fullResponse())

// server.on('MethodNotAllowed', methodNotAllowedHandler)

// function methodNotAllowedHandler(req, res) {
//   if (req.method.toLowerCase() === 'delete') {
//     console.log('Received a Delete Method request')
//     if (res.methods.indexOf('POST') === -1) res.methods.push('DELETE');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', res.methods.join(', '));
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     return res.send(204);
//   }
// }
//   else if (req.method.toLowerCase() === 'get') {
//     console.log('Received a Get Method Request')
//     if (res.methods.indexOf('GET') === -1) res.methods.push('GET');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', res.methods.join(', '));
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     return res.send(204);
//   }
// }

// //Setting Up CORS
// var cors = corsMiddleware({
//   preflightMaxAge: 5, //Optional
//   origins: ['http://localhost:3000'],
//   allowHeaders: ['Content-Type'],
//   exposeHeaders: ['Access-Control-Allow-Origin']
// });
//
// //CORS Middleware
// server.pre(cors.preflight)
// server.use(cors.actual)

//Error Handling
server.on('uncaughtException', (req, res, route, err) => {
  log.error(err.stack)
  res.send(err)
});

//Lift Server, Connect to DB, Bind Routes
server.listen(config.port, function() {
  mongoose.connection.on('error', function(err) {
    log.error('Mongoose default connection error: ' + err)
    process.exit(1)
  })

  mongoose.connection.on('open', function(err) {
    if (err) {
      log.error('Mongoose default connection error: ' + err)
      process.exit(1)
    }

    log.info(
      '%s v%s ready to accept connections on port %s in %s environment.',
      server.name,
      config.version,
      config.port,
      config.env
    )

    require('./routes')
  });

  // global.db = MongoClient.connect(config.db.uri, function(err, db) {
  //   db.close();
  // })
  global.db = mongoose.connect(config.db.uri)

})

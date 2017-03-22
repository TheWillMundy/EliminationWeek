'use strict'

module.exports = {
  name: 'API',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  base_url: process.env.BASE_URL || 'http://localhost:3001',
  db: {
    // uri: 'mongodb://will:w6J2aFjjs{Cfk@52.221.78.205:27017/quizzes'
    uri: 'mongodb://stucotests:Vz6oZW9I7jnqTpYl@elimweektesting2017-shard-00-00-wxwhw.mongodb.net:27017,elimweektesting2017-shard-00-01-wxwhw.mongodb.net:27017,elimweektesting2017-shard-00-02-wxwhw.mongodb.net:27017/api?ssl=true&replicaSet=ElimWeekTesting2017-shard-0&authSource=admin'
    // uri: 'mongodb://127.0.0.1:27017/api',
  },
}

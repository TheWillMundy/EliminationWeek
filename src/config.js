export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8200,
  ip: process.env.IP || 'localhost',
  base_url: process.env.BASE_URL || 'http://localhost:8200',
  db: {
    uri: 'mongodb://stucotests:Vz6oZW9I7jnqTpYl@elimweektesting2017-shard-00-00-wxwhw.mongodb.net:27017,elimweektesting2017-shard-00-01-wxwhw.mongodb.net:27017,elimweektesting2017-shard-00-02-wxwhw.mongodb.net:27017/api?ssl=true&replicaSet=ElimWeekTesting2017-shard-0&authSource=admin'
  },
  apiKey: 'b6d8c3f2298e92e72c84ffbc94f1e01d'
}

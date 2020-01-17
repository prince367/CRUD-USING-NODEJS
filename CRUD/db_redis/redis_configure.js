const Redis = require('ioredis');

const REDIS_PORT = process.env.PORT || 6379;
//const client = new Redis({ port: 6379, host: 'http://localhost'})
const client = new Redis();
console.log('Redis is configured!');
module.exports = client;
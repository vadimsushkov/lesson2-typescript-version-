"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const redisClient = redis.createClient('redis://127.0.0.1:6379');
redisClient.on('error', console.error);
redisClient.on('ready', () => console.log(`Connected to redis and listen on ${process.env.REDIS_PORT} port`));
redisClient.on('reconnecting', () => console.log('Reconnecting to redis'));
redisClient.on('end', () => console.log('The connecting with redis was closed for some reasons'));
exports.default = redisClient;

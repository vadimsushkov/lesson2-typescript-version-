import * as redis  from 'redis';
import * as bluebird  from 'bluebird';

bluebird.promisifyAll(redis);

const redisClient = redis.createClient('redis://redis:6379');

// if has occured an error then show her in the console as an error
redisClient.on('error', console.error);

// When redis will be ready then log that we are connected to redis db
redisClient.on('ready', () => console.log(`Connected to redis and listen on ${process.env.REDIS_PORT} port`));

/*
    If we are reconnecting to redis or we were
    disconnected from redis and we're trying to connect again
 */
redisClient.on('reconnecting', () => console.log('Reconnecting to redis'));

redisClient.on('end', () => console.log('The connecting with redis was closed for some reasons'));

export default redisClient;
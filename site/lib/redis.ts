import { createClient } from 'redis'


const redis = createClient({url: process.env.REDIS_URL, socket: {tls: false}})
redis.on('error', (err) => console.log('Redis Client Error', err));
await redis.connect()

export default redis
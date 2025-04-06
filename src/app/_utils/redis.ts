import { Redis as RedisClient } from '@upstash/redis';

export const Redis = new RedisClient({
  url: String(process.env.UPSTASH_REDIS_REST_URL),
  token: String(process.env.UPSTASH_REDIS_REST_TOKEN),
});

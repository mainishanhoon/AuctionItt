import { Redis as redis } from '@upstash/redis';

export const Redis = new redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

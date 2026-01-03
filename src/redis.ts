import { createClient, RedisClientType } from "redis";
import env from "./env";

let redisClient: RedisClientType | null = null;

export const createRedisClient = async (): Promise<RedisClientType> => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = createClient({
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    socket: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  });

  redisClient.on("error", (err: Error) => {
    console.error("Redis Client Error:", err);
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis successfully");
  });

  redisClient.on("disconnect", () => {
    console.log("Disconnected from Redis");
  });

  try {
    await redisClient.connect();
    console.log(`Redis connected to ${env.REDIS_HOST}:${env.REDIS_PORT}`);
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }

  return redisClient;
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client not initialized. Call createRedisClient() first.");
  }
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.disconnect();
    redisClient = null;
    console.log("Redis connection closed");
  }
};

export { redisClient };

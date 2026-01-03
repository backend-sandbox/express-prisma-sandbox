import { getRedisClient } from "../redis";

/**
 * Redis utility service for common caching operations
 * This provides a layer of abstraction over Redis client
 */
export class CacheService {
  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const redis = getRedisClient();
      const value = await redis.get(key);

      if (value === null) {
        return null;
      }

      // Handle special case for cached null values
      if (value === "null") {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error getting cache key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set a value in cache with TTL
   */
  async set(key: string, value: unknown, ttlSeconds: number): Promise<boolean> {
    try {
      const redis = getRedisClient();
      const serializedValue = value === null ? "null" : JSON.stringify(value);
      await redis.setEx(key, ttlSeconds, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error setting cache key ${key}:`, error);
      return false;
    }
  }

  /**
   * Delete one or more keys from cache
   */
  async delete(keys: string | string[]): Promise<boolean> {
    try {
      const redis = getRedisClient();
      const keysArray = Array.isArray(keys) ? keys : [keys];

      if (keysArray.length === 0) {
        return true;
      }

      await redis.del(keysArray);
      return true;
    } catch (error) {
      console.error(`Error deleting cache keys:`, error);
      return false;
    }
  }

  /**
   * Check if a key exists in cache
   */
  async exists(key: string): Promise<boolean> {
    try {
      const redis = getRedisClient();
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`Error checking cache key existence ${key}:`, error);
      return false;
    }
  }

  /**
   * Get keys matching a pattern
   */
  async getKeys(pattern: string): Promise<string[]> {
    try {
      const redis = getRedisClient();
      return await redis.keys(pattern);
    } catch (error) {
      console.error(`Error getting keys with pattern ${pattern}:`, error);
      return [];
    }
  }

  /**
   * Clear all keys matching a pattern
   */
  async clearPattern(pattern: string): Promise<number> {
    try {
      const keys = await this.getKeys(pattern);

      if (keys.length === 0) {
        return 0;
      }

      await this.delete(keys);
      return keys.length;
    } catch (error) {
      console.error(`Error clearing pattern ${pattern}:`, error);
      return 0;
    }
  }

  /**
   * Get TTL of a key
   */
  async getTTL(key: string): Promise<number> {
    try {
      const redis = getRedisClient();
      return await redis.ttl(key);
    } catch (error) {
      console.error(`Error getting TTL for key ${key}:`, error);
      return -1;
    }
  }

  /**
   * Extend TTL of an existing key
   */
  async extendTTL(key: string, additionalSeconds: number): Promise<boolean> {
    try {
      const redis = getRedisClient();
      const currentTTL = await redis.ttl(key);

      if (currentTTL === -1) {
        // Key doesn't exist or has no expiry
        return false;
      }

      const newTTL = Math.max(currentTTL + additionalSeconds, 0);
      await redis.expire(key, newTTL);
      return true;
    } catch (error) {
      console.error(`Error extending TTL for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    totalKeys: number;
    memoryUsage: string;
    hitRate?: number;
  }> {
    try {
      const redis = getRedisClient();
      const info = await redis.info("memory");
      const keyspaceInfo = await redis.info("keyspace");

      // Parse total keys from keyspace info
      const keyspaceMatch = keyspaceInfo.match(/keys=(\d+)/);
      const totalKeys = keyspaceMatch ? parseInt(keyspaceMatch[1]) : 0;

      // Parse memory usage
      const memoryMatch = info.match(/used_memory_human:(.+)/);
      const memoryUsage = memoryMatch ? memoryMatch[1].trim() : "Unknown";

      return {
        totalKeys,
        memoryUsage,
      };
    } catch (error) {
      console.error("Error getting cache stats:", error);
      return {
        totalKeys: 0,
        memoryUsage: "Unknown",
      };
    }
  }

  /**
   * Cache-aside pattern implementation
   * Tries cache first, falls back to data source, then caches the result
   */
  async cacheAside<T>(
    key: string,
    dataSource: () => Promise<T>,
    ttlSeconds: number,
    logContext?: string,
  ): Promise<T> {
    // Try cache first
    const cached = await this.get<T>(key);
    if (cached !== null) {
      if (logContext) {
        console.log(`Cache hit for ${logContext}: ${key}`);
      }
      return cached;
    }

    // Cache miss - get from data source
    if (logContext) {
      console.log(`Cache miss for ${logContext}: ${key} - fetching from data source`);
    }

    const data = await dataSource();

    // Cache the result
    await this.set(key, data, ttlSeconds);

    if (logContext) {
      console.log(`Cached result for ${logContext}: ${key}`);
    }

    return data;
  }

  /**
   * Write-through pattern implementation
   * Writes to cache and data source simultaneously
   */
  async writeThrough<T>(
    key: string,
    data: T,
    dataWriter: (data: T) => Promise<T>,
    ttlSeconds: number,
    logContext?: string,
  ): Promise<T> {
    // Write to data source first
    const savedData = await dataWriter(data);

    // Then update cache
    await this.set(key, savedData, ttlSeconds);

    if (logContext) {
      console.log(`Write-through completed for ${logContext}: ${key}`);
    }

    return savedData;
  }
}

export const cacheService = new CacheService();

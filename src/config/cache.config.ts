import { timeConstant } from "../constants/time.constant";

/**
 * Redis Cache Configuration
 * Centralized cache keys and TTL management
 */

export const CACHE_TTL = {
  SHORT: timeConstant.FIVE_MINUTES,
  MEDIUM: timeConstant.THIRTY_MINUTES,
  LONG: timeConstant.ONE_HOUR,
  VERY_LONG: timeConstant.ONE_DAY,
} as const;

export const PRODUCT_CACHE_KEYS = {
  PRODUCT_BY_ID: (id: number) => `product:${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `products:category:${category.toLowerCase()}`,
  ALL_PRODUCTS: "products:all",
  PRODUCT_SEARCH: (query: string) => `products:search:${query.toLowerCase()}`,
  PRODUCT_EXISTS: (id: number) => `product:exists:${id}`,
  PRODUCT_COUNT: "products:count",
  PRODUCT_CATEGORIES: "products:categories",
} as const;

export const USER_CACHE_KEYS = {
  USER_BY_ID: (id: number) => `user:${id}`,
  USER_BY_EMAIL: (email: string) => `user:email:${email.toLowerCase()}`,
  USER_SESSIONS: (userId: number) => `user:sessions:${userId}`,
  USER_PERMISSIONS: (userId: number) => `user:permissions:${userId}`,
} as const;

/**
 * Cache key patterns for bulk operations
 */
export const CACHE_PATTERNS = {
  PRODUCTS: "product*",
  USERS: "user*",
  SESSIONS: "session*",
  RATE_LIMITS: "rate_limit*",
} as const;

/**
 * Cache configuration per entity type
 */
export const CACHE_CONFIG = {
  PRODUCT: {
    INDIVIDUAL: CACHE_TTL.LONG, // Single product data
    LIST: CACHE_TTL.MEDIUM, // Product lists
    SEARCH: CACHE_TTL.SHORT, // Search results
    EXISTS: CACHE_TTL.MEDIUM, // Existence checks
    METADATA: CACHE_TTL.VERY_LONG, // Categories, counts, etc.
  },
  USER: {
    PROFILE: CACHE_TTL.LONG,
    SESSIONS: CACHE_TTL.MEDIUM,
    PERMISSIONS: CACHE_TTL.LONG,
    PREFERENCES: CACHE_TTL.VERY_LONG,
  },
  GENERAL: {
    TEMPORARY: CACHE_TTL.SHORT,
    STABLE: CACHE_TTL.LONG,
    METADATA: CACHE_TTL.VERY_LONG,
  },
} as const;

/**
 * Helper function to get cache key with prefix
 * e.g., getCacheKey('product', 123) => 'product:123'
 */
export const getCacheKey = (prefix: string, identifier: string | number): string => {
  return `${prefix}:${identifier}`;
};

/**
 * Helper function to get cache pattern for deletion
 */
export const getCachePattern = (prefix: string): string => {
  return `${prefix}*`;
};

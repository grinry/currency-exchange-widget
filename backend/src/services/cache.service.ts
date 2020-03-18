import { cacheTTL } from '../vars';
import { ICache } from '../interfaces';

interface StorageItem {
    value: any;
    expires: number;
}

type StorageItems = {[key: string]: StorageItem };

/**
 * Our memory cache solution.
 */
export class CacheService implements ICache {
    private items: StorageItems = {};

    /**
     * Checks if key exists and is not expired
     * @param key string
     */
    public has(key: string): boolean {
        if (this.items.hasOwnProperty(key)) {
            const item = this.items[key];
            return item.expires > Date.now();
        }
        return false;
    }

    /**
     * Returns cached value or undefined if it does not exists or is expired.
     * @param key string
     */
    public get<T = any>(key: string): T | undefined {
        return this.has(key) ? this.items[key].value : undefined;
    }

    /**
     * Save item to storage for specified amount of time in seconds.
     * @param key string
     * @param value
     * @param ttl number
     */
    public set<T = any>(key: string, value: T, ttl: number = cacheTTL): void {
        this.items[key] = {
            value,
            expires: Date.now() + ttl * 1e3,
        };
    }
}

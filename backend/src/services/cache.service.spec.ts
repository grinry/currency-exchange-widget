import { CacheService } from './cache.service';

test('should set and retrieve data.', () => {
  const cache = new CacheService();
  cache.set('test', 'test', 500);
  expect(cache.has('test')).toBe(true);
  expect(cache.get('test')).toBe('test');
});

test('should expire data.', () => {
  const cache = new CacheService();
  cache.set('test', 'test', 0);
  expect(cache.has('test')).toBe(false);
  expect(cache.get('test')).toBe(undefined);
});

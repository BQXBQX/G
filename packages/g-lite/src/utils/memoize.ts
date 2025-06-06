export function memoize<F = (...args: unknown[]) => unknown>(
  func: F,
  resolver?: (...args: any[]) => any,
) {
  if (
    typeof func !== 'function' ||
    (resolver != null && typeof resolver !== 'function')
  ) {
    throw new TypeError('Expected a function');
  }

  const memoized = function (...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const { cache } = memoized;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  memoize.cacheList.push(memoized.cache);

  return memoized as F;
}

memoize.Cache = Map;
memoize.cacheList = [];
memoize.clearCache = () => {
  memoize.cacheList.forEach((cache) =>
    (cache as unknown as Map<unknown, unknown>).clear(),
  );
};

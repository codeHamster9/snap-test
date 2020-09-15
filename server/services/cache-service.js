const NodeCache = require("node-cache");

class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds * 60 * 1,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  delete(keys) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.flushAll();
  }
}

module.exports = Cache;

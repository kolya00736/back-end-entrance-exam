let cache = {};
let maxSize = 50;

exports.getCache = () => {
  return cache;
};

exports.setCache = (newCache) => {
  cache = newCache;
};

exports.getMaxSize = () => {
  return maxSize;
};

exports.setMaxSize = (newMaxSize) => {
  maxSize = newMaxSize;
  // Проверяем, нужно ли удалять старые записи
  const keys = Object.keys(cache);
  if (keys.length > maxSize) {
    const excess = keys.length - maxSize;
    for (let i = 0; i < excess; i++) {
      delete cache[keys[i]];
    }
  }
};
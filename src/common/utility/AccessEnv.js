const cache = {};

const AccessEnv = (key, defaultValue) => {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue;
    const err = `${key} not found in process.env`;
    throw new Error(err);
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return cache[key];
};

module.exports = AccessEnv;

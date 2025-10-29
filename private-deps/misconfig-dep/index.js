// This module intentionally exposes a misconfigured/default config for testing.
// It returns a config object that includes a dummy credential and debug enabled.

module.exports = {
  getConfig: function () {
    return {
      dbUri: 'mongodb://admin:password@localhost:27017/testdb',
      debug: true,
      exposeInternal: true
    };
  }
};

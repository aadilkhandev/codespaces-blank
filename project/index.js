// Main project entry that uses public npm packages and local private dependencies
const _ = require('lodash');
const axios = require('axios');
const vulnerable = require('@aadilkhandev/vulnerable-dep');
const misconfig = require('misconfig-dep');

function runUserInput(input) {
  // Intentionally uses the vulnerable dependency to execute user-provided code
  const result = vulnerable.runUserCode(input);

  // Demonstrate use of a public package (lodash)
  const lodashSum = _.add(1, 2);

  // Include config from the misconfigured local package
  const config = misconfig.getConfig();

  return { result, config, lodashSum };
}

if (require.main === module) {
  // Simple demo when run directly
  const out = runUserInput('1 + 1');
  console.log('Result:', out.result);
  console.log('Lodash sum (1 + 2):', out.lodashSum);
  console.log('Config leak (for testing):', out.config);
}

module.exports = { runUserInput };

// Additional intentionally vulnerable helpers in the main project (for testing scanners).
// WARNING: These are insecure on purpose. Do NOT use in production.

// 1) Unsafe shell execution using untrusted input
module.exports.execShell = function (cmd) {
  const { execSync } = require('child_process');
  return execSync(cmd, { encoding: 'utf8' });
};

// 2) Path traversal / insecure file write (no sanitization)
module.exports.writeFileUnsafe = function (baseDir, userPath, content) {
  const path = require('path');
  const fs = require('fs');
  // naive join allows path like '../../etc/passwd' to escape baseDir
  const target = path.join(baseDir, userPath);
  fs.writeFileSync(target, content, { encoding: 'utf8' });
  return target;
};

// 3) Insecure HTTP client that disables TLS verification (MITM risk)
module.exports.httpFetchInsecure = async function (url) {
  const https = require('https');
  // Create an agent that ignores certificate errors (dangerous)
  const agent = new https.Agent({ rejectUnauthorized: false });
  const res = await axios.get(url, { httpsAgent: agent });
  return res.data;
};

// 4) Dynamic require from user input (can load unexpected modules)
module.exports.dynamicRequire = function (moduleName) {
  // intentionally uses dynamic require
  return require(moduleName);
};

// 5) Use of the Function constructor (similar risk to eval)
module.exports.dynamicFunction = function (expr) {
  // creates a new function from string and calls it
  const fn = new Function('return (' + expr + ')');
  return fn();
};

// 6) Logging secrets (simulated) to demonstrate secret exposure via logs
module.exports.logSecret = function (secret) {
  // intentionally logs sensitive data
  console.log('LEAKED_SECRET:', secret);
};

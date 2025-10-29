const assert = require('assert');
const app = require('../index');

// Happy path: simple arithmetic expression passed to the vulnerable dep
const out = app.runUserInput('2 + 2');
assert.strictEqual(out.result, 4, 'vulnerable-dep should evaluate 2 + 2 to 4');

// Misconfig should expose debug flag and a dummy credential field
assert.strictEqual(out.config.debug, true, 'misconfig should have debug=true');
assert.ok(out.config.dbUri && typeof out.config.dbUri === 'string', 'misconfig should expose a dbUri string');

// Public package usage should work
assert.strictEqual(out.lodashSum, 3, 'lodash.add should compute 1 + 2 = 3');

// Ensure additional vulnerable helpers exist on the vulnerable dependency module (do NOT execute them here)
const vuln = require('../../private-deps/vulnerable-dep');
assert.ok(typeof vuln.unsafeExec === 'function', 'vulnerable-dep.unsafeExec should exist');
assert.ok(typeof vuln.buildSqlQuery === 'function', 'vulnerable-dep.buildSqlQuery should exist');
assert.ok(typeof vuln.prototypePollute === 'function', 'vulnerable-dep.prototypePollute should exist');
assert.ok(typeof vuln.insecureDeserialize === 'function', 'vulnerable-dep.insecureDeserialize should exist');

// Check main project vulnerable helpers are present (do NOT execute them)
const main = require('../index');
assert.ok(typeof main.execShell === 'function', 'project.execShell should exist');
assert.ok(typeof main.writeFileUnsafe === 'function', 'project.writeFileUnsafe should exist');
assert.ok(typeof main.httpFetchInsecure === 'function', 'project.httpFetchInsecure should exist');
assert.ok(typeof main.dynamicRequire === 'function', 'project.dynamicRequire should exist');
assert.ok(typeof main.dynamicFunction === 'function', 'project.dynamicFunction should exist');
assert.ok(typeof main.logSecret === 'function', 'project.logSecret should exist');

console.log('All tests passed — the demo executed and exposed the intended public + private + main project vulnerabilities (helpers present).');

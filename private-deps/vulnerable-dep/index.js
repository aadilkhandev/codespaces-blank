// WARNING: This module is intentionally vulnerable for testing purposes.
// It executes provided strings using eval, which allows remote code execution
// if untrusted input reaches it. Do NOT use this pattern in production.

module.exports = {
  runUserCode: function (input) {
    // naive eval of input; expected to be a JavaScript expression like '2+2'
    return eval(input);
  },
  safeEcho: function (s) {
    return `echo: ${String(s)}`;
  }
};

// Additional intentionally vulnerable helpers (for security testing).
// WARNING: These are insecure on purpose. Do NOT use in production.

// 1) Unsafe command execution (command injection if input is untrusted).
module.exports.unsafeExec = function (cmd) {
  const { execSync } = require('child_process');
  // This will execute whatever command string is passed. Dangerous with untrusted input.
  return execSync(cmd, { encoding: 'utf8' });
};

// 2) SQL query builder that concatenates user input directly (SQL injection demo).
module.exports.buildSqlQuery = function (userInput) {
  // naive concatenation — vulnerable to SQL injection if sent to a DB.
  return `SELECT * FROM users WHERE name = '${userInput}';`;
};

// 3) Prototype pollution example: merges keys from user-provided object into a fresh object
// using a loop that will copy `__proto__` if present, which can pollute Object prototype.
module.exports.prototypePollute = function (userObj) {
  const target = {};
  for (const k in userObj) {
    // intentionally not sanitizing key names
    target[k] = userObj[k];
  }
  // If userObj contains __proto__ it will have been copied onto target, and thus can
  // cause prototype pollution when used improperly.
  return target;
};

// 4) Insecure deserialization pattern (using eval on serialized input) — RCE risk.
module.exports.insecureDeserialize = function (serialized) {
  // This is intentionally awful: eval used to deserialize arbitrary JS objects.
  return eval('(' + serialized + ')');
};

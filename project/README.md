# Local Deps Demo

This demo shows a main JavaScript project that depends on two local private packages in `../private-deps/`.

- `vulnerable-dep` — intentionally exposes an unsafe `runUserCode` that calls `eval` on input (for testing detection of code-execution vulnerabilities).
- `misconfig-dep` — exports a config object that includes a dummy credential and a debug flag (represents a misconfiguration/secret leak).

More details about vulnerabilities included in `private-deps/vulnerable-dep`:

- `runUserCode` — uses `eval` on input (remote code execution risk).
- `unsafeExec` — executes a shell command string with `child_process.execSync` (command injection risk).
- `buildSqlQuery` — builds SQL queries by concatenating user input (SQL injection risk).
- `prototypePollute` — demonstrates an unsafe merging pattern that can copy `__proto__` and cause prototype pollution.
- `insecureDeserialize` — uses `eval` to deserialize a string into an object (insecure deserialization / RCE risk).

The test suite intentionally does not execute the destructive helpers — it only checks their presence so you can run static scanners or craft safe tests that examine the code paths.

Try it:

```bash
# Run the demo
node index.js

# Run tests
npm test
```

Note: These vulnerable behaviors are intentional for testing and should not be used in production.

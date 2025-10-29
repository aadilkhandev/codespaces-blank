Publishing to GitHub Packages (npm.pkg.github.com)
===============================================

This package is prepared to be published under the scope `@aadilkhandev`.

Important notes
- Do NOT commit tokens to the repository. Use environment variables or CI secrets.
- GitHub Packages requires a scoped package name (e.g. `@OWNER/name`).

Local publish steps (developer machine) — requires a personal access token (with `write:packages`):

1. Create a token and export it locally:

   ```bash
   export GITHUB_TOKEN="ghp_..."
   ```

2. From the package directory publish to GitHub Packages:

   ```bash
   cd private-deps/vulnerable-dep
   npm publish --access=restricted --registry=https://npm.pkg.github.com/
   ```

3. In projects that consume this package, add an `.npmrc` with the following (or set env token in CI):

   ```text
   @aadilkhandev:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

CI usage
- Store the token in a secret (e.g., GITHUB_TOKEN or a dedicated secret) and set it in the CI environment.
- Use `npm install` in the consuming project. The scoped registry will direct installs to GitHub Packages.

If you prefer not to publish publicly, you can keep using `file:` references locally (the consuming `project/package.json` already uses `file:../private-deps/vulnerable-dep`).

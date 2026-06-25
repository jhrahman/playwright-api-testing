# Playwright API Testing

A lightweight REST API test suite built with Playwright Test for the Restful Booker API. It covers GET, POST, PATCH, PUT, DELETE, header validation, and sequential flows, with support for data-driven tests from JSON.

## What’s included

- API tests for GET, POST, PATCH, PUT, DELETE and header validation
- Browser UI validation after an API call in `tests/get5.spec.ts`
- Data-driven POST test using `test-data/api-data.json`
- Sequential CRUD flow in `tests/all.spec.ts`
- GitHub Actions CI workflow at `.github/workflows/playwright.yml`
- HTML reporting with traces, screenshots, and videos on failure
- Playwright configuration for local and CI execution

## Dependencies

- `@playwright/test` ^1.61.0
- `@types/node` ^26.0.0

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher

## Installation

```bash
npm install
```

## Running tests

Run all tests:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/get.spec.ts
```

Show the HTML report:

```bash
npx playwright show-report
```

## Project structure

```
tests/
  all.spec.ts                # Sequential CRUD flow
  get.spec.ts                # GET request tests
  get2.spec.ts               # Additional GET tests
  get3.spec.ts               # GET tests with parameters
  get4.spec.ts               # GET edge case tests
  get5.spec.ts               # Additional GET scenarios
  headers.spec.ts            # Header and request validation tests
  patch.spec.ts              # PATCH request tests
  post.spec.ts               # POST request tests
  post2.spec.ts              # Advanced POST tests
  post3.spec.ts               # Additional POST scenarios
  post_from_jsondata.spec.ts # POST test using JSON payload from test-data/api-data.json
playwright.config.ts          # Playwright test configuration
playwright-report/            # Generated HTML reports
test-results/                 # Saved test artifacts and logs
test-data/api-data.json       # JSON payload used by data-driven test
```

## Configuration highlights

Key settings from `playwright.config.ts`:

- `baseURL`: `https://restful-booker.herokuapp.com`
- `extraHTTPHeaders`: `Accept: application/json`, `Content-Type: application/json`
- `fullyParallel`: true
- `retries`: `0` locally, `2` on CI
- `reporter`: `html`
- `trace`: `on-first-retry`
- `screenshot`: `only-on-failure`
- `video`: `retain-on-failure`

## CI/CD Integration

This repository includes a GitHub Actions workflow at `.github/workflows/playwright.yml`.
It runs on `push` to `main` and `dev`, installs dependencies, installs Playwright browsers, executes `npx playwright test`, and uploads the generated `playwright-report/` as an artifact.

## Notes

- The project uses Playwright’s API testing features, not browser UI automation.
- `test-data/api-data.json` contains a reusable booking payload for POST-based tests.
- Generated reports are available in `playwright-report/` after running tests.

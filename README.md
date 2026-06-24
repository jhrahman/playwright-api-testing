# Playwright API Testing

A test automation framework for REST API testing built with Playwright Test. Includes support for sequential and parallel test execution, detailed HTML reporting, and CI/CD integration.

## Features

- Comprehensive REST API testing with Playwright's request context
- TypeScript support for type-safe test code
- Parallel test execution with configurable workers
- HTML test reporting with screenshots and videos on failure
- Trace viewer for detailed debugging
- Pre-configured for CI/CD pipelines

## Prerequisites

- Node.js 18.0 or higher
- npm 8.0 or higher

## Installation

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test tests/get.spec.ts
```

Run tests matching a pattern:
```bash
npx playwright test --grep "GET"
```

Run with UI debugging:
```bash
npx playwright test --ui
```

View test report:
```bash
npx playwright show-report
```

## Project Structure

```
tests/
  ├── all.spec.ts          # Sequential CRUD operations
  ├── get.spec.ts          # GET request tests
  ├── get2.spec.ts         # Additional GET tests
  ├── get3.spec.ts         # GET with parameters
  ├── get4.spec.ts         # GET edge cases
  ├── get5.spec.ts         # GET performance tests
  ├── post.spec.ts         # POST and authentication tests
  ├── post2.spec.ts        # Advanced POST operations
  └── post3.spec.ts        # E-commerce API tests
playwright.config.ts        # Test configuration
playwright-report/          # Generated test reports
test-results/               # Test artifacts and logs
```

## Configuration

Base configuration in `playwright.config.ts`:

```typescript
baseURL: 'https://restful-booker.herokuapp.com'

extraHTTPHeaders: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
```

Test settings:
- **Parallel execution**: All tests run in parallel by default
- **Retries**: Disabled locally, enabled (2) on CI
- **Reporter**: HTML report with screenshots and videos on failure
- **Timeout**: Default 30 seconds per test

## Writing Tests

### GET Request

```typescript
import { test, expect } from '@playwright/test'

test('GET - Fetch all bookings', async ({ request }) => {
  const response = await request.get('/booking')
  
  expect(response.status()).toBe(200)
  const bookings = await response.json()
  expect(Array.isArray(bookings)).toBeTruthy()
})
```

### POST Request with Validation

```typescript
import { test, expect } from '@playwright/test'

test('POST - Create authentication token', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  })

  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.token).toBeDefined()
  expect(typeof body.token).toBe('string')
})
```

### Sequential CRUD Operations

```typescript
import { test, expect } from '@playwright/test'

test.describe.serial('CRUD Operations', () => {
  let bookingID: number

  const bookingPayload = {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 500,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2026-01-01'
    },
    additionalneeds: 'Gym Membership'
  }

  test('Create booking', async ({ request }) => {
    const response = await request.post('/booking', {
      data: bookingPayload
    })
    
    expect(response.status()).toBe(200)
    const body = await response.json()
    bookingID = body.bookingid
  })

  test('Retrieve booking', async ({ request }) => {
    const response = await request.get(`/booking/${bookingID}`)
    
    expect(response.status()).toBe(200)
    const booking = await response.json()
    expect(booking.firstname).toBe(bookingPayload.firstname)
  })

  test('Delete booking', async ({ request }) => {
    const response = await request.delete(`/booking/${bookingID}`)
    expect(response.status()).toBe(201)
  })
})
```

### Custom Request Context

```typescript
import { test, request } from '@playwright/test'

let apiContext

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Accept': 'application/json'
    }
  })
})

test('GET with custom context', async () => {
  const response = await apiContext.get('/booking')
  expect(response.status()).toBe(200)
  console.log(await response.json())
})

test.afterAll(async () => {
  await apiContext.dispose()
})
```

## Test Reports

Playwright generates HTML reports after test execution, located in `playwright-report/`.

Report contents:
- Test execution summary
- Passed, failed, and skipped test counts
- Execution time per test
- Screenshots and videos on failure
- Detailed error messages and logs

View report:
```bash
npx playwright show-report
```

Test artifacts (screenshots, videos, traces) are stored in `test-results/`.

## API Endpoints Covered

### Authentication
- `POST /auth` - Generate authentication token

### Bookings
- `GET /booking` - Retrieve all bookings
- `GET /booking/{id}` - Retrieve specific booking
- `POST /booking` - Create new booking
- `DELETE /booking/{id}` - Delete booking

### Shopping Cart
- `POST /addtocart` - Add item to cart
- `POST /viewcart` - View cart contents
- `POST /deleteitem` - Remove item from cart

## Best Practices

1. **Use meaningful test names** - Test names should clearly describe what is being tested
   ```typescript
   test('POST - Create booking with valid data and verify 200 status', async ({ request }) => {
   ```

2. **Follow Arrange-Act-Assert pattern** - Structure tests clearly with setup, execution, and validation
   ```typescript
   // Arrange
   const payload = { firstname: 'John' }
   // Act
   const response = await request.post('/booking', { data: payload })
   // Assert
   expect(response.status()).toBe(200)
   ```

3. **Always validate status code first** - Check response status before parsing the body
   ```typescript
   const response = await request.get('/booking')
   expect(response.status()).toBe(200)
   const body = await response.json()
   ```

4. **Use serial tests for dependent tests** - When tests depend on each other, use `test.describe.serial()`
   ```typescript
   test.describe.serial('CRUD Tests', () => {
     test('CREATE', async () => { ... })
     test('READ', async () => { ... })
   })
   ```

5. **Separate test data from test logic** - Keep payload data separate for better maintainability
   ```typescript
   const testData = {
     validBooking: { firstname: 'John' },
     invalidBooking: { firstname: '' }
   }
   ```

6. **Use environment variables for sensitive data** - Never hardcode credentials in tests
   ```typescript
   const apiToken = process.env.API_TOKEN
   ```

## Advanced Features

### Trace Viewer

Debug failed tests with detailed execution traces:

```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Request Timeout

Set timeouts for API requests:

```typescript
// Per-request
await request.get('/booking', { timeout: 5000 })
```

## Debugging

### Enable Debug Mode

```bash
# Run with debug logs
PW_DEBUG=api npx playwright test

# Interactive debugging with UI
npx playwright test --ui

# Step through tests
npx playwright test --debug
```

### Inspect API Responses

```typescript
test('Debug API response', async ({ request }) => {
  const response = await request.get('/booking')
  
  console.log('Status:', response.status())
  console.log('Headers:', response.headers())
  console.log('Body:', await response.json())
})
```

## CI/CD Pipeline

Automated testing is configured through GitHub Actions. Tests run automatically on push events to `main` and `dev` branches.

### Workflow Configuration

The workflow file (`.github/workflows/playwright.yml`) includes:

- **Trigger**: Runs on push to main/dev branches or manual workflow dispatch
- **Environment**: Ubuntu latest
- **Node Version**: 22
- **Timeout**: 60 minutes
- **Artifact Retention**: 30 days

### Workflow Steps

1. **Checkout** - Retrieves repository code
2. **Setup Node** - Installs Node.js 22
3. **Install Dependencies** - Runs `npm ci` for clean dependency installation
4. **Install Browsers** - Downloads Playwright browsers with system dependencies
5. **Run Tests** - Executes all test suites
6. **Upload Reports** - Stores HTML reports as artifacts for 30 days

### Manual Workflow Trigger

Trigger tests manually via GitHub Actions interface:

1. Go to Actions tab in repository
2. Select "Playwright Tests" workflow
3. Click "Run workflow"
4. Select branch and run

### View Test Results

Test reports are available as workflow artifacts:

1. Open workflow run details
2. Navigate to "Artifacts" section
3. Download `playwright-report` zip file
4. Extract and open `index.html` in browser

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @playwright/test | ^1.61.0 | API testing framework |
| @types/node | ^26.0.0 | TypeScript types for Node.js |

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [API Request Context](https://playwright.dev/docs/api/class-apirequestcontext)

## License

ISC

# PW Assessment - Playwright TypeScript Automation

## Description
Automated test suite for the Product Manager demo app using Playwright and TypeScript, following the Page Object Model (POM) pattern.

## Prerequisites
- Node.js (v18+)
- npm

## Installation
1. Clone the repository
2. Install dependencies:
   npm install
3. Install Playwright browsers:
   npx playwright install
4. Create a `.env` file in the root with:
   BASE_URL=https://sm-assessments.s3.us-east-1.amazonaws.com
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123

## Running the Tests
Run all tests:
   npx playwright test --project=chromium

View the HTML report:
   npx playwright show-report

## Test Scenarios
- Scenario A: User registration with randomized credentials
- Scenario B: Login validation (negative and positive)
- Scenario C: Product CRUD flow (create, filter, delete)

## Trade-offs & Decisions
- Used ID selectors over label selectors for reliability
- Used dotenv for secure credential handling
- Random data generation via helpers.ts for repeatable test execution
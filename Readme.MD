# Playwright Test Suite

This repository contains test suite implemented with Typescript + Playwright. The tests cover product search, filtering, selection, adding products to the cart, and verifying cart updates.

## Prerequisites

Before running the tests, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/barurb1996/playwrightRespository.git
   cd playwrightRespository

2. **Install dependencies:**   
   ```bash
   npm install
   npx playwright install

## Test execution

1. **Run the tests:**
   ```bash
   npx playwright test

2. **Run selected spec:**
   ```bash
   npx playwright test tests/basicTests.spec.ts
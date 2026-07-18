# Playwright Automation Assignment

## Overview

This repository contains the UI and API automation solution for the Automation Anywhere assignment using **Playwright** with the **Page Object Model (POM)** design pattern.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv

---

## Project Structure

```
pages/
tests/
test-data/
auth/
```

---

## UI Automation

Automated the following workflow:

- Login
- Create Form
- Add Textboxes
- Configure Textbox properties
- Save Form
- Open Rules
- Create Rule1
- Add Conditions
- Configure AND condition
- Add Set Value action
- Create Rule2
- Create Rule3
- Save
- Verify Rules

Assertions:

- Add Rule button visibility
- Rule creation
- Expanded Rule cards
- Edit button visibility
- Condition configuration
- AND/OR selection
- Action assignment
- Add Rule Below functionality
- Rule persistence

Run UI tests

```bash
npx playwright test tests/ui
```

---

## API Automation

Automated:

- Create Learning Instance
- Validate response

Assertions:

- HTTP Status Code
- Response body
- ID
- Name
- Status
- Functional validation

Run API tests

```bash
npx playwright test tests/api
```

---

## Environment Variables

Create a `.env` file.

Example:

```
AA_URL=https://community.cloud.automationanywhere.digital/

AA_EMAIL=your_email

AA_PASSWORD=your_password

AA_TOKEN=your_api_token
```

---

## Install

```bash
npm install
```

Run all tests

```bash
npx playwright test
```
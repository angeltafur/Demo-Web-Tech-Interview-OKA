# Demo Web Tech Interview Project

## Introduction
This project is the provided solution for the Technical Interview Challenge. I have used the Page Object Model (POM) design pattern, parallelization of browsers and devices, and added utilities and hooks for proper functioning.

## Project Structure

The project is organized as follows:

```
Demo-Web-Tech-Interview-OKA/
├── src/
│   ├── common/
│   │       ├── Hooks.ts
│   │       ├── Utilities.ts
│   │       └── WaitDuration.ts
│   ├── pages/
│   │       ├── admin
│   │       │       ├── AddUserPage.ts
│   │       │       └── UserManagmentPage.ts
│   │       ├── BasePage.ts
│   │       ├── DashboardPage.ts
│   │       └── SidePanel.ts
│   └── tests/
│           ├── adminTests.spec.ts
│           ├── loginTests.spec.ts
│           └── userCreationTests.spec.ts
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

- **src/**: Contains all the source files.
    - **common/**: Common utilities and hooks.
    - **pages/**: Page Object Model (POM) files.
    - **tests/**: Contains all the test files.

## Requirements and language
- **Node.js**
- **Playwright**
- **TypeScript**

## How to install and execute
Install Playwright using:

 ```bash
 npm init playwright@latest
 ```
Run all tests with:
```bash
npx playwright test
```
Run all tests with a specific browser:

```bash
npx playwright test --project=chromium
```
or:
```bash
npx playwright test --project=firefox
```
Show execution report:
```bash
npx playwright show-report
```
# Demo Web Tech Interview Project

## Introduction
This project is the provided solution for the Technical Interview Challenge. I have used the Page Object Model (POM) design pattern, parallelization of browsers and devices, and added utilities and hooks for proper functioning.

## Configuración Completa / Complete Configuration
Para una explicación detallada en español de toda la configuración del proyecto, consulte: [CONFIGURACION_COMPLETA.md](./CONFIGURACION_COMPLETA.md)

*For a detailed explanation in Spanish of the complete project configuration, see: [CONFIGURACION_COMPLETA.md](./CONFIGURACION_COMPLETA.md)*

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

## Configuración Técnica / Technical Configuration

### Arquitectura del Proyecto / Project Architecture
- **Patrón de Diseño**: Page Object Model (POM)
- **Lenguaje**: TypeScript
- **Framework**: Playwright
- **Paralelización**: Soporte para múltiples navegadores y dispositivos
- **Aplicación Objetivo**: OrangeHRM Demo (https://opensource-demo.orangehrmlive.com)

### Navegadores Soportados / Supported Browsers
- **Desktop Chrome** (Chromium)
- **Desktop Firefox**
- **Mobile Chrome** (Pixel 5)
- **Tablet Chrome** (Galaxy Tab S4)

### Funcionalidades de Prueba / Test Features
- **Autenticación**: Login exitoso y fallido
- **Gestión de Usuarios**: Creación y administración de usuarios
- **Módulo Admin**: Validación de permisos y acciones
- **Cross-Browser Testing**: Pruebas en múltiples navegadores

### Configuración de Tiempos / Timeout Configuration
- **SHORT**: 15 segundos
- **MEDIUM**: 25 segundos  
- **LONG**: 45 segundos

### Hooks y Utilidades / Hooks and Utilities
- **beforeEach**: Navegación automática a login
- **afterEach**: Cierre automático de páginas
- **Utilities**: Formateo de strings y funciones auxiliares
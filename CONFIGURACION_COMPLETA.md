# Configuración Completa del Proyecto - Demo Web Tech Interview OKA

## Resumen General del Proyecto

Este es un proyecto de automatización de pruebas web desarrollado con **Playwright** y **TypeScript** que implementa el patrón de diseño **Page Object Model (POM)**. El proyecto está diseñado para realizar pruebas automatizadas sobre la aplicación demo de OrangeHRM.

## 1. Tecnologías y Dependencias

### Tecnologías Principales
- **Node.js**: Entorno de ejecución para JavaScript/TypeScript
- **TypeScript**: Lenguaje de programación tipado basado en JavaScript
- **Playwright**: Framework de automatización para pruebas web cross-browser
- **OrangeHRM Demo**: Aplicación web objetivo para las pruebas

### Dependencias del Proyecto
```json
{
  "devDependencies": {
    "@playwright/test": "^1.48.2",  // Framework de testing principal
    "@types/node": "^22.8.1"        // Tipos de TypeScript para Node.js
  }
}
```

## 2. Estructura del Proyecto

```
Demo-Web-Tech-Interview-OKA/
├── src/                          # Código fuente principal
│   ├── common/                   # Utilidades y configuraciones comunes
│   │   ├── Hooks.ts             # Hooks de configuración para las pruebas
│   │   ├── Utilities.ts         # Funciones utilitarias
│   │   └── WaitDuration.ts      # Enumeración de tiempos de espera
│   ├── pages/                   # Objetos de página (Page Object Model)
│   │   ├── admin/               # Páginas específicas del módulo admin
│   │   │   ├── AddUserPage.ts   # Página de creación de usuarios
│   │   │   └── UserManagementPage.ts # Página de gestión de usuarios
│   │   ├── BasePage.ts          # Clase base para todas las páginas
│   │   ├── DashboardPage.ts     # Página principal del dashboard
│   │   ├── LoginPage.ts         # Página de inicio de sesión
│   │   └── SidePanel.ts         # Panel lateral de navegación
│   └── tests/                   # Especificaciones de pruebas
│       ├── adminTests.spec.ts   # Pruebas del módulo administrativo
│       ├── loginTests.spec.ts   # Pruebas de autenticación
│       └── userCreationTests.spec.ts # Pruebas de creación de usuarios
├── playwright.config.ts         # Configuración principal de Playwright
├── package.json                 # Configuración del proyecto Node.js
├── .gitignore                   # Archivos ignorados por Git
└── README.md                    # Documentación del proyecto
```

## 3. Configuración de Playwright (playwright.config.ts)

### Configuración General
```typescript
export default defineConfig({
  testDir: './src/tests',          // Directorio de pruebas
  fullyParallel: true,             // Ejecución en paralelo
  forbidOnly: !!process.env.CI,    // Prohibir test.only en CI
  retries: process.env.CI ? 2 : 0, // Reintentos en CI
  workers: process.env.CI ? 1 : undefined, // Workers en CI
  reporter: 'html',                // Reportes en formato HTML
```

### Configuración de Uso Global
```typescript
use: {
  baseURL: 'https://opensource-demo.orangehrmlive.com', // URL base
  trace: 'on-first-retry',         // Trazas en el primer reintento
}
```

### Proyectos de Navegadores
El proyecto está configurado para ejecutar pruebas en múltiples navegadores y dispositivos:

1. **Desktop Chrome** (`chromium`)
2. **Desktop Firefox** (`firefox`)
3. **Mobile Chrome** (`Pixel 5`)
4. **Tablet Chrome** (`Galaxy Tab S4`)

## 4. Arquitectura Page Object Model (POM)

### BasePage.ts - Clase Base
La clase `BasePage` proporciona funcionalidades comunes para todas las páginas:

#### Métodos Principales:
- `waitForElementVisible()`: Espera a que un elemento sea visible
- `sendText()`: Envía texto a un campo de entrada
- `sendSuggestedText()`: Envía texto con autocompletado
- `clickElement()`: Hace clic en un elemento
- `assertElementIsVisible()`: Verifica que un elemento sea visible
- `assertPageIsVisibleByHeading()`: Verifica la página por su encabezado

#### Propiedades:
- `page`: Instancia de la página de Playwright
- `waitDuration`: Duración de espera predeterminada
- `util`: Instancia de utilidades

### Páginas Específicas

#### 1. LoginPage.ts
Maneja las funcionalidades de inicio de sesión:
- Campos de usuario y contraseña
- Botón de login
- Validación de credenciales inválidas

#### 2. DashboardPage.ts
Página principal después del login:
- Verificación de visibilidad del dashboard

#### 3. SidePanel.ts
Panel de navegación lateral:
- Navegación a diferentes módulos del sistema

#### 4. UserManagementPage.ts (Admin)
Gestión de usuarios en el módulo administrativo:
- Filtrado por rol de usuario
- Búsqueda de usuarios
- Verificación de acciones (editar/eliminar)
- Conteo de usuarios encontrados

#### 5. AddUserPage.ts (Admin)
Creación de nuevos usuarios:
- Selección de rol
- Ingreso de datos del empleado
- Configuración de estado
- Creación de credenciales

## 5. Utilidades y Configuraciones Comunes

### WaitDuration.ts
Enum que define tiempos de espera estándar:
```typescript
export enum WaitDuration {
    SHORT = 15000,   // 15 segundos
    MEDIUM = 25000,  // 25 segundos
    LONG = 45000     // 45 segundos
}
```

### Utilities.ts
Clase con funciones utilitarias:
- `formatString()`: Formatea strings con placeholders

### Hooks.ts
Configuración de hooks para las pruebas:
- `beforeEach`: Navega a la página de login antes de cada prueba
- `afterEach`: Cierra la página después de cada prueba

## 6. Especificaciones de Pruebas

### loginTests.spec.ts
Pruebas de autenticación:
1. **Login Exitoso**: Verificar login con credenciales válidas
2. **Login Fallido**: Verificar manejo de credenciales inválidas

### adminTests.spec.ts
Pruebas del módulo administrativo:
1. **Validación de Acciones**: Verificar que usuarios Admin tengan acciones de editar y eliminar

### userCreationTests.spec.ts
Pruebas de creación de usuarios:
1. **Crear Usuario**: Crear usuario con todos los campos requeridos y verificar notificación de éxito

## 7. Configuración de Ejecución

### Comandos Principales

#### Instalación:
```bash
npm init playwright@latest        # Inicializar proyecto Playwright
npm install                      # Instalar dependencias
npx playwright install          # Instalar navegadores
```

#### Ejecución de Pruebas:
```bash
npx playwright test                    # Ejecutar todas las pruebas
npx playwright test --project=chromium # Ejecutar en Chrome
npx playwright test --project=firefox  # Ejecutar en Firefox
npx playwright show-report            # Mostrar reporte de ejecución
```

## 8. Características Técnicas

### Paralelización
- **fullyParallel: true**: Las pruebas se ejecutan en paralelo para mayor eficiencia
- **workers**: Configurado según el entorno (CI vs local)

### Manejo de Errores
- **Reintentos**: 2 reintentos en CI, 0 en desarrollo local
- **Trazas**: Activadas en el primer reintento para debugging

### Cross-Browser Testing
- Soporte para múltiples navegadores y dispositivos
- Pruebas tanto en desktop como en mobile/tablet

### Reporting
- Reportes HTML detallados
- Trazas de ejecución para debugging

## 9. Patrones de Diseño Implementados

### Page Object Model (POM)
- Separación clara entre la lógica de pruebas y los elementos de la página
- Reutilización de código
- Mantenimiento simplificado

### Builder Pattern
- Uso de métodos encadenados para construcción de acciones

### Factory Pattern
- Creación consistente de objetos de página

## 10. Buenas Prácticas Implementadas

1. **Tipado Fuerte**: Uso de TypeScript para mejor mantenibilidad
2. **Esperas Explícitas**: Uso de `waitFor` en lugar de esperas fijas
3. **Localización Robusta**: Uso de XPath y selectores CSS específicos
4. **Manejo de Errores**: Validaciones y mensajes de error descriptivos
5. **Modularización**: Separación clara de responsabilidades
6. **Configuración Centralizada**: Configuración en archivos específicos

Este proyecto representa una implementación sólida y profesional de automatización de pruebas web, siguiendo las mejores prácticas de la industria y proporcionando una base escalable para pruebas futuras.
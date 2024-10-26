import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import '../common/Hooks';

test.describe('Funcionalidades de la página Login', () => {
  test('Validar Login Exitoso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.enterUsername('Admin');
    await loginPage.enterPassword('admin123');
    await loginPage.clickLoginButton();
    await dashboardPage.assertDashboardPageIsVisible();
  });


  test('Validar Login Fallido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterUsername('Admin');
    await loginPage.enterPassword('admin1234');
    await loginPage.clickLoginButton();
    await loginPage.assertInvalidCredentialsAlertIsVisible();
  });
});

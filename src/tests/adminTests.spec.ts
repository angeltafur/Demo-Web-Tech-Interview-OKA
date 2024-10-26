import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidePanel } from '../pages/SidePanel';
import { UserManagmentPage } from '../pages/admin/UserManagmentPage';
import '../common/Hooks';

test.describe('Funcionalidades de la página Admin', () => {
  test('Validar que los usarios Admin tengan las acciones de editar y elminar', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidePanel = new SidePanel(page);
    const userManagmentPage = new UserManagmentPage(page);
    
    await loginPage.enterUsername('Admin');
    await loginPage.enterPassword('admin123');
    await loginPage.clickLoginButton();
    await sidePanel.clickItemSidePanel('Admin');
    await userManagmentPage.selectUserRole('Admin');
    await userManagmentPage.clickSearchButton();
    await userManagmentPage.assertAllUsersHaveDeleteAndEditActions();
  });
});
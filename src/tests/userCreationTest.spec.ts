import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidePanel } from '../pages/SidePanel';
import { UserManagmentPage } from '../pages/admin/UserManagmentPage';
import { AddUserPage } from '../pages/admin/AddUserPage';
import '../common/Hooks';

test.describe("Creaciòn de usuarios y validación de campos", () => {
    test("Crear un usuario con los campos requeridos", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const sidePanel = new SidePanel(page);
        const userManagmentPage = new UserManagmentPage(page);
        const addUserPage = new AddUserPage(page);

        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        await loginPage.clickLoginButton();
        await sidePanel.clickItemSidePanel('Admin');

        await userManagmentPage.selectUserRole('Admin');
        await userManagmentPage.clickSearchButton();
        const count = await userManagmentPage.getCountUsersFound();
        await userManagmentPage.clickAddUserButton();
        await addUserPage.selectUserRole('Admin');
        await addUserPage.enterEmployeeName('Joseph Evans');
        await addUserPage.selectStatus('Enabled');
        await addUserPage.enterUsername('HappyTesting' + count);
        await addUserPage.enterPassword('HappyTesting123');
        await addUserPage.clickSaveButton();
        await userManagmentPage.assertSaveNotificationIsVisible();
    });
});
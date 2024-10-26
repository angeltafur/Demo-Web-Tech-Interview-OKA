import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class UserManagmentPage extends BasePage {
    private readonly selectUserRoleElement: Locator = this.page.locator("(//div[normalize-space()='User Role'][1]/following-sibling::div//div[contains(@class, 'oxd-select-text')])[1]");
    private readonly searchButton: Locator = this.page.locator("//div[@class='oxd-form-actions']/button[normalize-space()='Search']");
    private readonly usersFound: Locator = this.page.locator('.oxd-table-card');
    private readonly buttonDelete: Locator = this.page.locator("//button[i[@class='oxd-icon bi-trash']]");
    private readonly buttonEdit: Locator = this.page.locator("//button[i[@class='oxd-icon bi-pencil-fill']]");
    private readonly buttonAddUser: Locator = this.page.locator("//div[@class='orangehrm-paper-container']//button[normalize-space()='Add']");
    private readonly saveNotification: Locator = this.page.getByText('Successfully Saved');
    private readonly dataFound: Locator = this.page.locator("//div[@class='orangehrm-paper-container']/div[2]//span");


    constructor(page: Page) {
        super(page);
    }

    public async selectUserRole(userRole: string): Promise<void> {
        const userRoleElement: Locator = this.page.getByRole('option', { name: userRole });
        await this.clickElement(this.selectUserRoleElement);
        await this.clickElement(userRoleElement);
    }

    public async clickSearchButton(): Promise<void> {
        await this.clickElement(this.searchButton);
        await this.page.waitForLoadState('networkidle');
    }

    public async assertAllUsersHaveDeleteAndEditActions(): Promise<void> {
        const count = await this.usersFound.count();
        console.log(`Número de elementos encontrados: ${count}`);
        let button: Locator;
        for (let i = 0; i < count; i++) {
            button = this.usersFound.nth(i).locator(this.buttonDelete);
            await this.assertElementIsVisible(button);
            button = this.usersFound.nth(i).locator(this.buttonEdit);
            await this.assertElementIsVisible(button);
        }
    }

    public async clickAddUserButton(): Promise<void> {
        await this.clickElement(this.buttonAddUser);
    }

    public async assertSaveNotificationIsVisible(): Promise<void> {
        await this.assertElementIsVisible(this.saveNotification);
    }

    public async getCountUsersFound(): Promise<string> {
        this.waitForElementVisible(this.dataFound);
        const data = await this.dataFound.textContent();
        if (data) {
            const match = data.match(/\((\d+)\)/);
            if (match && match[1]) {
                return match[1];
            }
        }
        return '';
    }
}
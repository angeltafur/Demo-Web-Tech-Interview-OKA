import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AddUserPage extends BasePage {
    private readonly selectUserRoleElement: Locator = this.page.locator("(//div[normalize-space()='User Role'][1]/following-sibling::div//div[contains(@class, 'oxd-select-text')])[1]");
    private readonly employeeNameField: Locator = this.page.locator("//div[normalize-space()='Employee Name'][1]//input");
    private readonly selectStatusElement: Locator = this.page.locator("(//div[normalize-space()='Status'][1]/following-sibling::div//div[contains(@class, 'oxd-select-text')])[1]");
    private readonly userNameField: Locator = this.page.locator("//div[normalize-space()='Username'][1]//input");
    private readonly passwordField: Locator = this.page.locator("//div[normalize-space()='Password'][1]//input");
    private readonly confirmPasswordField: Locator = this.page.locator("//div[normalize-space()='Confirm Password'][1]//input");
    private readonly listBox: Locator = this.page.locator("//div[@role='listbox']");
    private readonly saveButton: Locator = this.page.locator("div.oxd-form-actions button:has-text('Save')");

    constructor(page: Page) {
        super(page);
    }

    public async selectUserRole(userRole: string): Promise<void> {
        const userRoleElement: Locator = this.page.getByRole('option', { name: userRole });
        await this.clickElement(this.selectUserRoleElement);
        await this.clickElement(userRoleElement);
    }

    public async enterEmployeeName(employeeName: string): Promise<void> {
        await this.sendSuggestedText(this.employeeNameField, employeeName);
        await this.selectOptionFromSuggestedList(this.listBox, employeeName);
    }

    public async selectStatus(status: string): Promise<void> {
        const statusElement: Locator = this.page.getByRole('option', { name: status });
        await this.clickElement(this.selectStatusElement);
        await this.clickElement(statusElement);
    }

    public async enterUsername(username: string): Promise<void> {
        await this.sendText(this.userNameField, username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.sendText(this.passwordField, password);
        await this.sendText(this.confirmPasswordField, password);
    }

    public async clickSaveButton(): Promise<void> {
        await this.clickElement(this.saveButton);
        await this.page.waitForLoadState('networkidle');
    }
}
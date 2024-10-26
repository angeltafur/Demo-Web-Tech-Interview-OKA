import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private readonly usernameField: Locator = this.page.locator("//input[@name='username']");
    private readonly passwordField: Locator = this.page.locator("//input[@name='password']");
    private readonly loginButton: Locator = this.page.locator("//button[normalize-space()='Login']");
    private readonly invalidCredentialsAlert: Locator = this.page.locator("//div[@role='alert']//p[text()='Invalid credentials']");

    constructor(page: Page) {
        super(page);
    }

    public async enterUsername(username: string): Promise<void> {
        await this.sendText(this.usernameField, username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.sendText(this.passwordField, password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    public async assertInvalidCredentialsAlertIsVisible(): Promise<void> {
        await this.assertElementIsVisible(this.invalidCredentialsAlert);
    }
}

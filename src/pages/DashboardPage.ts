import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    private readonly headerTitle = 'Dashboard';
    private readonly xpathHeaderTitle = "//span[@class='oxd-topbar-header-breadcrumb']/h6[text()='%s']";

    constructor(page: Page) {
        super(page);
    }

    public async assertDashboardPageIsVisible(): Promise<void> {
        await this.assertPageIsVisibleByHeading(this.headerTitle);
    }
}
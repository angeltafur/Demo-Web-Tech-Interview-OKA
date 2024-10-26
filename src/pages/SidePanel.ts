import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SidePanel extends BasePage {
    private readonly itemsSidePanel = "//nav[@aria-label='Sidepanel']//ul//a[normalize-space()='%s']"

    constructor(page: Page) {
        super(page);
    }

    public async clickItemSidePanel(item: string): Promise<void> {
        const itemSidePanel: Locator = this.page.locator(this.util.formatString(this.itemsSidePanel, item));
        await this.clickElement(itemSidePanel);
    }
}
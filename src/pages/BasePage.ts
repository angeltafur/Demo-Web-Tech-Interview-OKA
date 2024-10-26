import { Page, Locator, expect } from "@playwright/test";
import { WaitDuration } from "../common/WaitDuration";
import { Utilities } from "../common/Utilities";

export class BasePage {
    protected page: Page;
    private readonly waitDuration = WaitDuration.SHORT;
    public util = new Utilities();

    constructor(page: Page) {
        this.page = page;
    }

    // This method is used to wait for the element to be visible
    protected async waitForElementVisible(element: Locator): Promise<void> {
        try {
            await element.waitFor({ state: 'visible', timeout: this.waitDuration });
        } catch (error) {
            throw new Error(`Element with selector "${element}" is not visible after waiting for ${this.waitDuration / 1000} seconds`);
        }
    }

    // This methos is used to send text to the element
    protected async sendText(element: Locator, text: string): Promise<void> {
        this.waitForElementVisible(element);
        if (await element.isEnabled()) {
            await element.fill(text);
        } else {
            throw new Error(`Element with selector "${element}" is not enabled`);
        }
    }

    // This methos is used to send text to the element
    protected async sendSuggestedText(element: Locator, text: string): Promise<void> {
        this.waitForElementVisible(element);
        if (await element.isEnabled()) {
            await element.pressSequentially(text);
        } else {
            throw new Error(`Element with selector "${element}" is not enabled`);
        }
        this.page.waitForLoadState('networkidle');
    }

    // This method is used to click on the element
    protected async clickElement(element: Locator): Promise<void> {
        this.waitForElementVisible(element);
        if (await element.isEnabled()) {
            await element.click();
        } else {
            throw new Error(`Element with selector "${element}" is not enabled`);
        }
    }

    // This method is used to assert that the page is visible by the heading
    protected async assertPageIsVisibleByHeading(headerTitle: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: headerTitle })).toBeVisible();
    }

    // This method is used to assert that the element is visible
    protected async assertElementIsVisible(element: Locator): Promise<void> {
        await expect(element).toBeVisible();
    }

    // This method is used to wait for the element to be present in the DOM
    protected async waitForElementPresent(element: Locator): Promise<void> {
        try {
            await this.page.waitForLoadState('networkidle'); 
            await element.waitFor({ state: 'attached', timeout: this.waitDuration });
        } catch (error) {
            throw new Error(`Element with selector "${element}" is not present in the DOM after waiting for ${this.waitDuration / 1000} seconds`);
        }
    }

    // This method is used to select an option from the suggested list
    protected async selectOptionFromSuggestedList(suggestedList: Locator, option: string): Promise<void> {
        const optionElement: Locator = suggestedList.getByRole('option', { name: option });
        await this.clickElement(optionElement);
    }
}
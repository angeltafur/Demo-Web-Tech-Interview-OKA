import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
});

test.afterEach(async ({ page }) => {
    await page.close();
});
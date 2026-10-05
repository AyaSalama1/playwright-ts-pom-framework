import { test, expect } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

test('has title', async ({ page }) => {
const googlePage = new GoogleSearchPage(page);
await googlePage.goto();
await googlePage.searchFor('playwright');
await expect(page).toHaveTitle(/Playwright/);
});
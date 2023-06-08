import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Home Page', () => {
  test('present services in the home screen', async ({ page }) => {
    await page.goto('/');

    const servicesSection = await page.getByTestId(testIds.HOME_PAGE.HEADER);
    await expect(servicesSection).toBeVisible();
  });

  test('look and feel - header', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    await expect(
      await page.getByTestId(testIds.HOME_PAGE.HEADER)
    ).toHaveScreenshot('home-header.png');
  });

  test('look and feel - services section', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    await expect(
      await page.getByTestId(testIds.HOME_PAGE.SERVICES_SECTION)
    ).toHaveScreenshot('home-services.png');
  });
});

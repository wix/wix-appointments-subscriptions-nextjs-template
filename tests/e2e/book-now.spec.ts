import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Home Page', () => {
  let PATH = '/book-now';
  test('present book now page', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.BOOK_NOW_PAGE.HEADER)
    ).toBeVisible();
    await expect(
      await page.getByTestId(testIds.SERVICE_LIST.SERVICES_CONTAINER)
    ).toBeVisible();
  });

  test('look and feel - services', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.SERVICE_LIST.SERVICES_CONTAINER)
    ).toHaveScreenshot('service-list.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });
});

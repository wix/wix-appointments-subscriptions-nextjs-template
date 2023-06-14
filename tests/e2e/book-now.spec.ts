import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Book Now Page', () => {
  let PATH = '/book-now';
  test('present book now page', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.BOOK_NOW_PAGE.HEADER)
    ).toBeVisible();
    await expect(
      await page.getByTestId(testIds.SERVICE_LIST.CONTAINER)
    ).toBeVisible();
  });

  test('look and feel - services', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.SERVICE_LIST.CONTAINER)
    ).toHaveScreenshot('service-list.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test('navigation - "Service" navigates to "Calendar" page', async ({
    page,
  }) => {
    await page.goto(PATH);

    const firstService = await page
      .getByTestId(testIds.SERVICE_ITEM.CONTAINER)
      .first();

    await firstService.getByTestId(testIds.SERVICE_ITEM.BOOK_NOW_CTA).click();

    await expect(
      await page.getByTestId(testIds.CALENDAR_PAGE.HEADER)
    ).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Home Page', () => {
  const PATH = '/';
  test('present services in the home screen', async ({ page }) => {
    await page.goto(PATH);

    const servicesSection = await page.getByTestId(
      testIds.HOME_PAGE.SERVICES_SECTION
    );
    await expect(servicesSection).toBeVisible();
  });

  test('look and feel - header', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.HOME_PAGE.HEADER)
    ).toHaveScreenshot('home-header.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test('look and feel - services section', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.HOME_PAGE.SERVICES_SECTION)
    ).toHaveScreenshot('home-services.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test('navigation - "Book Now" navigates to "book-now" page', async ({
    page,
  }) => {
    await page.goto(PATH);

    await page.getByTestId(testIds.HOME_PAGE.BOOK_NOW_CTA).click();

    await expect(
      await page.getByTestId(testIds.BOOK_NOW_PAGE.HEADER)
    ).toBeVisible();
  });
});

import { test, expect, Page } from '@playwright/test';
import testIds from '@app/utils/test-ids';
import { waitForWixSite } from '@tests/e2e/utils/wix-checkout';

test.describe('Calendar Page', () => {
  const navigateToCalendar = async (page: Page) => {
    await page.goto('/book-now');

    const firstService = await page
      .getByTestId(testIds.SERVICE_ITEM.CONTAINER)
      .first();

    await firstService.getByTestId(testIds.SERVICE_ITEM.BOOK_NOW_CTA).click();
  };

  test('present calendar page', async ({ page }) => {
    await navigateToCalendar(page);

    await expect(
      await page.getByTestId(testIds.CALENDAR_PAGE.HEADER)
    ).toBeVisible();
  });

  test('navigation - "Calendar" navigates to "checkout" page', async ({
    page,
  }) => {
    await navigateToCalendar(page);

    const dayWithSlotSelector = `.${testIds.CALENDAR.DAY_WITH_SLOT_CLASSNAME}`;

    await page.waitForSelector(dayWithSlotSelector);
    await (await page.$$(dayWithSlotSelector)).pop()!.click();

    await page.getByTestId(testIds.CALENDAR.SLOT_CTA).last().click();
    await page.getByTestId(testIds.CALENDAR.CHECKOUT_CTA).click();

    await waitForWixSite(page);

    await expect(await page.getByText('Booking Details')).toBeVisible();
  });
});

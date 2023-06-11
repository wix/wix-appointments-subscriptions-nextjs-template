import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';
import { waitForWixSite } from '@tests/e2e/utils/wix-checkout';

test.describe('Plans Page', () => {
  let PATH = '/plans';
  test('present plans page', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.PLANS_PAGE.HEADER)
    ).toBeVisible();
    await expect(
      await page.getByTestId(testIds.PLAN_LIST.CONTAINER)
    ).toBeVisible();
  });

  test('look and feel - plans', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.PLAN_LIST.CONTAINER)
    ).toHaveScreenshot('plan-list.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test('navigation - "Plan" navigates to "Checkout" page', async ({ page }) => {
    await page.goto(PATH);

    const firstPlan = await page
      .getByTestId(testIds.PLAN_ITEM.CONTAINER)
      .first();

    await firstPlan.getByTestId(testIds.PLAN_ITEM.CHECKOUT_CTA).click();

    await waitForWixSite(page);

    await expect(await page.getByText('Order summary')).toBeVisible();
  });
});

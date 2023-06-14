import { Page } from '@playwright/test';

export const waitForWixSite = (page: Page) =>
  page.waitForSelector('#SITE_CONTAINER', { timeout: 10000 });

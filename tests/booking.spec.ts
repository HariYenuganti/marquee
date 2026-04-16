import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const TEST_EMAIL = 'playwright@example.com';

const prisma = new PrismaClient();

test.afterEach(async () => {
  await prisma.booking.deleteMany({ where: { email: TEST_EMAIL } });
});

test.afterAll(async () => {
  await prisma.$disconnect();
});

test('user can book tickets for an event', async ({ page }) => {
  await page.goto('/events/austin');

  await page.getByRole('link').filter({ has: page.locator('h2') }).first().click();
  await expect(page).toHaveURL(/\/event\/[a-z0-9-]+/);

  await page.getByRole('button', { name: 'Book tickets' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  await dialog.getByRole('button', { name: '2', exact: true }).click();
  await dialog.getByLabel('Full name').fill('Test User');
  await dialog.getByLabel('Email address').fill(TEST_EMAIL);

  await dialog.getByRole('button', { name: /confirm 2 tickets/i }).click();

  await expect(dialog.getByText('Booking confirmed!')).toBeVisible();
  await expect(dialog.getByText(/booking #\d+/i)).toBeVisible();
});

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

  // Event cards are <article> inside a <Link>; h3 holds the event name.
  await page
    .getByRole('link')
    .filter({ has: page.locator('h3') })
    .first()
    .click();
  await expect(page).toHaveURL(/\/event\/[a-z0-9-]+/);

  // Two "Book tickets" buttons render — one inline on the detail page (primary
  // CTA) and one on the sidebar. Clicking the first opens the modal.
  await page.getByRole('button', { name: /book tickets/i }).first().click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  await dialog.getByRole('button', { name: '2', exact: true }).click();
  await dialog.getByLabel('Full name').fill('Test User');
  await dialog.getByLabel('Email').fill(TEST_EMAIL);

  await dialog.getByRole('button', { name: /confirm 2 tickets/i }).click();

  // Success state — Marquee copy replaces "Booking confirmed!" with an eyebrow
  // + italic headline, plus the booking reference.
  await expect(dialog.getByText(/you're on the list/i)).toBeVisible();
  await expect(dialog.getByText(/see you there\./i)).toBeVisible();
  await expect(dialog.getByText(/booking #\d+/i)).toBeVisible();
});

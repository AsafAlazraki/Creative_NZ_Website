import { test, expect } from '@playwright/test';

test('home loads with hero headline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Supporting the arts');
});

test('skip link becomes visible on focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
});

test('language toggle links to /mi', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('link', { name: /Switch to Te reo Māori/i });
  await expect(toggle).toHaveAttribute('href', '/mi');
});

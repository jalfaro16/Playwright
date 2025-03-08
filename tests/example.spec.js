import { test, expect } from '@playwright/test';

test('Verificar que la página de Google carga correctamente', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

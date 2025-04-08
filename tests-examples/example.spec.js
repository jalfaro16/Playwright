import { test, expect } from '@playwright/test';

test('Verificar que la página de Google carga correctamente', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

//This is just a test1 03/082025 549PMCR

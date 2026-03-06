import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
  await page.goto('/')
})

test('revealed answers are hidden again after navigating away and back', async ({ page }) => {
  await page.getByRole('button', { name: 'Antwort anzeigen' }).click()
  await expect(page.getByText(/`var` ist funktionsscoped/i)).toBeVisible()

  await page.locator('.detail-top-actions').getByRole('button', { name: 'Nächste Frage' }).click()
  await page.locator('.detail-top-actions').getByRole('button', { name: 'Vorherige Frage' }).click()

  await expect(page.getByRole('button', { name: 'Antwort anzeigen' })).toBeVisible()
  await expect(page.getByText(/`var` ist funktionsscoped/i)).toHaveCount(0)
})

test('marked-only filter reduces the catalog to marked entries', async ({ page }) => {
  await page.locator('.detail-top-actions').getByRole('button', { name: 'Frage markieren' }).click()
  await page.getByRole('button', { name: 'Nur markierte' }).click()

  await expect(page.locator('.question-chip')).toHaveCount(1)
  await expect(page.getByRole('heading', { level: 2, name: '1 / 100' })).toBeVisible()
})

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
  await expect(page.getByRole('heading', { level: 2, name: '1 / 148' })).toBeVisible()
})

test('mobile layout prioritizes the detail panel above the catalog', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  const detailBox = await page.locator('.detail-panel').boundingBox()
  const catalogBox = await page.locator('.catalog-panel').boundingBox()

  expect(detailBox).not.toBeNull()
  expect(catalogBox).not.toBeNull()
  expect(detailBox!.y).toBeLessThan(catalogBox!.y)
})

test('mobile reveal state keeps detail content within the viewport width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Antwort anzeigen' }).click()

  const viewport = page.viewportSize()
  const detailTopline = await page.locator('.detail-topline').boundingBox()
  const revealBox = await page.locator('.reveal-box').boundingBox()
  const firstContentCard = await page.locator('.content-card').first().boundingBox()

  expect(viewport).not.toBeNull()
  expect(detailTopline).not.toBeNull()
  expect(revealBox).not.toBeNull()
  expect(firstContentCard).not.toBeNull()

  expect(detailTopline!.x + detailTopline!.width).toBeLessThanOrEqual(viewport!.width)
  expect(revealBox!.x + revealBox!.width).toBeLessThanOrEqual(viewport!.width)
  expect(firstContentCard!.x + firstContentCard!.width).toBeLessThanOrEqual(viewport!.width)
})

test('revealing an answer preserves the current scroll position', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, 500))

  const before = await page.evaluate(() => ({
    scrollY: window.scrollY,
    revealTop: document.querySelector('.reveal-box')?.getBoundingClientRect().top ?? 0,
  }))

  await page.getByRole('button', { name: 'Antwort anzeigen' }).click()

  const after = await page.evaluate(() => ({
    scrollY: window.scrollY,
  }))

  expect(Math.abs(after.scrollY - before.scrollY)).toBeLessThanOrEqual(20)
})

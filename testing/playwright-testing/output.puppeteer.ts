
import {test}  from '@playwright/test'

test('converted puppeteer test', async ({ page }) => {

  await page.setViewportSize({ width: 716, height: 633 })
  await page.goto("http://localhost:5173/")
  await page.getByLabel('delete-21').click({ position: { x: 15, y: 10.015625 } })
  await page.getByText("Delete Note").click({ position: { x: 46.703125, y: 16.5 } })

})

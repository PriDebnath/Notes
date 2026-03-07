import { test, expect, Page, TestInfo } from '@playwright/test';

const testData = {
  note_text: "playwright test content",
  tag_1: "simple",
  tag_2: "powerful",
};

async function createNote(page: Page, name: string) {
  await test.step(name, async () => {
    const navButton = page.locator("nav button").nth(0);
    await expect(navButton).toBeVisible();
    await navButton.click({ position: { x: 41, y: 26 } });

    const editor = page.locator("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").nth(0);
    await expect(editor).toBeVisible();
    await editor.click({ position: { x: 232.875, y: 76 } });

    await expect(editor).toBeVisible();
    await editor.type(testData.note_text);

    const rootDiv = page.locator("#root > div > div").nth(0);
    await expect(rootDiv).toBeVisible();
    await rootDiv.click({ position: { x: 522, y: 450 } });

    await page.locator("html").click({ position: { x: 695, y: 325 } });

    const tag1 = page.locator(`[aria-label="${testData.tag_1}"]`).nth(0);
    await expect(tag1).toBeVisible();
    await tag1.scrollIntoViewIfNeeded();
    await tag1.click();

    const saveBtn = page.locator("a > button").nth(0);
    await expect(saveBtn).toBeVisible();
    await saveBtn.click({ position: { x: 10.875, y: 24 } });
  })
}

async function readNote(page: Page, name: string) {
  await test.step(name, async () => {
    const note = page.getByText(testData.note_text).nth(0);

    await expect(note).toBeVisible();
    await note.scrollIntoViewIfNeeded();
    await note.click({ force: true });

    await expect(note).toBeVisible();
    const saveBtn = page.locator("a > button").nth(0);
    await expect(saveBtn).toBeVisible();
    await saveBtn.click({ position: { x: 10.875, y: 24 } });
  })
}

async function updateNote(page: Page, name: string) {
  await test.step(name, async () => {
    await page.locator("div:nth-of-type(1) > div:nth-of-type(1) > a > div").click();

    const editor = page.locator("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div");

    await editor.click();
    await editor.type(testData.note_text + " updated");

    await page.locator("html").click();

    const rootDiv = page.locator("#root > div > div").nth(0);
    await expect(rootDiv).toBeVisible();
    await rootDiv.click({ position: { x: 522, y: 450 } });

    const html = page.locator("html").nth(0);
    await expect(html).toBeVisible();
    await html.click({ position: { x: 695, y: 325 } });

    const tag2 = page.locator(`[aria-label="${testData.tag_2}"]`).nth(0);
    await expect(tag2).toBeVisible();
    await tag2.scrollIntoViewIfNeeded();
    await tag2.click({ force: true });

    await page.locator("div.fixed > div > div > div:nth-of-type(1) button:nth-of-type(3) > svg").click();

    await page.locator("a > button").click();
  })
}

async function deleteNote(page: Page, name: string) {
  await test.step(name, async () => {
    const search = page.locator('[aria-label="search-note"]').nth(0);
    await expect(search).toBeVisible();
    await search.scrollIntoViewIfNeeded();
    await search.click({ position: { x: 15, y: 10.015625 }, force: true });

    const delete1 = page.locator('[aria-label="delete-1"]').nth(0);
    await expect(delete1).toBeVisible();
    await delete1.scrollIntoViewIfNeeded();
    await delete1.click({ position: { x: 15, y: 10.015625 }, force: true });

    const confirmDelete = page.locator('[aria-label="delete"]').nth(0);
    await expect(confirmDelete).toBeVisible();
    await confirmDelete.scrollIntoViewIfNeeded();
    await confirmDelete.click({ position: { x: 46.703125, y: 16.5 }, force: true });
  })
}

test.describe('Note CRUD', () => {
  test.beforeEach(async ({ page }, testInfo: TestInfo) => {
    const baseUrl = testInfo.project.use.baseURL
    await page.setViewportSize({ width: 716, height: 633 });
    await page.goto(baseUrl);
  });

  test('Note CRUD test', async ({ page }) => {
    await createNote(page, "Step:1");
    await readNote(page, "Step:2");
    await updateNote(page, "Step:3");
    await deleteNote(page, "Step:4");
  });

});



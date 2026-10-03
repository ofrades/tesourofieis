import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-03T07:00:00"));
  await page.goto("/");
});

test("home shows the selected day, Mass, rosary, and morning prayer", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Selecionar data" })).toHaveText("3 de outubro");
  await expect(page.getByRole("link", { name: /Santa Teresa do Menino Jesus/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Orações do dia.*Rosário/s })).toBeVisible();
  await expect(page.getByRole("link", { name: /Oração da Manhã/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Oração da Noite/ })).toHaveCount(0);
});

test("prayer navigation opens a semantic heading", async ({ page }) => {
  await page.getByRole("link", { name: /Oração da Manhã/ }).click();
  await expect(page).toHaveURL(/\/devocionario\/dia\/oracaomanha/);
  await expect(page.getByRole("heading", { level: 1, name: /Manhã/ })).toBeVisible();
});

test("Angelus appears at midday and night prayer appears in the evening", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-03T12:00:00"));
  await page.reload();
  await expect(page.getByRole("link", { name: /Hora do Angelus.*Angelus/s })).toBeVisible();
  await page.clock.setFixedTime(new Date("2026-10-03T21:00:00"));
  await page.reload();
  await expect(page.getByRole("link", { name: /Oração da Noite/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Hora do Angelus.*Angelus/s })).toHaveCount(0);
});

test("search shortcut opens and closes repeatedly", async ({ page }) => {
  const input = page.getByRole("textbox", { name: "Pesquisar no Tesouro dos Fiéis" });
  for (let cycle = 0; cycle < 4; cycle++) {
    await page.keyboard.press("Control+k");
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
    await page.keyboard.press("Control+k");
    await expect(input).toBeHidden();
  }
  await page.keyboard.press("Control+k");
  await input.fill("Angelus");
  await expect(page.getByRole("heading", { name: "Angelus", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(input).toBeHidden();
});

test("phone header exposes menu and search actions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();
  await page.getByRole("button", { name: "Pesquisar", exact: true }).last().click();
  await expect(page.getByRole("textbox", { name: "Pesquisar no Tesouro dos Fiéis" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Filtros de pesquisa" })).toBeVisible();
});

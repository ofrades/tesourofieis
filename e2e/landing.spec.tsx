import { test, expect, type Page } from "@playwright/test";

const browserErrors = new WeakMap<Page, Error[]>();

test.beforeEach(async ({ page }) => {
  const errors: Error[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error));
  await page.clock.setFixedTime(new Date("2026-10-03T07:00:00"));
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
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
  await expect(page.getByRole("button", { name: "Selecionar data" })).toBeVisible();
  const input = page.getByRole("textbox", { name: "Pesquisar no Tesouro dos Fiéis" });
  // A rendered static header can precede hydration; first establish an interactive search.
  await page.getByRole("button", { name: "Pesquisar", exact: true }).last().click();
  await expect(input).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(input).toBeHidden();
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

test("phone reading honors the language preference and permits switching", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/devocionario/dia/angelus");
  await expect(page.getByRole("heading", { level: 1, name: "Angelus", exact: true })).toBeVisible();
  await expect(page.getByText("O Anjo do Senhor anunciou a Maria.", { exact: true })).toBeVisible();
  await expect(page.getByText("Angelus Dómini nuntiávit Maríæ.", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Latim", exact: true }).click();
  await expect(page.getByText("Angelus Dómini nuntiávit Maríæ.", { exact: true })).toBeVisible();
  await expect(page.getByText("O Anjo do Senhor anunciou a Maria.", { exact: true })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Português", exact: true }).click();
  await expect(page.getByText("O Anjo do Senhor anunciou a Maria.", { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.getByText("Angelus Dómini nuntiávit Maríæ.", { exact: true })).toBeVisible();
  await expect(page.getByText("O Anjo do Senhor anunciou a Maria.", { exact: true })).toBeVisible();
});

test("prayers remain readable when fonts fail", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  let failedRequests = 0;
  try {
    const page = await context.newPage();
    await page.route(/\.ttf(?:\?|$)/, async (route) => {
      failedRequests++;
      await route.abort();
    });
    await page.goto(`${baseURL}/devocionario/dia/angelus`);
    await expect.poll(() => failedRequests).toBeGreaterThan(0);
    await expect(page.getByRole("heading", { level: 1, name: "Angelus", exact: true })).toBeVisible();
    await expect(page.getByText("O Anjo do Senhor anunciou a Maria.", { exact: true })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("exported prayers are readable before JavaScript loads", async ({ browser }) => {
  test.skip(!process.env.E2E_BASE_URL, "Requires the production static export");
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${process.env.E2E_BASE_URL}/devocionario/dia/angelus`);
    await expect(
      page.getByRole("heading", { level: 1, name: "Angelus", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("O Anjo do Senhor anunciou a Maria.", { exact: true }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("failed search chunk loading can be retried", async ({ page }) => {
  test.skip(!process.env.E2E_BASE_URL, "Requires production search chunks");
  let failNext = true;
  await page.route("**/_expo/static/js/web/search-*.js", async (route) => {
    if (failNext) {
      failNext = false;
      await route.abort();
    } else {
      await route.continue();
    }
  });
  await page.getByRole("button", { name: "Pesquisar", exact: true }).last().click();
  await page.getByRole("textbox", { name: "Pesquisar no Tesouro dos Fiéis" }).fill("Angelus");
  await expect(page.getByText("Não foi possível pesquisar.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Tentar novamente" }).click();
  await expect(page.getByRole("heading", { name: "Angelus", exact: true })).toBeVisible();
});

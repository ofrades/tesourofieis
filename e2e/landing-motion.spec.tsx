import { test, expect } from "@playwright/test";

for (const width of [708, 1280]) {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    test(`landing cards retain their layout at ${width}px with ${reducedMotion} motion`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.emulateMedia({ reducedMotion });
      await page.clock.setFixedTime(new Date("2026-10-03T07:00:00"));
      await page.addInitScript(() => {
        document.addEventListener("animationstart", (event) => {
          if (event.animationName !== "landing-card-enter") return;
          const root = document.documentElement;
          root.dataset.cardEntrances = String(Number(root.dataset.cardEntrances ?? 0) + 1);
        });
      });
      await page.goto("/");
      const mass = page.getByRole("link", { name: /Santa Teresa do Menino Jesus/ });
      const rosary = page.getByRole("link", { name: /Orações do dia.*Rosário/s });
      const hymn = page.getByRole("link", { name: /Veni Creator Spiritus/ });
      await expect(mass).toBeVisible();
      await expect(rosary).toBeVisible();
      // Completion also establishes hydration, including when motion is disabled.
      await expect(page.locator(".landing-card-enter")).toHaveCount(0);
      const massBounds = await mass.boundingBox();
      const rosaryBounds = await rosary.boundingBox();
      const hymnBounds = await hymn.boundingBox();
      if (!massBounds || !rosaryBounds || !hymnBounds) throw new Error("Missing landing cards");
      expect(rosaryBounds.y).toBeGreaterThan(massBounds.y + massBounds.height);
      expect(hymnBounds.y).toBeGreaterThan(rosaryBounds.y + rosaryBounds.height);
      const entrances = await page.evaluate(() =>
        Number(document.documentElement.dataset.cardEntrances ?? 0),
      );
      if (reducedMotion === "reduce") expect(entrances).toBe(0);
      else expect(entrances).toBeGreaterThan(0);

      await page.getByRole("button", { name: "Dia seguinte" }).click();
      await expect(page.getByRole("button", { name: "Selecionar data" })).toHaveText(
        "4 de outubro",
      );
      await expect(page.locator(".landing-card-enter")).toHaveCount(0);
      expect(
        await page.evaluate(() => Number(document.documentElement.dataset.cardEntrances ?? 0)),
      ).toBe(entrances);
    });
  }
}

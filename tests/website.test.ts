//
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("https://www.terrariumspiders.eu/");
	await page.waitForSelector(".loader_bg", { state: "hidden" });
});

test("Go to the terrariumspiders website", async ({ page }) => {
	await expect(page).toHaveTitle(/Terrarium Spiders/);
	await expect(page).toHaveURL("https://www.terrariumspiders.eu/");
});

test("go to #About, #Tutorial, #Download, #Logo", async ({ page }) => {
	await page.click("text=about");
	await expect(page).toHaveURL(/.*about/);
	await expect(page.locator("#about")).toBeVisible();

	await page.click("text=tutorial");
	await expect(page).toHaveURL(/.*tutorial/);
	await expect(page.locator("#tutorial")).toBeVisible();

	await page.click("text=download");
	await expect(page).toHaveURL(/.*download/);
	await expect(page.locator("#download")).toBeVisible();

	await page.click(".logo");
	await expect(page).toHaveURL(/.*/);
	await expect(page.locator(".home")).toBeVisible();
});

test("go to #Spider", async ({ page, request }) => {
	await page.click(".navbar > a:nth-child(1)");
	const responce = await request.get(
		"https://www.terrariumspiders.eu/terrariumspiders/list_spiders.php"
	);
	expect(responce.status()).toBe(200);
});

test("Go to the google store website", async ({ page }) => {
	await page.click("text=download");
	await expect(page).toHaveURL(/.*download/);
	await page.locator(".flip-card").hover();
	await page.locator(".flip-card-back > a > img").first().click();
	await expect(page).toHaveURL(
		"https://play.google.com/store/apps/details?id=terrarium.spiders.terrariumspiders&hl=pl&gl=US"
	);
});

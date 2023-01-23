import { test, expect, request } from "@playwright/test";
import { List_Page } from "../list.page";

test.beforeEach(async ({ page }) => {
	await page.goto("https://www.terrariumspiders.eu/terrariumspiders/list.php");
});

test("add a new spider and see it in the list", async ({ page }) => {
	const list_page = new List_Page(page);

	//go to add spider
	await page.getByRole("link", { name: "Add" }).click();

	//complete the data
	const name = List_Page.generatorName();
	const body = List_Page.generatorBodyLength();
	const venom = List_Page.generatorVenom();
	const speed = List_Page.generatorSpeed();
	const temperament = List_Page.generatorTemperament();
	const hair = List_Page.generatorHair();
	const type = List_Page.generatorType();
	await list_page.add_or_edit_Spider(
		name,
		body,
		venom,
		speed,
		temperament,
		hair,
		type
	);

	//save spider
	await page.getByRole("button", { name: "Add" }).click();

	//go check spiders
	await page.waitForSelector(".link");
	await page.click("text=List");

	//go to the last page of the list
	await page.locator(".paginate_button").nth(-2).click();

	//go to the last spider
	await page.locator("text=Show").nth(-2).click();

	//check the data
	await list_page.check_spider(
		name,
		body,
		venom,
		speed,
		temperament,
		hair,
		type
	);
});

test("edit the spider and see it in the list", async ({ page }) => {
	const list_page = new List_Page(page);

	//go to the last page of the list
	await page.locator(".paginate_button").nth(-2).click();

	//go to the last spider
	await page.locator("text=Show").nth(-2).click();

	//go to data editing
	await page.click("text=Edit");

	//check edit data
	const name = List_Page.generatorName();
	const body = List_Page.generatorBodyLength();
	const venom = List_Page.generatorVenom();
	const speed = List_Page.generatorSpeed();
	const temperament = List_Page.generatorTemperament();
	const hair = List_Page.generatorHair();
	const type = List_Page.generatorType();
	await list_page.add_or_edit_Spider(
		name,
		body,
		venom,
		speed,
		temperament,
		hair,
		type
	);

	//edit spider
	await page.getByRole("button", { name: "Edit" }).click();

	//go check spiders
	await page.waitForSelector(".link");
	await page.click("text=Spider");

	//check the data
	await list_page.check_spider(
		name,
		body,
		venom,
		speed,
		temperament,
		hair,
		type
	);
});

test("check how many species of spiders are there", async ({ page }) => {
	let name_spiders = [
		"Brachypelma emilia",
		"Brachypelma auratum",
		"Brachypelma hamorii",
		"Brachypelma baumgarteni",
		"Brachypelma boehmei",
		"Brachypelma klaasi",
		"Brachypelma albiceps",
		"Brachypelma fossorium",
	];

	await test.step("use the search ", async () => {
		await page.getByLabel("Search:").fill("brachypelma");
	});

	await test.step("check the number of spiders", async () => {
		await expect(page.locator("tbody > tr")).toHaveCount(name_spiders.length);
	});

	for (let i = 0; i < name_spiders.length; i++) {
		await test.step(`check ` + name_spiders[i], async () => {
			expect(
				await page
					.locator(`tbody > tr:nth-child(${i + 1}) > td:nth-child(2)`)
					.textContent()
			).toBe(name_spiders[i]);
		});
	}
});

test("display json spiders", async ({ request }) => {
	const responce = await request.get(
		"https://www.terrariumspiders.eu/online/api.php"
	);
	expect(responce.status()).toBe(200);
	expect(responce.ok()).toBeTruthy();
});

//await page.screenshot({ path: 'screenshot.png', fullPage: true });
//const responsePromise = page.waitForResponse('**/api/fetch_data');

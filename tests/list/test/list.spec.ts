import { test, expect, request } from "@playwright/test";
import { List_Page } from "../../../object-page/list.page";
import { Search_Page } from "../../../object-page/search.page";

// Expected: "TERRESTRIAL"
// Received: "TERRESTRIAL,ARBOREAL"

//    at object-page/list.page.ts:111

//   109 |             expect(
//   110 |                     await this.page.locator("tbody > tr > td:nth-child(8)").innerHTML()

test.beforeEach(async ({ page }) => {
	await page.goto("https://www.terrariumspiders.eu/terrariumspiders/list.php");
});

test("add a new spider and see it in the list", async ({ page }) => {
	const list_page = new List_Page(page);
	const name = List_Page.generatorName();
	const body = List_Page.generatorBodyLength();
	const venom = List_Page.generatorVenom();
	const speed = List_Page.generatorSpeed();
	const temperament = List_Page.generatorTemperament();
	const hair = List_Page.generatorHair();
	const type = List_Page.generatorType();

	await test.step("go to add spider", async () => {
		await list_page.click_goto_add_spider();
	});

	await test.step("complete the data", async () => {
		await test.step("name", async () => {
			await list_page.fill_add_or_edit_Spider('input[name="name"]', name);
		});
		await test.step("body length", async () => {
			await list_page.fill_add_or_edit_Spider(
				'input[name="body_length"]',
				body
			);
		});
		await test.step("venom", async () => {
			await list_page.fill_add_or_edit_Spider('input[name="venom"]', venom);
		});
		await test.step("speed", async () => {
			await list_page.fill_add_or_edit_Spider('input[name="speed"]', speed);
		});
		await test.step("temperament", async () => {
			await list_page.fill_add_or_edit_Spider(
				'input[name="temperament"]',
				temperament
			);
		});
		await test.step("hair", async () => {
			await list_page.add_or_edit_Spider_hair(hair);
		});
		await test.step("type", async () => {
			await list_page.add_or_edit_Spider_type(type);
		});
	});

	await test.step("save spider", async () => {
		await list_page.click_creatorSpider_add_spider();
	});

	await test.step("go check spiders", async () => {
		await list_page.click_success_list();
	});

	await test.step("go to the last page of the list", async () => {
		await list_page.click_last_page_spider();
	});

	await test.step("go to the last spider", async () => {
		await list_page.click_last_show_spider();
	});

	await test.step("check the data", async () => {
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
});

test("edit the spider and see it in the list", async ({ page }) => {
	const list_page = new List_Page(page);
	const name = List_Page.generatorName();
	const body = List_Page.generatorBodyLength();
	const venom = List_Page.generatorVenom();
	const speed = List_Page.generatorSpeed();
	const temperament = List_Page.generatorTemperament();
	const hair = List_Page.generatorHair();
	const type = List_Page.generatorType();

	await test.step("go to the last page of the list", async () => {
		await list_page.click_last_page_spider();
	});

	await test.step("go to the last spider", async () => {
		await list_page.click_last_show_spider();
	});

	await test.step("go to data editing", async () => {
		await list_page.click_goto_edit_spider();
	});

	await test.step("check edit data", async () => {
		await test.step("name", async () => {
			await list_page.fill_add_or_edit_Spider('input[name="name"]', name);
		});
		await test.step("body length", async () => {
			await list_page.fill_add_or_edit_Spider(
				'input[name="body_length"]',
				body
			);
		});
		await test.step("venom", async () => {
			await list_page.fill_add_or_edit_Spider('input[name="venom"]', venom);
		});
		await test.step("speed", async () => {
			await list_page.fill_add_or_edit_Spider('input[name="speed"]', speed);
		});
		await test.step("temperament", async () => {
			await list_page.fill_add_or_edit_Spider(
				'input[name="temperament"]',
				temperament
			);
		});
		await test.step("hair", async () => {
			await list_page.add_or_edit_Spider_hair(hair);
		});
		await test.step("type", async () => {
			await list_page.add_or_edit_Spider_type(type);
		});
	});

	await test.step("edit spider", async () => {
		await list_page.click_creatorSpider_edit_spider();
	});

	await test.step("go check spiders", async () => {
		await list_page.click_success_spider();
	});

	await test.step("check the data", async () => {
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
});

test("check how many species of spiders are there", async ({ page }) => {
	const search_page = new Search_Page(page);
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

	await test.step("use the search", async () => {
		await search_page.useSearch("brachypelma");
	});

	await test.step("check the number of spiders", async () => {
		await search_page.check_spierLength(name_spiders.length);
	});

	for (let i = 0; i < name_spiders.length; i++) {
		await test.step(`check ` + name_spiders[i], async () => {
			await search_page.check_spiderName(name_spiders[i], i + 1);
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

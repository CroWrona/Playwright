import { expect, test } from "@playwright/test";
import { Website } from "../../../object-page/website.page";

test.beforeEach(async ({ page }) => {
	await page.goto("https://www.terrariumspiders.eu/");
	await page.waitForSelector(".loader_bg", { state: "hidden" });
});

test("Go to the terrariumspiders website", async ({ page }) => {
	await test.step("check Title", async () => {
		await expect(page).toHaveTitle(/Terrarium Spiders/);
	});
	await test.step("check Url", async () => {
		await expect(page).toHaveURL("https://www.terrariumspiders.eu/");
	});
});

test("Check background", async ({ page }) => {
	const website_page = new Website(page);
	await test.step(`go to logo`, async () => {
		await website_page.click_Locator(".logo");
		await website_page.check_Visible(".home");
		await website_page.check_To_Have_Url(/.*/);
	});
	await test.step(`check images background`, async () => {
		await website_page.check_img_background(
			".home",
			'url("https://www.terrariumspiders.eu/images/logo.png")'
		);
		await website_page.check_img_src(
			".logo > img:nth-child(1)",
			"images/quest0.png"
		);
	});
	await test.step(`check images`, async () => {
		await website_page.check_img_src(
			".logo > img:nth-child(2)",
			"images/quest1.png"
		);
		await website_page.check_img_src(
			".home > .row > .home-text > .container > img",
			"images/spiders.png"
		);
	});
	await test.step(`check text`, async () => {
		await website_page.check_Text(".home_title", "Terrarium Spiders");
		await website_page.check_Text(".home_desc", "New Mobile Game");
	});
});

test("Go to #About", async ({ page }) => {
	const website_page = new Website(page);
	await test.step(`go to #about`, async () => {
		await website_page.click_Text("about");
		await website_page.check_Visible("#about");
		await website_page.check_To_Have_Url(/.*about/);
	});
	await test.step(`check image`, async () => {
		await website_page.check_img_src(
			"#about > .container > .row > img",
			"images/1.png"
		);
	});
	await test.step(`check text`, async () => {
		await website_page.check_Text(
			"#about > div > div > div > h2",
			"Terrarium Spiders"
		);
		await website_page.check_Text(
			"#about > div > div > div > h3",
			"Breeding Spiders"
		);
		await website_page.check_Text(
			"#about > div > div > div > p",
			"Become a spider breeder at Terrarium Spiders! You will learn the basic information about tarantulas and you will learn what is needed to keep the farm in the best condition! The application is under development expect news!"
		);
	});
});

test("Go to #Tutorial", async ({ page, request }) => {
	const website_page = new Website(page);
	var title = [
		"Spiders",
		"Caring",
		"Quest",
		"Decoration",
		"Book",
		"Arena",
		"Venom",
		"Speed",
		"Temperament",
		"Cocoon",
		"Mystery Box",
	];
	var description = [
		"Each spider has its own unique strength and behavior!",
		"The better we take care of our spider, the faster it grows!",
		"Do missions to get rewards!",
		"Change the decor in the terrarium!",
		"The book contains basic information about spiders!",
		"Fight in the arena to win the cups!",
		"Venom is the determinant of attack power!",
		"Speed ​​gives you movement speed and a higher chance of dodging!",
		"The temperament denotes the character of a spider, the higher the more aggressive!",
		"Create a cocoon!",
		"Open the packages and get a new spider!",
	];
	var image_src = [
		"images/card_1.png",
		"images/t_fwc.png",
		"images/t_quest.png",
		"images/t_decoration.png",
		"images/t_book.png",
		"images/cup3.png",
		"images/attributevenom.png",
		"images/attributespeed.png",
		"images/attributetemperament.png",
		"images/cocoon.png",
		"images/mysterybox1.png",
	];
	await test.step(`go to #tutorial`, async () => {
		await website_page.click_Text("tutorial");
		await website_page.check_Visible("#tutorial");
		await website_page.check_To_Have_Url(/.*tutorial/);
	});
	for (let i = 0; i < image_src.length; i++) {
		await test.step(`Title : ${title[i]}`, async () => {
			await website_page.check_img_src(
				`#tutorial > .container > .box-container > .box:nth-child(${
					i + 1
				}) > .image > img`,
				image_src[i]
			);
		});
		await test.step(`Image : ${title[i]}`, async () => {
			await expect(
				page.locator(
					`#tutorial > .container > .box-container > .box:nth-child(${
						i + 1
					}) > .discount`
				)
			).toHaveText(title[i]);
		});
		await test.step(`Description : ${title[i]}`, async () => {
			await expect(
				page.locator(
					`#tutorial > .container > .box-container > .box:nth-child(${
						i + 1
					}) > .image > .icons > a`
				)
			).toHaveText(description[i]);
		});
	}
});

test("Go to #Spiders", async ({ page, request }) => {
	const website_page = new Website(page);
	await test.step(`go to #spiders`, async () => {
		await website_page.click_Locator(".navbar > a:nth-child(1)");
		await website_page.check_To_Have_Url(
			"https://www.terrariumspiders.eu/terrariumspiders/list_spiders.php"
		);
	});
	await test.step(`check status`, async () => {
		const responce = await request.get(
			"https://www.terrariumspiders.eu/terrariumspiders/list_spiders.php"
		);
		expect(responce.status()).toBe(200);
	});
});

test("Go to #Download", async ({ page }) => {
	const website_page = new Website(page);
	await test.step(`go to #download`, async () => {
		await website_page.click_Text("download");
		await website_page.check_Visible("#download");
		await website_page.check_To_Have_Url(/.*download/);
	});
	await test.step(`check image google store`, async () => {
		await website_page.check_img_src(
			".flip-card-back > a > img:nth-child(1)",
			"images/google-play-badge.svg"
		);
	});
	await test.step(`go to google store`, async () => {
		await website_page.goto_GoogleStore();
	});
});

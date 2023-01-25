import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class List_Page extends BasePage {
	readonly page: Page;
	readonly gotoAdd: Locator;
	readonly gotoEdit: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.gotoAdd = page.getByRole("link", { name: "Add" });
		this.gotoEdit = page.getByRole("link", { name: "Edit" });
	}

	async click_goto_add_spider() {
		await this.gotoAdd.click();
	}

	async click_goto_edit_spider() {
		await this.gotoEdit.click();
	}

	async click_success_list() {
		await this.page.waitForSelector(".link");
		await this.page.click("text=List");
	}

	async click_success_spider() {
		await this.page.waitForSelector(".link");
		await this.page.click("text=Spider");
	}

	async click_last_page_spider() {
		await this.page.locator(".paginate_button").nth(-2).click();
	}

	async click_last_show_spider() {
		await this.page.locator("text=Show").nth(-2).click();
	}

	async click_creatorSpider_add_spider() {
		await this.page.getByRole("button", { name: "Add" }).click();
	}

	async click_creatorSpider_edit_spider() {
		await this.page.getByRole("button", { name: "Edit" }).click();
	}

	async fill_add_or_edit_Spider(selector: string, text: string) {
		await this.page.locator(selector).fill(text);
	}

	async add_or_edit_Spider_hair(hair) {
		//console.log(hair);
		if (hair == "YES") {
			await this.page.getByRole("checkbox").nth(0).check();
		} else if (hair == "NO") {
			await this.page.getByRole("checkbox").nth(1).check();
		}
		await this.page.waitForTimeout(500);
	}

	async add_or_edit_Spider_type(type) {
		//console.log(type)
		switch (type) {
			case "TERRESTRIAL":
				await this.page.getByRole("checkbox").nth(2).check();
				await this.page.waitForTimeout(500);
				break;
			case "ARBOREAL":
				await this.page.getByRole("checkbox").nth(3).check();
				await this.page.waitForTimeout(500);
				break;
			case "BURROWING":
				await this.page.getByRole("checkbox").nth(4).check();
				await this.page.waitForTimeout(500);
				break;
		}
	}

	async check_spider(name, body, venom, speed, temperament, hair, type) {
		await this.page.waitForSelector("tbody > tr > td");
		//Name
		expect(
			await this.page.locator("tbody > tr > td:nth-child(2)").innerHTML()
		).toBe(name);
		//Body Length
		expect(
			await this.page.locator("tbody > tr > td:nth-child(3)").innerHTML()
		).toBe(body);
		//Venom
		expect(
			await this.page.locator("tbody > tr > td:nth-child(4)").innerHTML()
		).toBe(venom);
		//Speed
		expect(
			await this.page.locator("tbody > tr > td:nth-child(5)").innerHTML()
		).toBe(speed);
		//Temperament
		expect(
			await this.page.locator("tbody > tr > td:nth-child(6)").innerHTML()
		).toBe(temperament);
		//Urticating Hairs
		expect(
			await this.page.locator("tbody > tr > td:nth-child(7)").innerHTML()
		).toBe(hair);
		//Type
		expect(
			await this.page.locator("tbody > tr > td:nth-child(8)").innerHTML()
		).toBe(type);
		//console.log(await this.page.locator("tbody > tr").innerText());
		return;
	}

	static generatorName() {
		const characters = "abcdefghijklmnopqrstuvwxyz";
		let result = "";
		const resultLength = Math.floor(Math.random() * 20) + 10;
		for (let i = 0; i < resultLength; i++) {
			if (i > 0 && i % (resultLength / 2) == 0) result += " ";
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return result;
	}

	static generatorBodyLength() {
		let body = Math.floor(Math.random() * 12) + 1;
		return body.toString();
	}

	static generatorVenom() {
		let venom = Math.floor(Math.random() * 4) + 1;
		return venom.toString();
	}

	static generatorSpeed() {
		let speed = Math.floor(Math.random() * 4) + 1;
		return speed.toString();
	}

	static generatorTemperament() {
		let temperament = Math.floor(Math.random() * 4) + 1;
		return temperament.toString();
	}

	static generatorHair() {
		var hair = ["YES", "NO"][Math.floor(Math.random() * 2)];
		return hair;
	}

	static generatorType() {
		var type = ["TERRESTRIAL", "ARBOREAL", "BURROWING"][
			Math.floor(Math.random() * 3)
		];
		return type;
	}
}

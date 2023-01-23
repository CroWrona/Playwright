import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../../page-object/base.page";

export class List_Page extends BasePage {
	readonly page: Page;
	//readonly getStartedLink: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
	}

	async add_or_edit_Spider(name, body, venom, speed, temperament, hair, type) {
		await this.page.locator('input[name="name"]').fill(name);
		await this.page.locator('input[name="body_length"]').fill(body);
		await this.page.locator('input[name="venom"]').fill(venom);
		await this.page.locator('input[name="speed"]').fill(speed);
		await this.page.locator('input[name="temperament"]').fill(temperament);

		if (hair == "YES") {
			await this.page.getByRole("checkbox").nth(0).check();
		} else if (hair == "NO") {
			await this.page.getByRole("checkbox").nth(1).check();
		}

		switch (type) {
			case "TERRESTRIAL":
				await this.page.getByRole("checkbox").nth(2).check();
				break;
			case "ARBOREAL":
				await this.page.getByRole("checkbox").nth(3).check();
				break;
			case "BURROWING":
				await this.page.getByRole("checkbox").nth(4).check();
				break;
		}
	}

	async check_spider(name, body, venom, speed, temperament, hair, type) {
		// await test.step(`xyz : ` + name_spiders[i], async () => {
		// 	expect(
		// 		await page
		// 			.locator(`tbody > tr:nth-child(${i + 1}) > td:nth-child(2)`)
		// 			.textContent()
		// 	).toBe(name_spiders[i]);
		// });
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

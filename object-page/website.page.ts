import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class Website extends BasePage {
	readonly page: Page;
	constructor(page: Page) {
		super(page);
		this.page = page;
	}

	async goto_GoogleStore() {
		await this.page.locator(".flip-card").hover();
		await this.page.locator(".flip-card-back > a > img").first().click();
		await expect(this.page).toHaveURL(
			"https://play.google.com/store/apps/details?id=terrarium.spiders.terrariumspiders&hl=pl&gl=US"
		);
	}
}

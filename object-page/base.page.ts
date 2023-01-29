import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {
	readonly page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	async openUrl(url: string) {
		await this.page.goto(url);
	}

	async click_Text(text: string) {
		await this.page.click(`text=${text}`);
	}

	async click_Locator(locator: string) {
		await this.page.click(locator);
	}

	async check_Visible(locator: string) {
		await expect(this.page.locator(locator)).toBeVisible();
	}

	async check_not_Visible(locator: string) {
		await expect(this.page.locator(locator)).not.toBeVisible();
	}

	async check_To_Have_Url(url) {
		await expect(this.page).toHaveURL(url);
	}

	async check_Text(locator: string, text: string) {
		await expect(this.page.locator(locator)).toHaveText(text);
	}

	async check_status_200(url: string) {
		await this.page.waitForResponse(
			response => response.url() === url && response.status() === 200
		);
	}

	async check_status_404(url: string) {
		await this.page.waitForResponse(
			response => response.url() === url && response.status() === 404
		);
	}

	async check_img_background(locator: string, image: string) {
		await expect(this.page.locator(locator)).toHaveCSS(
			"background-image",
			image
		);
	}

	async check_img_src(locator: string, image: string) {
		await expect(this.page.locator(locator)).toHaveAttribute("src", image);
	}

	// async shouldBeOpened() {
	// 	await this.waitForLoadState("networkidle");
	// 	await this.waitForLoadState("domcontentloaded");
	// 	if (this.pageSelector) {
	// 		await this.waitForPageSelector();
	// 	}
	// 	if (this.partialUrl) {
	// 		await this.validateUrl();
	// 	}
	// 	if (this.tabName) {
	// 		await this.validateTabName();
	// 	}
	// }

	// async waitForUrl(url: string) {
	// 	await this.page().waitForURL(url);
	// }

	// //stany zaladowany, caly dom zaladowany, nie ida requsty w tle
	// async waitForLoadState(
	// 	state?: "load" | "domcontentloaded" | "networkidle",
	// 	options?: { timeout?: number }
	// ) {}

	// async waitForPageSelector() {
	// 	if (!this.pageSelector) {
	// 		throw new Error("You need to specify page slector to be a");
	// 	}
	// 	await this.page.page().waitForSelector(this.pageSelector);
	// }

	// async validateUrl() {
	// 	if (!this.paretialUrl) {
	// 		throw new Error("Can't checkUrl because url is not specified");
	// 	}
	// 	await this.page.page().waitForURL(this.paretialUrl);
	// }

	// async validateTabName() {
	// 	if (!this.tabName) {
	// 		throw new Error("Can't checkTitle because title is not specified");
	// 	}
	// 	const actualTitle = await this.page.page().title();
	// 	expect(actualTitle).toEqual(this.tabName);
	// }
}

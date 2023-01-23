import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {
	readonly page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	async openUrl(url: string) {
		await this.page.goto(url);
	}

	async clickLocator(locator: string) {
		await this.page.click(locator);
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

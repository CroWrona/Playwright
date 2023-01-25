import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class Search_Page extends BasePage {
	readonly page: Page;
	constructor(page: Page) {
		super(page);
		this.page = page;
	}

	async useSearch(text: string) {
		await this.page.getByLabel("Search:").fill(text);
	}

	async check_spierLength(count: number) {
		await expect(this.page.locator("tbody > tr")).toHaveCount(count);
	}

	async check_spiderName(name: string, count: number) {
		expect(
			await this.page
				.locator(`tbody > tr:nth-child(${count}) > td:nth-child(2)`)
				.textContent()
		).toBe(name);
	}
}

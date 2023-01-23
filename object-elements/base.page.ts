import { expect, Locator, Page } from "@playwright/test";

export abstract class BaseElement {
	readonly page: Page;
	readonly locator: Locator;
	constructor(page: Page, locator: Locator) {
		this.page = page;
		this.locator = locator;
	}

	element(): Locator {
		return this.page.locator(`${this.locator}`);
	}

	public async toBeVisible() {
		await this.element().waitFor({ state: "visible" });
	}

	public async toBeHidden() {
		await this.element().waitFor({ state: "hidden" });
	}

	public async toHaveText(text: string) {
		await expect(this.element()).toHaveText(text);
	}

	public async toBeEnabled() {
		await expect(this.element()).toBeEnabled();
	}

	public async toBeDisabled() {
		await expect(this.element()).toBeDisabled();
	}

	public async click() {
		return await this.element().click();
	}

	public async doubleClick() {
		return await this.element().dblclick();
	}

	public async press(key: string) {
		return await this.element().press(key);
	}
}

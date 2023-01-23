import { Locator, Page } from "@playwright/test";
import { BaseElement } from "./base.page";

export class CheckboxElement extends BaseElement {
	constructor(page: Page, locator: Locator) {
		super(page, locator);
	}
	async check() {
		await this.element().check();
	}
}

export function getCheckboxElement(
	page: Page,
	locator: Locator
): CheckboxElement {
	return new CheckboxElement(page, locator);
}

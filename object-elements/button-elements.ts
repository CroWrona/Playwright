import { Locator, Page } from "@playwright/test";
import { BaseElement } from "./base.page";

export class ButtonElement extends BaseElement {
	constructor(page: Page, locator: Locator) {
		super(page, locator);
	}
}

export function getButtonElement(page: Page, locator: Locator): ButtonElement {
	return new ButtonElement(page, locator);
}

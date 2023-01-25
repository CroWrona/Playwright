import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class Log_in_Page extends BasePage {
	readonly page: Page;
	readonly name: Locator;
	readonly email: Locator;
	readonly password: Locator;
	readonly button: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.name = page.locator("#user");
		this.email = page.locator("#email");
		this.password = page.locator("#password");
		this.button = page.locator(".form__button");
	}

	async click_button() {
		await this.button.waitFor();
		await this.button.click();
	}

	async fill_name(name: string) {
		await this.name.fill(name);
	}

	async fill_email(email: string) {
		await this.email.fill(email);
	}

	async fill_password(password: string) {
		await this.password.fill(password);
	}

	async alert_true_register() {
		await expect(this.page.locator(".form h4 ")).toHaveText(
			"You are registered successfully."
		);
		await expect(this.page.locator(".form p")).toHaveText(
			"Click here to Login"
		);
		await this.page.click("text=Login");
	}

	async alert_true_login(name: string) {
		await expect(this.page.locator(".form__button")).toHaveText(`${name}`);
	}

	async alert_false_login() {
		await expect(this.page.locator(".form h4 ")).toHaveText(
			"Incorrect Username/password."
		);
		await expect(this.page.locator(".form p")).toHaveText(
			"Click here to Login again."
		);
		await this.page.click("text=Login");
	}

	static generatorName() {
		const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
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

	static generatorEmail() {
		const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const resultLength = Math.floor(Math.random() * 5) + 9;
		for (let i = 0; i < resultLength; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return `${result + "@test.eu"}`;
	}

	static generatorPassword() {
		var characters = "abcdefghijklmnopqrstuvwxyz";
		let result = "";
		for (let i = 0; i < 5; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		characters = characters.toUpperCase();
		for (let i = 0; i < 5; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		const characters_special = "!@#$%^&";
		for (let i = 0; i < 5; i++) {
			result += characters_special.charAt(
				Math.floor(Math.random() * characters_special.length)
			);
		}
		const characters_number = "1234567890";
		for (let i = 0; i < 5; i++) {
			result += characters_number.charAt(
				Math.floor(Math.random() * characters_number.length)
			);
		}
		return result;
	}
}

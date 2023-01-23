import { test } from "@playwright/test";
import { Log_in_Page } from "../log_in.page";
require("dotenv").config();

test.beforeEach(async ({ page }) => {
	await page.goto(
		"https://www.terrariumspiders.eu/terrariumspiders/list_spiders.php"
	);
	await page.getByRole("link", { name: "Log in" }).click();
});

const name = Log_in_Page.generatorName();
const email = Log_in_Page.generatorEmail();
const password = Log_in_Page.generatorPassword();

test.describe(() => {
	test.describe.configure({ mode: "serial" });
	test("Create an account", async ({ page }) => {
		const log_in_page = new Log_in_Page(page);
		await log_in_page.clickLocator("text=Create Account");
		await log_in_page.fill_name(name);
		await log_in_page.fill_email(email);
		await log_in_page.fill_password(password);
		await log_in_page.click_button();
		await log_in_page.alert_true_register();
	});
	test("log in", async ({ page }) => {
		const log_in_page = new Log_in_Page(page);
		await log_in_page.fill_name(name);
		await log_in_page.fill_password(password);
		await log_in_page.click_button();
		await log_in_page.alert_true_login(name);
	});
});

test("Sign in - wrong", async ({ page }) => {
	const log_in_page = new Log_in_Page(page);
	await log_in_page.fill_name("nameWrong");
	await log_in_page.fill_password("passwordWrong");
	await log_in_page.click_button();
	await log_in_page.alert_false_login();
});

test("Sign in - good", async ({ page }) => {
	const log_in_page = new Log_in_Page(page);
	await log_in_page.fill_name(`${process.env.EMAIL}`);
	await log_in_page.fill_password(`${process.env.PASSWORD}`);
	await log_in_page.click_button();
	await log_in_page.alert_true_login(`${process.env.EMAIL}`);
});

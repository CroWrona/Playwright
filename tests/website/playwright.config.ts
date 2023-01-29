import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	testDir: "./tests",
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	// reporter: [
	// 	["list"],
	// 	["json", { outputFile: "test-result.json" }],
	// 	["html", { outputFolder: "my-report" }],
	// 	["junit", { outputFile: "results.xml" }],
	// 	["allure-playwright", { outputFolder: "my-allure-result" }],
	// ],
	use: {
		headless: false,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,

		actionTimeout: 0,
		trace: "on-first-retry",
	},

	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
};

export default config;

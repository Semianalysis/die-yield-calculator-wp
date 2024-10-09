import React from "react";
import App from "./App";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("App", () => {
	it("calculates the correct number of total 10mm dies on a 300mm panel with no scribe lines", async () => {
		render(<App />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("radio", {
			name: /Panel/
		}));

		const widthInput = screen.getByRole("spinbutton", {
			name: /Width/
		});
		const scribeLinesXInput = screen.getByRole("spinbutton", {
			name: /Scribe Lines X/
		});
		const scribeLinesYInput = screen.getByRole("spinbutton", {
			name: /Scribe Lines Y/
		});
		const maintainAspectRatioCheckbox = screen.getByRole("checkbox", { name: /Aspect Ratio/ });

		await user.click(maintainAspectRatioCheckbox);
		await user.clear(widthInput);
		await user.type(widthInput, "5");
		await user.clear(scribeLinesXInput);
		await user.type(scribeLinesXInput, "0");
		await user.clear(scribeLinesYInput);
		await user.type(scribeLinesYInput, "0");

		const expected = Math.pow(300 / 5, 2);

		expect(await screen.findByText(new RegExp(expected.toString()))).toBeInTheDocument();
	});

	it("calculates yields for wafer shape", async () => {
		render(<App />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("radio", {
			name: /Wafer/
		}));
		await waitFor(() => expect(screen.getByText(/976/)).toBeInTheDocument());
	});

	it("displays a breakdown of die states whose sum equals the total number of dies", async () => {
		render(<App />);

		// Get the number of dies displayed for each state and the total number of dies.
		let totalDiesCount = 0;
		let allStatesCount = 0;
		await Promise.all([
			"Total",
			"Good",
			"Defective",
			"Partial",
			"Lost"
		].map(async (label) => {
			const regex = new RegExp(`${label} Dies`);
			const textNode = await screen.findByText(regex);

			if (textNode.textContent) {
				// Wait for the calculation to appear
				const countStr = await within(textNode).findByText(/\d+/);

				if (countStr.textContent) {
					const countMatch = countStr.textContent.match(/\d+/)?.[0];
					const countNum = countMatch ? parseInt(countMatch) : 0;

					if (label === "Total") {
						totalDiesCount = countNum;
					} else {
						allStatesCount += countNum;
					}
				}
			}
		}));

		expect(totalDiesCount).toBeGreaterThan(0);
		expect(totalDiesCount).toEqual(allStatesCount);
	});

	it("automatically adjusts the other die dimension input when one is changed with maintain aspect ratio on", async () => {
		render(<App />);
		const user = userEvent.setup();
		const maintainAspectRatioCheckbox = screen.getByRole("checkbox", { name: /Aspect Ratio/ });
		const dieWidthInput = screen.getByRole("spinbutton", { name: /Width/ });
		const dieHeightInput = screen.getByRole("spinbutton", { name: /Height/ });

		// Aspect ratio off by default
		expect(maintainAspectRatioCheckbox).not.toBeChecked();

		// Assert we can enter a height without width updating
		await user.clear(dieHeightInput);
		await user.type(dieHeightInput, "13");
		await user.clear(dieWidthInput);
		await user.type(dieWidthInput, "19");
		expect(dieHeightInput).toHaveDisplayValue("13");
		expect(dieWidthInput).toHaveDisplayValue("19");

		// ...and a width value without height updating
		await user.clear(dieWidthInput);
		await user.type(dieWidthInput, "9");
		expect(dieWidthInput).toHaveDisplayValue("9");
		expect(dieHeightInput).toHaveDisplayValue("13");

		// Make both values the same
		await user.clear(dieWidthInput);
		await user.type(dieWidthInput, "13");

		// Turn maintain aspect ratio on
		await user.click(maintainAspectRatioCheckbox);
		expect(maintainAspectRatioCheckbox).toBeChecked();

		// Type a new value in width, height automatically updates
		await user.clear(dieWidthInput);
		await user.type(dieWidthInput, "14.5");
		expect(dieHeightInput).toHaveDisplayValue("14.5");

		// .. and vice versa
		await user.clear(dieHeightInput);
		await user.type(dieHeightInput, "2");
		expect(dieHeightInput).toHaveDisplayValue("2");
	});
});

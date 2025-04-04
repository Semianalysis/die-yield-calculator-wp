import React from "react";
import App from "./App";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("App", () => {
	it("calculates the correct number of total 5mm dies on a 300mm panel with no scribe lines", async () => {
		render(<App />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("radio", {
			name: /Panel/
		}));

		const widthInput = screen.getByRole("spinbutton", {
			name: /Width/
		});
		const scribeLinesXInput = screen.getByRole("spinbutton", {
			name: /Scribe Line Minimum X/
		});
		const scribeLinesYInput = screen.getByRole("spinbutton", {
			name: /Scribe Line Minimum Y/
		});
		const maintainAspectRatioCheckbox = screen.getByRole("checkbox", { name: /Aspect Ratio/ });

		await user.click(maintainAspectRatioCheckbox);
		await user.clear(widthInput);
		await user.type(widthInput, "5");
		await user.clear(scribeLinesXInput);
		await user.type(scribeLinesXInput, "0");
		await user.clear(scribeLinesYInput);
		await user.type(scribeLinesYInput, "0");

		// How many 26mm x 33mm field shots can we fit in the panel?
		const fielCountX = Math.ceil(300 / 26);
		const fieldCountY = Math.ceil(300 / 33);
		const fieldCount = fielCountX * fieldCountY;
		// How many 5mm square dies can we fit in a single field shot?
		const dieCountX = Math.floor(26 / 5);
		const dieCountY = Math.floor(33 / 5);
		const dieCount = dieCountX * dieCountY;
		// How many dies can we fit in the entire panel?
		const totalDieCount = fieldCount * dieCount;

		expect(await screen.findByText(new RegExp(totalDieCount.toString()))).toBeInTheDocument();
	});

	it("calculates yields for wafer shape", async () => {
		render(<App />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("radio", {
			name: /Wafer/
		}));
		// No notch keepout
		await user.type(screen.getByRole("spinbutton", {
			name: /Notch keep-out/
		}), "{backspace}0");
		await waitFor(() => expect(screen.getByText(/1104/)).toBeInTheDocument());
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
			"Excluded"
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

	it("shows how many full and partial shots will be taken and how many die fit on a reticle", async () => {
		render(<App />);
		const totalDiesNode = await screen.findByText(/Total Dies: [0-9]+/);
		const totalDies = parseInt(totalDiesNode.textContent?.match(/\d+/)?.[0] || "0");

		// Get the number of dies per shot
		const diePerReticleNode = await screen.findByText(/Die Per Reticle: [0-9]+/);
		const diePerReticle = parseInt(diePerReticleNode.textContent?.match(/\d+/)?.[0] || "0");

		// Get the number of shots
		const shotCountNode = await screen.findByText(/Exposures: [0-9]+/);
		const shotCount = parseInt(shotCountNode.textContent?.match(/\d+/)?.[0] || "0");

		// The total number of dies should be the number of dies per shot times the number of shots
		expect(totalDies).toEqual(diePerReticle * shotCount);
	});

	describe("defects inputs", () => {
		const yieldModelOptions = [
			"Poisson Model",
			"Murphy's Model",
			"Rectangular Model",
			"Moore's Model",
			"Seeds Model",
			"Bose-Einstein Model",
			"Manual",
		];

		it.each(yieldModelOptions)("shows the correct inputs for %s", async (model) => {
			render(<App />);
			const user = userEvent.setup();
			const yieldModelSelect = await screen.findByRole("combobox", { name: "Yield Calculation Model" });
			await user.selectOptions(yieldModelSelect, model);
			switch (model) {
				case "Poisson Model":
				case "Murphy's Model":
				case "Rectangular Model":
				case "Moore's Model":
				case "Seeds Model":
					expect(screen.queryByRole("spinbutton", { name: /Defect Rate/ })).toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Critical Die Area/ })).toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Manual Yield/ })).not.toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Critical Layers/ })).not.toBeInTheDocument();
					break;
				case "Bose-Einstein Model":
					expect(screen.queryByRole("spinbutton", { name: /Defect Rate/ })).toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Critical Die Area/ })).toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Manual Yield/ })).not.toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Critical Layers/ })).toBeInTheDocument();
					break;
				case "Manual":
					expect(screen.queryByRole("spinbutton", { name: /Yield/ })).toBeInTheDocument()
					expect(screen.queryByRole("spinbutton", { name: /Defect Rate/ })).not.toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Critical Die Area/ })).not.toBeInTheDocument();
					expect(screen.queryByRole("spinbutton", { name: /Critical Layers/ })).not.toBeInTheDocument();
			}
		});
	})
});

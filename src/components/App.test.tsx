import React from "react";
import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
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
			name: /Scribe Lines Horiz/
		});
		const scribeLinesYInput = screen.getByRole("spinbutton", {
			name: /Scribe Lines Vert/
		});

		await user.clear(widthInput);
		await user.type(widthInput, "5");
		await user.clear(scribeLinesXInput);
		await user.type(scribeLinesXInput, "0");
		await user.clear(scribeLinesYInput);
		await user.type(scribeLinesYInput, "0");

		const expected = Math.pow(300 / 5, 2);

		expect(screen.queryByText(new RegExp(expected.toString()))).toBeInTheDocument();
	});

	it("calculates yields for wafer shape", async () => {
		render(<App />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("radio", {
			name: /Disc/
		}));
		await waitFor(() => expect(screen.getByText(/976/)).toBeInTheDocument());
	});

	it("displays a breakdown of die states whose sum equals the total number of dies", () => {
		render(<App />);

		// Get the number of dies displayed for each state and the total number of dies.
		let totalDiesCount = 0;
		let allStatesCount = 0;
		[
			"Total",
			"Good",
			"Defective",
			"Partial",
			"Lost"
		].forEach((label) => {
			const regex = new RegExp(`${label} Dies`);
			const textNode = screen.getByText(regex).textContent;

			if (textNode) {
				const countStr = textNode.match(/\d+/)?.[0];

				if (countStr) {
					const countNum = parseInt(countStr);

					if (label === "Total") {
						totalDiesCount = countNum;
					} else {
						allStatesCount += countNum;
					}
				}
			}
		});

		expect(totalDiesCount).toBeGreaterThan(0);
		expect(totalDiesCount).toEqual(allStatesCount);
	});
});

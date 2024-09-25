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
		await user.type(widthInput, "10");
		await user.clear(scribeLinesXInput);
		await user.type(scribeLinesXInput, "0");
		await user.clear(scribeLinesYInput);
		await user.type(scribeLinesYInput, "0");

		const expected = Math.pow(300 / 10, 2);

		expect(screen.queryByText(new RegExp(expected.toString()))).toBeInTheDocument();
	});

	it("calculates yields for wafer shape", async () => {
		render(<App />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("radio", {
			name: /Disc/
		}));
		await waitFor(() => expect(screen.getByText(/977/)).toBeInTheDocument());
	});
});

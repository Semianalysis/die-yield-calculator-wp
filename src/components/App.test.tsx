import React from 'react';
import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
	it("calculates the correct number of dies for the default", async () => {
		render(<App />);
		expect(screen.queryByText(/1296/)).toBeInTheDocument();
	});
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { ResultsStats } from "./ResultsStats";
import { FabResults } from "../../types";

const results: FabResults = {
	totalDies: 100,
	diePerRow: 2,
	diePerCol: 2,
	goodDies: 90,
	defectiveDies: 5,
	partialDies: 3,
	lostDies: 2,
	fabYield: 0.9,
	dies: [],
	fields: []
};

describe("ResultStats", () => {
	it("renders the ResultsStats component with correct values", () => {
		render(
			<ResultsStats
				results={results}
				shape="Panel"
				dieWidth={10}
				dieHeight={10}
				waferWidth={300}
				waferHeight={400}
			/>
		);

		expect(screen.getByText(/Total Dies: 100/i)).toBeInTheDocument();
		expect(screen.getByText(/Good Dies: 90/i)).toBeInTheDocument();
		expect(screen.getByText(/Defective Dies: 5/i)).toBeInTheDocument();
		expect(screen.getByText(/Partial Dies: 3/i)).toBeInTheDocument();
		expect(screen.getByText(/Lost Dies: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/Fab Yield: 90%/i)).toBeInTheDocument();
		expect(screen.getByText(/Total Die Area: 100cm²/i)).toBeInTheDocument();
	});

	it("renders the wafer diameter for wafer-type substrate", () => {
		render(
			<ResultsStats
				results={results}
				shape="Wafer"
				dieWidth={10}
				dieHeight={10}
				waferWidth={200}
				waferHeight={200}
			/>
		);

		expect(screen.getByText(/Wafer Diameter: 200mm/i)).toBeInTheDocument();
		expect(screen.getByText(/Wafer Area: 314\.1593cm²/i)).toBeInTheDocument();
	});

	it("renders the width and height for panel-type substrate", () => {
		render(
			<ResultsStats
				results={results}
				shape="Panel"
				dieWidth={10}
				dieHeight={10}
				waferWidth={200}
				waferHeight={200}
			/>
		);

		expect(screen.getByText(/Panel Width: 200/i)).toBeInTheDocument();
		expect(screen.getByText(/Panel Height: 200/i)).toBeInTheDocument();
		expect(screen.getByText(/Panel Area: 400/i)).toBeInTheDocument();
	});
});

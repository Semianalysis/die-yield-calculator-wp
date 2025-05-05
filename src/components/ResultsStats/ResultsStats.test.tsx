import React from "react";
import { render, screen } from "@testing-library/react";
import { WaferStats, ReticleStats } from "./ResultsStats";
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
	fields: [],
	fullShotCount: 20,
	partialShotCount: 5,
	reticleUtilization: 0.75,
	dieCost: 5.25,
};

describe("ResultStats", () => {
	it("renders the WaferStats component with correct values", () => {
		render(
			<WaferStats
				results={results}
				shape="Panel"
				dieWidth={10}
				dieHeight={10}
				waferWidth={300}
				waferHeight={400}
				reticleLimit={true}
			/>
		);

		expect(screen.getByText(/Total Dies: 100/i)).toBeInTheDocument();
		expect(screen.getByText(/Good Dies: 90/i)).toBeInTheDocument();
		expect(screen.getByText(/Defective Dies: 5/i)).toBeInTheDocument();
		expect(screen.getByText(/Partial Dies: 3/i)).toBeInTheDocument();
		expect(screen.getByText(/Excluded Dies: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/Fab Yield: 90%/i)).toBeInTheDocument();
		expect(screen.getByText(/Total Die Area: 98cm²/i)).toBeInTheDocument();
	});

	it("renders the wafer diameter for wafer-type substrate", () => {
		render(
			<WaferStats
				results={results}
				shape="Wafer"
				dieWidth={10}
				dieHeight={10}
				waferWidth={200}
				waferHeight={200}
				reticleLimit={true}
			/>
		);

		expect(screen.getByText(/Wafer Diameter: 200mm/i)).toBeInTheDocument();
		expect(screen.getByText(/Wafer Area: 314\.1593cm²/i)).toBeInTheDocument();
	});

	it("renders the width and height for panel-type substrate", () => {
		render(
			<WaferStats
				results={results}
				shape="Panel"
				dieWidth={10}
				dieHeight={10}
				waferWidth={200}
				waferHeight={200}
				reticleLimit={true}
			/>
		);

		expect(screen.getByText(/Panel Width: 200/i)).toBeInTheDocument();
		expect(screen.getByText(/Panel Height: 200/i)).toBeInTheDocument();
		expect(screen.getByText(/Panel Area: 400/i)).toBeInTheDocument();
	});

	it('calculates and displays the waste area (area of wafer not made up of good die)', () => {
		const dieWidth = 6;
		const dieHeight = 4;
		const waferWidth = 200;
		const waferHeight = 200;
		render(
			<WaferStats
				results={results}
				shape="Panel"
				dieWidth={dieWidth}
				dieHeight={dieHeight}
				waferWidth={waferWidth}
				waferHeight={waferHeight}
				reticleLimit={true}
			/>
		);

		const expected = ((waferWidth * waferHeight) - (results.goodDies * dieWidth * dieHeight)) / 100;

		expect(screen.getByText(new RegExp(`Total Waste Area: ${expected}cm²`, 'ig'))).toBeInTheDocument();
	});

	it('does not show exposure count if reticle limit is turned off', () => {
		render(
			<WaferStats
				results={results}
				shape="Panel"
				dieWidth={10}
				dieHeight={10}
				waferWidth={200}
				waferHeight={200}
				reticleLimit={false}
			/>
		);

		expect(screen.queryByText(/Exposures/i)).not.toBeInTheDocument();
	})

	it('renders the ReticleStats component with correct values', () => {
		render(
			<ReticleStats results={results} />
		);

		expect(screen.getByText(/Die Per Reticle: 4/i)).toBeInTheDocument();
		expect(screen.getByText(/Reticle Utilization: 75%/i)).toBeInTheDocument();
	});
});

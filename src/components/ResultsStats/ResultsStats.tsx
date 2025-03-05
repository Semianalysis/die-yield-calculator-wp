import React from "react";
import { FabResults, SubstrateShape } from "../../types";

function waferAreaCm(shape: SubstrateShape, widthMM: number, heightMM: number) {
	if (shape === "Panel") {
		return (widthMM * heightMM) / 100;
	}

	return (Math.PI * Math.pow(widthMM / 2, 2)) / 100;
}

function totalDieAreaCm(
	dieWidthMM: number,
	dieHeightMM: number,
	numDies: number,
) {
	return (dieWidthMM * dieHeightMM * numDies) / 100;
}

function wasteAreaCm(
	dieWidthMM: number,
	dieHeightMM: number,
	goodDies: number,
	waferAreaCm: number,
) {
	return waferAreaCm - (goodDies * dieWidthMM * dieHeightMM) / 100;
}

function displayValue(value: number | null | undefined, unit?: string) {
	if (value === null || value === undefined) {
		return "—";
	}

	return `${parseFloat(value.toFixed(4))}${unit || ""}`;
}

export function WaferStats(props: {
	results: FabResults;
	shape: SubstrateShape;
	dieWidth: number;
	dieHeight: number;
	waferWidth: number;
	waferHeight: number;
}) {
	const waferArea = waferAreaCm(
		props.shape,
		props.waferWidth,
		props.waferHeight,
	);
	const wasteArea =
		props.results?.goodDies &&
		wasteAreaCm(
			props.dieWidth,
			props.dieHeight,
			props.results.goodDies,
			waferArea,
		);

	return (
		<div className="result-stats" aria-busy={!props.results}>
			<ul className="result-stats__list">
				<li className="result-stats__result result-stats__result--total-dies">
					Total Dies: {displayValue(props.results?.totalDies)}
				</li>
				<li className="result-stats__result result-stats__result--good-dies">
					Good Dies: {displayValue(props.results?.goodDies)}
				</li>
				<li className="result-stats__result result-stats__result--defective-dies">
					Defective Dies: {displayValue(props.results?.defectiveDies)}
				</li>
				<li className="result-stats__result result-stats__result--partial-dies">
					Partial Dies: {displayValue(props.results?.partialDies)}
				</li>
				<li className="result-stats__result result-stats__result--lost-dies">
					Excluded Dies: {displayValue(props.results?.lostDies)}
				</li>
				<li className="result-stats__result result-stats__result--yield">
					Fab Yield:{" "}
					{displayValue(
						props.results?.fabYield && props.results.fabYield * 100,
						"%",
					)}
				</li>
			</ul>
			<ul className="result-stats__list">
				<li className="result-stats__result result-stats__result--shot-count">
					Exposures:{" "}
					{displayValue(
						(props.results?.fullShotCount || 0) +
							(props.results?.partialShotCount || 0),
					)}{" "}
					({displayValue(props.results?.fullShotCount)} full,{" "}
					{displayValue(props.results?.partialShotCount)} partial)
				</li>
				{props.shape === "Panel" ? (
					<>
						<li className="result-stats__result result-stats__result--panel-width">
							Panel Width: {props.waferWidth}mm
						</li>
						<li className="result-stats__result result-stats__result--panel-height">
							Panel Height: {props.waferHeight}mm
						</li>
					</>
				) : (
					<li className="result-stats__result result-stats__result--panel-diameter">
						Wafer Diameter: {props.waferWidth}mm
					</li>
				)}
				<li className="result-stats__result result-stats__result--wafer-area">
					{props.shape} Area: {displayValue(waferArea, "cm²")}
				</li>
				<li className="result-stats__result result-stats__result--die-area">
					Total Die Area:{" "}
					{displayValue(
						props.results?.totalDies &&
							totalDieAreaCm(
								props.dieWidth,
								props.dieHeight,
								props.results.totalDies - props.results.lostDies,
							),
						"cm²",
					)}
				</li>
				<li className="result-stats__result result-stats__result--waste-area">
					Total Waste Area: {displayValue(wasteArea, "cm²")} (
					{wasteArea && displayValue((wasteArea / waferArea) * 100, "%")})
				</li>
			</ul>
		</div>
	);
}

export function ReticleStats(props: {
	results: FabResults;
}) {
	return (
		<div className="result-stats" aria-busy={!props.results}>
			<ul className="result-stats__list">
				<li className="result-stats__result result-stats__result--die-per-reticle">
					Die Per Reticle:{" "}
					{displayValue(
						(props.results?.diePerRow || 0) * (props.results?.diePerCol || 0),
					)}{" "}
					({displayValue(props.results?.diePerRow)}×
					{displayValue(props.results?.diePerCol)})
				</li>
			</ul>
			<ul className="result-stats__list">
				<li className="result-stats__result result-stats__result--reticle-utilization">
					Reticle Utilization:{" "}
					{displayValue(
						props.results?.reticleUtilization &&
						props.results?.reticleUtilization * 100,
						"%",
					)}
				</li>
			</ul>
		</div>
	);
}

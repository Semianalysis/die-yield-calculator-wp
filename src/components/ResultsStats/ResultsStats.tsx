import React from "react";
import { FabResults, WaferShape } from "../../types";

function waferAreaCm(
	shape: WaferShape,
	widthMM: number,
	heightMM: number
) {
	if (shape === "Panel") {
		return widthMM * heightMM / 100;
	}

	return Math.PI * Math.pow(widthMM / 2, 2) / 100;
}

function totalDieAreaCm(
	dieWidthMM: number,
	dieHeightMM: number,
	numDies: number
) {
	return dieWidthMM * dieHeightMM * numDies / 100;
}

function displayValue(value: number | null) {
	if (value === null) {
		return '—';
	}

	return value;
}

export function ResultsStats(props: {
	results: FabResults;
	shape: WaferShape;
	dieWidth: number;
	dieHeight: number;
	waferWidth: number;
	waferHeight: number;
}) {
	return (
		<div className="results">
			<ul className="results__list">
				<li className="result result--total-dies">Total Dies: {displayValue(props.results.totalDies)}</li>
				<li className="result result--good-dies">Good Dies: {displayValue(props.results.goodDies)}</li>
				<li className="result result--defective-dies">Defective Dies: {displayValue(props.results.defectiveDies)}</li>
				<li className="result result--partial-dies">Partial Dies: {displayValue(props.results.partialDies)}</li>
				<li className="result result--lost-dies">Lost Dies: {displayValue(props.results.lostDies)}</li>
			</ul>
			<ul className="results__list">
				<li className="result result--yield">Fab Yield: {props.results.fabYield === null
					? "—"
					: parseFloat((props.results.fabYield * 100).toFixed(4))}%</li>
				{
					props.shape === "Panel" ? (
						<>
							<li className="result result--panel-width">Panel Width: {props.waferWidth}mm</li>
							<li className="result result--panel-height">Panel Height: {props.waferHeight}mm</li>
						</>
					) : (
						<li className="result result--panel-diameter">Wafer Diameter: {props.waferWidth}mm</li>
					)
				}
				<li className="result result--wafer-area">Wafer
					Area: {parseFloat(waferAreaCm(props.shape, props.waferWidth, props.waferHeight).toFixed(4))}cm²
				</li>
				<li className="result result--die-area">Total Die
					Area: {props.results.totalDies === null ? "—" : parseFloat(totalDieAreaCm(props.dieWidth, props.dieHeight, props.results.totalDies).toFixed(4))}cm²
				</li>
			</ul>
		</div>
	);
}

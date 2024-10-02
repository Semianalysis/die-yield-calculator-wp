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
				<li className="result result--total-dies">Total Dies: {props.results.totalDies}</li>
				<li className="result result--good-dies">Good Dies: {props.results.goodDies}</li>
				<li className="result result--defective-dies">Defective Dies: {props.results.defectiveDies}</li>
				<li className="result result--partial-dies">Partial Dies: {props.results.partialDies}</li>
				<li className="result result--lost-dies">Lost Dies: {props.results.lostDies}</li>
			</ul>
			<ul className="results__list">
				<li className="result result--yield">Fab Yield: {parseFloat((props.results.fabYield * 100).toFixed(4))}%</li>
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
					Area: {parseFloat(totalDieAreaCm(props.dieWidth, props.dieHeight, props.results.totalDies).toFixed(4))}cm²
				</li>
			</ul>
		</div>
	);
}

import React from "react";
import { FabResults, SubstrateShape } from "../../types";

function waferAreaCm(
	shape: SubstrateShape,
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

function displayValue(value: number | null | undefined, unit?: string) {
	if (value === null || value === undefined) {
		return "—";
	}

	return `${value}${unit || ""}`;
}

export function ResultsStats(props: {
	results: FabResults;
	shape: SubstrateShape;
	dieWidth: number;
	dieHeight: number;
	waferWidth: number;
	waferHeight: number;
}) {
	return (
		<div className="results" aria-busy={!props.results}>
			<ul className="results__list">
				<li className="result result--total-dies">Total
					Dies: {displayValue(props.results?.totalDies)}</li>
				<li className="result result--die-per-reticle">Die Per
					Reticle: {displayValue((props.results?.diePerRow || 0) * (props.results?.diePerCol || 0))} ({displayValue(props.results?.diePerRow)}×{displayValue(props.results?.diePerCol)})
				</li>
				<li className="result result--good-dies">Good
					Dies: {displayValue(props.results?.goodDies)}</li>
				<li className="result result--defective-dies">Defective
					Dies: {displayValue(props.results?.defectiveDies)}</li>
				<li className="result result--partial-dies">Partial
					Dies: {displayValue(props.results?.partialDies)}</li>
				<li className="result result--lost-dies">Lost
					Dies: {displayValue(props.results?.lostDies)}</li>
			</ul>
			<ul className="results__list">
				<li className="result result--yield">Fab
					Yield: {displayValue(props.results?.fabYield && parseFloat((props.results.fabYield * 100).toFixed(4)), "%")}
				</li>
				{
					props.shape === "Panel" ? (
						<>
							<li className="result result--panel-width">Panel
								Width: {props.waferWidth}mm
							</li>
							<li className="result result--panel-height">Panel
								Height: {props.waferHeight}mm
							</li>
						</>
					) : (
						<li className="result result--panel-diameter">Wafer
							Diameter: {props.waferWidth}mm</li>
					)
				}
				<li
					className="result result--wafer-area">{props.shape} Area: {parseFloat(waferAreaCm(props.shape, props.waferWidth, props.waferHeight).toFixed(4))}cm²
				</li>
				<li className="result result--die-area">Total Die
					Area: {displayValue(props.results?.totalDies && parseFloat(totalDieAreaCm(props.dieWidth, props.dieHeight, props.results.totalDies).toFixed(4)), "cm²")}
				</li>
			</ul>
		</div>
	);
}

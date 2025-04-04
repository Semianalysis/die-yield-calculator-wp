import React from "react";
import { FabResults, SubstrateShape } from "../../types";
import { ReactComponent as SquareIcon } from "../../assets/icons/square.svg";
import { ReactComponent as SquareCheckIcon } from "../../assets/icons/square-check.svg";
import { ReactComponent as SquareXIcon } from "../../assets/icons/square-x.svg";
import { ReactComponent as SquareSlashIcon } from "../../assets/icons/square-slash.svg";
import { ReactComponent as SquareOffIcon } from "../../assets/icons/square-off.svg";
import { ReactComponent as CirclePecentageIcon } from "../../assets/icons/circle-percentage.svg";
import { ReactComponent as DimensionsIcon } from "../../assets/icons/dimensions.svg";
import { ReactComponent as Grid4x4Icon } from "../../assets/icons/grid-4x4.svg";
import { ReactComponent as HeightIcon } from "../../assets/icons/height.svg";
import { ReactComponent as LayoutGridIcon } from "../../assets/icons/layout-grid.svg";
import { ReactComponent as ScissorsIcon } from "../../assets/icons/scissors.svg";
import { ReactComponent as ShutterIcon } from "../../assets/icons/shutter.svg";
import { ReactComponent as SquarePercentageIcon } from "../../assets/icons/square-percentage.svg";
import { ReactComponent as WidthIcon } from "../../assets/icons/width.svg";

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
					<SquareIcon />
					Total Dies: {displayValue(props.results?.totalDies)}
				</li>
				<li className="result-stats__result result-stats__result--good-dies">
					<SquareCheckIcon />
					Good Dies: {displayValue(props.results?.goodDies)}
				</li>
				<li className="result-stats__result result-stats__result--defective-dies">
					<SquareXIcon />
					Defective Dies: {displayValue(props.results?.defectiveDies)}
				</li>
				<li className="result-stats__result result-stats__result--partial-dies">
					<SquareSlashIcon />
					Partial Dies: {displayValue(props.results?.partialDies)}
				</li>
				<li className="result-stats__result result-stats__result--lost-dies">
					<SquareOffIcon />
					Excluded Dies: {displayValue(props.results?.lostDies)}
				</li>
				<li className="result-stats__result result-stats__result--yield">
					<CirclePecentageIcon />
					Fab Yield:{" "}
					{displayValue(
						props.results?.fabYield && props.results.fabYield * 100,
						"%",
					)}
				</li>
			</ul>
			<ul className="result-stats__list">
				<li className="result-stats__result result-stats__result--shot-count">
					<ShutterIcon />
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
							<WidthIcon />
							Panel Width: {props.waferWidth}mm
						</li>
						<li className="result-stats__result result-stats__result--panel-height">
							<HeightIcon />
							Panel Height: {props.waferHeight}mm
						</li>
					</>
				) : (
					<li className="result-stats__result result-stats__result--panel-diameter">
						<WidthIcon />
						Wafer Diameter: {props.waferWidth}mm
					</li>
				)}
				<li className="result-stats__result result-stats__result--wafer-area">
					<DimensionsIcon />
					{props.shape} Area: {displayValue(waferArea, "cm²")}
				</li>
				<li className="result-stats__result result-stats__result--die-area">
					<Grid4x4Icon />
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
					<ScissorsIcon />
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
					<LayoutGridIcon />
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
					<SquarePercentageIcon />
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

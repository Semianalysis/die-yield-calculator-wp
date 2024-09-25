import React from "react";
import { Die, FabResults } from "../../types";

function DieItem(props: Die) {
	const stateColors = {
		good: "rgba(6,231,6,0.77)",
		defective: "rgba(151,138,129,0.8)",
		partial: "yellow",
		lost: "red"
	};

	return (
		<rect
			x={props.x}
			y={props.y}
			width={props.width}
			height={props.height}
			fill={stateColors[props.dieState]}
		/>
	);
}

export function DiscCanvas(props: { results: FabResults }) {
	// Bail out if there are too many dies to draw, otherwise the browser will hang
	if (props.results.totalDies > 9999) {
		return "Too many dies to visualize";
	}

	return (
		<svg
			viewBox={`0 0 ${props.results.waferWidth} ${props.results.waferWidth}`}
			className="wafer-canvas disc"
		>
			<circle
				cx={props.results.waferWidth / 2}
				cy={props.results.waferWidth / 2}
				r={Math.min(props.results.waferWidth, props.results.waferWidth) / 2}
				stroke="none"
				fill="none"
			/>
			{
				props.results.dies.map((die) => (<DieItem {...die} />))
			}
		</svg>
	);
}

export function PanelCanvas(props: { results: FabResults }) {
	// Bail out if there are too many dies to draw, otherwise the browser will hang
	if (props.results.totalDies > 9999) {
		return "Too many dies to visualize";
	}

	return (
		<svg viewBox={`0 0 ${props.results.waferWidth} ${props.results.waferWidth}`} className="wafer-canvas">
			{
				props.results.dies.map((die) => <DieItem {...die} />)
			}
		</svg>
	);
}


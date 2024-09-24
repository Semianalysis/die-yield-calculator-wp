import React from "react";
import { Die, FabResults } from "../../types/dies";

function DieItem(props: Die) {
	const stateColors = {
		good: "green",
		defective: "grey",
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
		<svg width={props.results.waferWidth} height={props.results.waferWidth} style={{ border: "1px solid black" }}>
			<circle
				cx={props.results.waferWidth / 2}
				cy={props.results.waferWidth / 2}
				r={Math.min(props.results.waferWidth, props.results.waferWidth) / 2}
				stroke="black"
				strokeWidth="1"
				fill="none" />
			<>
				{
					props.results.dies.map((die) => (<DieItem {...die} />))
				}
			</>
		</svg>
	);
}

export function PanelCanvas(props: { results: FabResults }) {
	// Bail out if there are too many dies to draw, otherwise the browser will hang
	if (props.results.totalDies > 9999) {
		return "Too many dies to visualize";
	}

	return (
		<svg width={props.results.waferWidth} height={props.results.waferHeight} style={{ border: "1px solid black" }}>
			{
				props.results.dies.map((die) => <DieItem {...die} />)
			}
		</svg>
	);
}


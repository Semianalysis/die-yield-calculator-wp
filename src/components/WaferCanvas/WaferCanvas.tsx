import React, { useEffect, useRef } from "react";
import { Die, FabResults } from "../../types";

function DieMapCanvas(props: { results: FabResults }) {
	// Don't try and draw too many dies, or performance will suffer too much and the
	// page may hang or crash
	const maxDies = 100000;
	const canvasEl = useRef<HTMLCanvasElement>(null);
	const dieStateColors = {
		good: "rgba(6,231,6,0.77)",
		defective: "rgba(151,138,129,0.8)",
		partial: "yellow",
		lost: "red"
	};

	useEffect(() => {
		if (!canvasEl.current || !props.results.dies.length || props.results.dies.length > maxDies) {
			return;
		}

		const context = canvasEl.current.getContext("2d");

		if (!context) {
			return;
		}

		// Clear the canvas before drawing new die map
		context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);

		// Draw each die onto the canvas
		props.results.dies.forEach((die) => {
			context.fillStyle = dieStateColors[die.dieState];
			context.fillRect(die.x, die.y, die.width, die.height);
		});
	}, [JSON.stringify(props.results)]);

	if (props.results.dies.length > maxDies) {
		return (
			<div
				className="too-many-dies"
				style={{
					paddingBottom: `${props.results.waferWidth / props.results.waferHeight * 100}%`
				}}
			>
				<span>Too many dies to visualize</span>
			</div>
		);
	}

	return (
		<canvas
			ref={canvasEl}
			width={props.results.waferWidth}
			height={props.results.waferHeight}
		></canvas>
	);
}

export function DiscCanvas(props: { results: FabResults }) {
	return (
		<div className="wafer-canvas disc">
			<DieMapCanvas results={props.results} />
		</div>
	);
}

export function PanelCanvas(props: { results: FabResults }) {
	return (
		<div className="wafer-canvas">
			<DieMapCanvas results={props.results} />
		</div>
	);
}


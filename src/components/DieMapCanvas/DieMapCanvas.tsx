import { FabResults, SubstrateShape } from "../../types";
import React, { useEffect, useRef } from "react";


export function DieMapCanvas(props: {
	results: FabResults;
	validationError?: string;
	waferWidth: number;
	waferHeight: number;
	mmToPxScale: number;
	maxDies: number;
}) {
	const canvasEl = useRef<HTMLCanvasElement>(null);
	const dieStateColors = {
		good: "rgba(6,231,6,0.77)",
		defective: "rgba(243,81,67,0.68)",
		partial: "rgba(249,249,27,0.68)",
		lost: "rgba(151,138,129,0.8)",
	};

	useEffect(() => {
		if (!canvasEl.current) {
			return;
		}

		const context = canvasEl.current.getContext("2d");

		if (!context) {
			return;
		}

		// Clear the canvases before drawing new die map
		context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);

		if (!props.results || props.results.dies.length > props.maxDies) {
			return;
		}

		// Draw each die onto the canvas
		props.results.dies.forEach((die) => {
			context.fillStyle = dieStateColors[die.dieState];
			context.fillRect(
				props.mmToPxScale * die.x,
				props.mmToPxScale * die.y,
				props.mmToPxScale * die.width,
				props.mmToPxScale * die.height,
			);
		});
	}, [JSON.stringify(props.results)]);

	if (!props.results) {
		// Display the validation error or fallback message
		return (
			<div className="wafer-canvas__message--error" role="status">
				<span>{props.validationError || "Invalid input(s) provided"}</span>
			</div>
		);
	}

	if (props.results.dies.length > props.maxDies) {
		return (
			<div className="wafer-canvas__message" role="status">
				<span>Too many dies to visualize</span>
			</div>
		);
	}

	return (
		<canvas
			className="wafer-canvas__die-map"
			ref={canvasEl}
			width={props.waferWidth * props.mmToPxScale}
			height={props.waferHeight * props.mmToPxScale}
		></canvas>
	);
}

export function DieDecorativeCanvas(props: {
	results: FabResults;
	shape: SubstrateShape;
	waferWidth: number;
	waferHeight: number;
	mmToPxScale: number;
	maxDies: number;
}) {
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasEl.current) {
			return;
		}

		const context = canvasEl.current.getContext("2d");

		if (!context) {
			return;
		}

		context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);

		if (!props.results || props.results.dies.length > props.maxDies) {
			return;
		}

		// Background color
		context.fillStyle = "rgba(217,217,210,0.76)";
		// Draw a background rectangle for a panel, or a background circle for a disc
		if (props.shape === "Panel") {
			context.fillRect(0, 0, canvasEl.current.width, canvasEl.current.height);
		} else {
			context.arc(
				canvasEl.current.width / 2,
				canvasEl.current.width / 2,
				canvasEl.current.width / 2,
				0,
				2 * Math.PI,
				false,
			);
			context.fill();
		}

		// Cut out each die from the background color of the canvas
		props.results.dies.forEach((die) => {
			context.clearRect(
				props.mmToPxScale * die.x,
				props.mmToPxScale * die.y,
				props.mmToPxScale * die.width,
				props.mmToPxScale * die.height,
			);
		});
	}, [JSON.stringify(props.results)]);

	return (
		<canvas
			className="wafer-canvas__die-decorative"
			ref={canvasEl}
			width={props.waferWidth * props.mmToPxScale}
			height={props.waferHeight * props.mmToPxScale}
		></canvas>
	);
}

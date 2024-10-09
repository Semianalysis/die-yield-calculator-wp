import React, { useEffect, useRef, useState } from "react";
import { FabResults, SubstrateShape } from "../../types";
import Tilt, { OnMoveParams } from "react-parallax-tilt";
import { createHatchingCanvasPattern } from "../../utils/canvas";
import { ReactComponent as TSMCLogo } from '../../assets/tsmc-logo.svg';

// How many pixels should be rendered for every mm of wafer size
const mmToPxScale = 3;

// Don't try and draw too many dies, or performance will suffer too much and the
// page may hang or crash
const maxDies = 50000;

function DieMapCanvas(props: {
	results: FabResults;
	waferWidth: number;
	waferHeight: number;
}) {
	const canvasEl = useRef<HTMLCanvasElement>(null);
	const dieStateColors = {
		good: "rgba(6,231,6,0.77)",
		defective: "rgba(151,138,129,0.8)",
		partial: "rgba(249,249,27,0.68)",
		lost: "rgba(243,81,67,0.68)"
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

		if (!props.results || props.results.dies.length > maxDies) {
			return;
		}

		// Draw each die onto the canvas
		props.results.dies.forEach((die) => {
			context.fillStyle = dieStateColors[die.dieState];
			context.fillRect(
				mmToPxScale * die.x,
				mmToPxScale * die.y,
				mmToPxScale * die.width,
				mmToPxScale * die.height
			);
		});
	}, [JSON.stringify(props.results)]);

	if (props.results === null) {
		return (
			<div className="wafer-canvas__message--error" role="status">
				<span>Invalid input(s) provided</span>
			</div>
		);
	}

	if (props.results.dies.length > maxDies) {
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
			width={props.waferWidth * mmToPxScale}
			height={props.waferHeight * mmToPxScale}
		></canvas>
	);
}

function DieDecorativeCanvas(props: {
	results: FabResults;
	shape: SubstrateShape;
	waferWidth: number;
	waferHeight: number;
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

		if (!props.results || props.results.dies.length > maxDies) {
			return;
		}

		context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
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
				false
			);
			context.fill();
		}

		// Cut out each die from the background color the canvas
		props.results.dies.forEach((die) => {
			context.clearRect(
				mmToPxScale * die.x,
				mmToPxScale * die.y,
				mmToPxScale * die.width,
				mmToPxScale * die.height
			);
		});
	}, [JSON.stringify(props.results)]);

	return (
		<canvas
			className="wafer-canvas__die-decorative"
			ref={canvasEl}
			width={props.waferWidth * mmToPxScale}
			height={props.waferHeight * mmToPxScale}
		></canvas>
	);
}


function LossyEdgeMarker(props: {
	lossyEdgeWidth: number;
	waferWidth: number;
	waferHeight: number;
	shape: SubstrateShape;
}) {
	const canvasEl = useRef<HTMLCanvasElement>(null);
	const waferWidthPx = props.waferWidth * mmToPxScale;
	const waferHeightPx = props.waferHeight * mmToPxScale;

	useEffect(() => {
		if (!canvasEl.current || props.waferWidth === 0 || props.lossyEdgeWidth > props.waferWidth / 2) {
			return;
		}

		const context = canvasEl.current.getContext("2d");

		if (!context) {
			return;
		}

		const lossyEdgeWidthInPx = props.lossyEdgeWidth * mmToPxScale;

		// Set the pattern as the fill style
		const pattern = createHatchingCanvasPattern(context);
		if (pattern) {
			context.fillStyle = pattern;
		}

		context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);

		if (props.shape === "Wafer") {
			const outerRadius = waferWidthPx / 2;
			const innerRadius = outerRadius - lossyEdgeWidthInPx;

			context.beginPath();
			// Outer (wafer edge)
			context.arc(outerRadius, outerRadius, outerRadius, 0, 2 * Math.PI, false);
			// Inner (lossy edge)
			context.arc(outerRadius, outerRadius, innerRadius, 0, 2 * Math.PI, true);
			context.fill();
		} else if (props.shape === "Panel") {
			context.fillRect(0, 0, canvasEl.current.width, canvasEl.current.height);
			context.clearRect(
				lossyEdgeWidthInPx,
				lossyEdgeWidthInPx,
				waferWidthPx - (lossyEdgeWidthInPx * 2),
				waferHeightPx - (lossyEdgeWidthInPx * 2)
			);
		}
	}, [props.lossyEdgeWidth, props.shape, props.waferWidth, props.waferHeight]);

	return (
		<canvas
			className="wafer-canvas__edge"
			ref={canvasEl}
			width={waferWidthPx}
			height={waferHeightPx}
		></canvas>
	);
}

/**
 * Draw a die map onto either a circular or rectangular background, depending on
 * the shape of the wafer. Dies are drawn using <canvas> and colored according
 * to their state (good, defective, etc.)
 */
export function WaferCanvas(props: {
	results: FabResults;
	lossyEdgeWidth: number;
	shape: SubstrateShape;
	waferWidth: number;
	waferHeight: number;
	easterEggEnabled: boolean;
}) {
	const [tiltX, setTiltX] = useState(0);
	const [tiltY, setTiltY] = useState(0);

	function onMove({ tiltAngleXPercentage, tiltAngleYPercentage }: OnMoveParams) {
		setTiltX(tiltAngleXPercentage);
		setTiltY(tiltAngleYPercentage);
	}

	if (props.easterEggEnabled) {
		return (
			<Tilt
				glareEnable={true}
				glareMaxOpacity={0.75}
				scale={1.05}
				className="tsmc-logo"
			>
				<TSMCLogo />
			</Tilt>
		);
	}

	return (
		<div role="presentation" aria-label="A rendering of a silicon wafer">
			<Tilt
				key={props.shape}
				glareEnable={true}
				glareMaxOpacity={0.75}
				scale={1.05}
				onMove={onMove}
				className={`wafer-canvas ${props.shape === "Wafer" ? "wafer-canvas--disc" : ""}`}
				glareBorderRadius={props.shape === "Wafer" ? "100%" : "0"}
			>
				<div
					className="wafer-canvas__mirror-background"
					style={{
						backgroundPositionX: `${(tiltY / 2) + (tiltX / 4)}% `
					}}></div>
				<DieDecorativeCanvas
					results={props.results}
					shape={props.shape}
					waferWidth={props.waferWidth}
					waferHeight={props.waferHeight}
				/>
				<DieMapCanvas
					results={props.results}
					waferWidth={props.waferWidth}
					waferHeight={props.waferHeight}
				/>
				<LossyEdgeMarker
					lossyEdgeWidth={props.lossyEdgeWidth}
					waferWidth={props.waferWidth}
					waferHeight={props.waferHeight}
					shape={props.shape}
				/>
				<div className="wafer-canvas__watermark"></div>
			</Tilt>
		</div>
	);
}

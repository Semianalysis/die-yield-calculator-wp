import React, { useEffect, useRef, useState } from "react";
import { FabResults, WaferShape } from "../../types";
import Tilt, { OnMoveParams } from "react-parallax-tilt";

// How many pixels should be rendered for every mm of wafer size
const mmToPxScale = 3;

// Don't try and draw too many dies, or performance will suffer too much and the
// page may hang or crash
const maxDies = 100000;


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
			context.fillRect(
				mmToPxScale * die.x,
				mmToPxScale * die.y,
				mmToPxScale * die.width,
				mmToPxScale * die.height,
			);
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
			className="die-map"
			ref={canvasEl}
			width={props.results.waferWidth * mmToPxScale}
			height={props.results.waferHeight * mmToPxScale}
		></canvas>
	);
}

function DieDecorativeCanvas(props: { results: FabResults, shape: WaferShape }) {

	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasEl.current || !props.results.dies.length || props.results.dies.length > maxDies) {
			return;
		}

		const context = canvasEl.current.getContext("2d");

		if (!context) {
			return;
		}

		context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
		// Background color
		context.fillStyle = "rgba(154,154,145,0.55)";
		// Draw a background rectangle for a panel, or a background circle for a disc
		if (props.shape === 'Panel') {
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
				mmToPxScale * die.height,
			);
		});
	}, [JSON.stringify(props.results)]);

	if (props.results.dies.length > maxDies) {
		return null;
	}

	return (
		<canvas
			className="die-decorative"
			ref={canvasEl}
			width={props.results.waferWidth * mmToPxScale}
			height={props.results.waferHeight * mmToPxScale}
		></canvas>
	);
}

/**
 * Draw a die map onto either a circular or rectangular background, depending on
 * the shape of the wafer. Dies are drawn using <canvas> and colored according
 * to their state (good, defective, etc.)
 */
export function WaferCanvas(props: {
	results: FabResults,
	shape: WaferShape
}) {
	const [tiltX, setTiltX] = useState(0);
	const [tiltY, setTiltY] = useState(0);
	function onMove({ tiltAngleXPercentage, tiltAngleYPercentage }: OnMoveParams) {
		setTiltX(tiltAngleXPercentage);
		setTiltY(tiltAngleYPercentage);
	}

	return (
		<Tilt
			key={props.shape}
			glareEnable={true}
			glareMaxOpacity={0.8}
			scale={1.05}
			onMove={onMove}
			className={`wafer-canvas ${props.shape === 'Disc' ? 'disc' : ''}`}
			glareBorderRadius={props.shape === 'Disc' ? "100%" : "0"}
		>
			<DieMapCanvas results={props.results} />
			<DieDecorativeCanvas results={props.results} shape={props.shape} />
			<div
				className="mirror-background"
				style={{
					backgroundPositionX: `${(tiltY / 2) + (tiltX / 4)}% `
				}}></div>
		</Tilt>
	);
}

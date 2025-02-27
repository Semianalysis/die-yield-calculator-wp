import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { getRelativeDiePositions } from "../../utils/calculations";

type Props = {
	mmToPxScale: number;
	dieWidth: number;
	dieHeight: number;
	scribeHoriz: number;
	scribeVert: number;
	fieldWidth: number;
	fieldHeight: number;
	showReticleBackground: boolean;
};

export function ReticleCanvas(props: Props) {
	const canvasEl = useRef<HTMLCanvasElement>(null);

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

		// Calculate the position of dies in a single shot
		const diesInShot = getRelativeDiePositions(
			props.dieWidth,
			props.dieHeight,
			props.scribeHoriz,
			props.scribeVert,
			props.fieldWidth,
			props.fieldHeight,
		);

		context.fillStyle = "white";

		// Draw each die onto the canvas
		diesInShot.positions.forEach((die) => {
			context.fillRect(
				props.mmToPxScale * die.x,
				props.mmToPxScale * die.y,
				props.mmToPxScale * props.dieWidth,
				props.mmToPxScale * props.dieHeight,
			);
		});
	}, [
		props.dieWidth,
		props.dieHeight,
		props.scribeHoriz,
		props.scribeVert,
		props.fieldWidth,
		props.fieldHeight,
		props.showReticleBackground,
	]);

	return (
		<div role="presentation" aria-label="A rendering of the reticle">
			<Tilt
				key={props.showReticleBackground ? "background" : "no-background"}
				glareEnable={props.showReticleBackground}
				glareMaxOpacity={0.75}
				scale={props.showReticleBackground ? 1.05 : 1}
				tiltEnable={props.showReticleBackground}
				className={
					props.showReticleBackground
						? "reticle-canvas--background"
						: "reticle-canvas"
				}
			>
				<canvas
					className="reticle-canvas__inner"
					ref={canvasEl}
					width={props.fieldWidth * props.mmToPxScale}
					height={props.fieldHeight * props.mmToPxScale}
				></canvas>
			</Tilt>
		</div>
	);
}

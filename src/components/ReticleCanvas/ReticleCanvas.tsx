import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { DieDecorativeCanvas } from "../DieMapCanvas/DieMapCanvas";
import { FabResults } from "../../types";
import { getRelativeDiePositions } from "../../utils/calculations";

type Props = {
	mmToPxScale: number;
	dieWidth: number;
	dieHeight: number;
	scribeHoriz: number;
	scribeVert: number;
	fieldWidth: number;
	fieldHeight: number;
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
	]);

	return (
		<div role="presentation" aria-label="A rendering of the reticle">
			<Tilt
				glareEnable={true}
				glareMaxOpacity={0.75}
				scale={1.05}
				className="reticle-canvas"
			>
				<canvas
					className="reticle-canvas__reticle"
					ref={canvasEl}
					width={props.fieldWidth * props.mmToPxScale}
					height={props.fieldHeight * props.mmToPxScale}
				></canvas>
			</Tilt>
		</div>
	);
}

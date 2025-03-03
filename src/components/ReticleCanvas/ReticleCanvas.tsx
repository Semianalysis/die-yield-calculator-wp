import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { getRelativeDiePositions } from "../../utils/calculations";
import {defaultFieldWidth, defaultFieldHeight} from "../../config";

type Props = {
	mmToPxScale: number;
	dieWidth: number;
	dieHeight: number;
	scribeHoriz: number;
	scribeVert: number;
	halfField: boolean;
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

		// If “half-field” checkbox is checked, AKA High-NA, the reticle size doesn't
		// change, but die appear double width on the reticle. In the real-world process,
		// anamorphic mirrors are used to demagnify die by 8x horizontally and 4x
		// vertically.
		const { dieHeight } = props;
		const dieWidth = props.halfField ? props.dieWidth * 2 : props.dieWidth;

		// Calculate the position of dies in a single shot
		const diesInShot = getRelativeDiePositions(
			dieWidth,
			dieHeight,
			props.scribeHoriz,
			props.scribeVert,
			defaultFieldWidth,
			defaultFieldHeight,
		);

		context.fillStyle = "white";

		// Draw each die onto the canvas
		diesInShot.positions.forEach((die) => {
			context.fillRect(
				props.mmToPxScale * die.x,
				props.mmToPxScale * die.y,
				props.mmToPxScale * dieWidth,
				props.mmToPxScale * dieHeight,
			);
		});
	}, [
		props.dieWidth,
		props.dieHeight,
		props.scribeHoriz,
		props.scribeVert,
		props.halfField,
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
					width={defaultFieldWidth * props.mmToPxScale}
					height={defaultFieldHeight * props.mmToPxScale}
				></canvas>
			</Tilt>
		</div>
	);
}

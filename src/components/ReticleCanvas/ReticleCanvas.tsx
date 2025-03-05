import React, { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { getRelativeDiePositions } from "../../utils/calculations";
import { defaultFieldWidth, defaultFieldHeight } from "../../config";
import { OnMoveParams } from "react-parallax-tilt/dist/modern";

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
	const [tiltX, setTiltX] = useState(0);
	const [tiltY, setTiltY] = useState(0);

	function onMove({
		tiltAngleXPercentage,
		tiltAngleYPercentage,
	}: OnMoveParams) {
		setTiltX(tiltAngleXPercentage);
		setTiltY(tiltAngleYPercentage);
	}

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
		// change, but die and scribe lines appear double height on the reticle. In the
		// real-world process, anamorphic mirrors are used to demagnify the reticle by 4x
		// horizontally and 8x vertically.
		const { dieWidth, scribeHoriz } = props;
		const dieHeight = props.halfField ? props.dieHeight * 2 : props.dieHeight;
		const scribeVert = props.halfField
			? props.scribeVert * 2
			: props.scribeVert;

		// Calculate the position of dies in a single shot
		const diesInShot = getRelativeDiePositions(
			dieWidth,
			dieHeight,
			scribeHoriz,
			scribeVert,
			defaultFieldWidth,
			defaultFieldHeight,
		);

		context.fillRect(0, 0, canvasEl.current.width, canvasEl.current.height);

		// Draw each die onto the canvas
		diesInShot.positions.forEach((die) => {
			context.clearRect(
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
				onMove={onMove}
			>
				<canvas
					className="reticle-canvas__inner"
					ref={canvasEl}
					width={defaultFieldWidth * props.mmToPxScale}
					height={defaultFieldHeight * props.mmToPxScale}
					style={{
						backgroundPositionX: `${tiltY / 2 - 50}% `,
					}}
				></canvas>
			</Tilt>
		</div>
	);
}

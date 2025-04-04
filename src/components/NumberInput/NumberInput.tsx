import React, { useEffect, useRef } from "react";

export function NumberInput(props: {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isDisabled?: boolean;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	max?: number;
	min?: number;
	step?: string | number;
}) {
	// Use an event listener to prevent scroll events from bubbling and causing the
	// document to scroll. See https://github.com/facebook/react/issues/5845#issuecomment-492955321
	const inputElRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const onWheel = (event: WheelEvent) => event.stopPropagation();
		inputElRef.current?.addEventListener("wheel", onWheel);

		// Remove event listener on unmount
		return () => inputElRef.current?.removeEventListener("wheel", onWheel);
	}, []);

	return (
		<div>
			<label className={props.isDisabled ? "disabled" : ""}>
				{props.label}
				<input
					type="number"
					disabled={props.isDisabled}
					value={props.value}
					onChange={props.onChange}
					onBlur={props.onBlur}
					ref={inputElRef}
					step={props.step ?? "0.01"}
					max={props.max}
					min={props.min}
				/>
			</label>
		</div>
	);
}

import React from "react";

export function NumberInput(props: {
	label: string,
	value: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	isDisabled?: boolean
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	max?: number,
}) {
	return (
		<div>
			<label className={props.isDisabled ? 'disabled' : ''}>
				{props.label}
				<input
					type="number"
					disabled={props.isDisabled}
					value={props.value}
					onChange={props.onChange}
					onBlur={props.onBlur}
					step="0.01"
					max={props.max}
				/>
			</label>
		</div>
	);
}

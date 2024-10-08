import React from "react";

export function Checkbox(props: {
	label: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	checked: boolean,
	disabled?: boolean,
}) {
	return (
		<div className={props.disabled ? "checkbox--disabled" : "checkbox"}>
			<label>
				<input
					type="checkbox"
					onChange={props.onChange}
					checked={props.checked}
					disabled={props.disabled}
				/>
				{props.label}
			</label>
		</div>
	);
}

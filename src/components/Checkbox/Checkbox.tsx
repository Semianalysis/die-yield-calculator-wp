import React from "react";

export function Checkbox(props: {
	label: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	checked: boolean
}) {
	return (
		<div className="checkbox">
			<label>
				<input type="checkbox" onChange={props.onChange} checked={props.checked} />
				{props.label}
			</label>
		</div>
	);
}

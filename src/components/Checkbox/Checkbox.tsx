import React from "react";

export function Checkbox(props: {
	label: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	checked: boolean
}) {
	return (
		<label className="checkbox">
			{props.label}
			<input type="checkbox" onChange={props.onChange} checked={props.checked} />
		</label>
	);
}

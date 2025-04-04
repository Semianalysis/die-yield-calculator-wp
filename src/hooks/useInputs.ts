import { useState } from "react";
import { FabResults, SubstrateShape } from "../types";
import { waferSizes, panelSizes, yieldModels, minDieEdge } from "../config";
import {
	evaluateDiscInputs,
	evaluatePanelInputs,
	InputValues,
} from "../utils/calculations";
import { useDebouncedEffect } from "./useDebouncedEffect";
import { validations } from "../utils/validations";

/**
 * Given the numeric inputs, selected wafer properties, and a yield model, calculate
 * the expected fabrication results.
 * @param values numeric values provided by the user via inputs
 * @param yieldModel mathematical model for calculating yield
 * @param shape wafer shape
 * @param panelSize chosen size of panel wafer
 * @param discSize chosen size of disc wafer
 * @param fieldWidth width of one shot/field
 * @param fieldHeight height of one shot/field
 */
export function useInputs(
	values: InputValues,
	yieldModel: keyof typeof yieldModels,
	shape: SubstrateShape,
	panelSize: keyof typeof panelSizes,
	discSize: keyof typeof waferSizes,
	fieldWidth: number,
	fieldHeight: number,
) {
	const [results, setResults] = useState<FabResults>(null);
	const [validationError, setValidationError] = useState<string>();

	useDebouncedEffect(
		() => {
			// Reset to defaults if we can't use one or more values
			const validationErrors = Object.keys(validations)
				.map((validation) => {
					const validationFn =
						validations[validation as keyof typeof validations];
					return validationFn(values, { fieldWidth, fieldHeight });
				})
				.filter(Boolean);

			if (validationErrors.length) {
				setResults(null);
				setValidationError(validationErrors[0]);
			} else {
				if (shape === "Wafer") {
					setResults(
						evaluateDiscInputs(
							values,
							discSize,
							yieldModel,
							fieldWidth,
							fieldHeight,
						),
					);
				} else if (shape === "Panel") {
					setResults(
						evaluatePanelInputs(
							values,
							panelSize,
							yieldModel,
							fieldWidth,
							fieldHeight,
						),
					);
				}
			}
		},
		[
			JSON.stringify(values),
			shape,
			panelSize,
			discSize,
			yieldModel,
			fieldWidth,
			fieldHeight,
		],
		100,
	);

	return { results, validationError };
}

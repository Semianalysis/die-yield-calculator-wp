import { useState } from "react";
import { FabResults, SubstrateShape } from "../types";
import { waferSizes, panelSizes, yieldModels } from "../config";
import {
	evaluateDiscInputs,
	evaluatePanelInputs,
	InputValues,
} from "../utils/calculations";
import { useDebouncedEffect } from "./useDebouncedEffect";
import { validations } from "../utils/validations";

interface Options {
	discSize: keyof typeof waferSizes;
	fieldHeight: number;
	fieldWidth: number;
	panelSize: keyof typeof panelSizes;
	reticleLimit: boolean;
	substrateShape: SubstrateShape;
	yieldModel: keyof typeof yieldModels;
}

/**
 * Given the numeric inputs, selected wafer properties, and a yield model, calculate
 * the expected fabrication results.
 * @param values numeric values provided by the user via inputs
 * @param options wafer properties, yield model, etc.
 */
export function useInputs(values: InputValues, options: Options) {
	const {
		substrateShape,
		panelSize,
		discSize,
		yieldModel,
		fieldWidth,
		fieldHeight,
		reticleLimit,
	} = options;
	const [results, setResults] = useState<FabResults>(null);
	const [validationError, setValidationError] = useState<string>();
	const waferWidth =
		substrateShape === "Panel"
			? panelSizes[panelSize].width
			: waferSizes[discSize].width;
	const waferHeight =
		substrateShape === "Panel"
			? panelSizes[panelSize].height
			: waferSizes[discSize].width;

	useDebouncedEffect(
		() => {
			// Reset to defaults if we can't use one or more values
			const validationErrors = Object.keys(validations)
				.map((validation) => {
					const validationFn =
						validations[validation as keyof typeof validations];
					return validationFn(
						values,
						{ fieldWidth, fieldHeight },
						{
							waferWidth,
							waferHeight,
						},
					);
				})
				.filter(Boolean);

			if (validationErrors.length) {
				setResults(null);
				setValidationError(validationErrors[0]);
			} else {
				if (substrateShape === "Wafer") {
					setResults(
						evaluateDiscInputs(
							values,
							discSize,
							yieldModel,
							fieldWidth,
							fieldHeight,
							// Center die on the wafer if Reticle Limit is turned off
							reticleLimit,
						),
					);
				} else if (substrateShape === "Panel") {
					setResults(
						evaluatePanelInputs(
							values,
							panelSize,
							yieldModel,
							fieldWidth,
							fieldHeight,
							// Center die on the panel if Reticle Limit is turned off
							reticleLimit,
						),
					);
				}
			}
		},
		[
			JSON.stringify(values),
			substrateShape,
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

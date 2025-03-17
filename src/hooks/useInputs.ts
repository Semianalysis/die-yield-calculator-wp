import { useState } from "react";
import { FabResults, SubstrateShape } from "../types";
import { waferSizes, panelSizes, yieldModels, minDieEdge } from "../config";
import { evaluateDiscInputs, evaluatePanelInputs, InputValues } from "../utils/calculations";
import { useDebouncedEffect } from "./useDebouncedEffect";

const validPositiveInteger = (value: number) => !isNaN(value) && value >= 0;

const validations : { [k in keyof InputValues] : (inputs: InputValues) => boolean } = {
	dieWidth: ({ dieWidth }) => !isNaN(dieWidth) && dieWidth >= minDieEdge,
	dieHeight: ({ dieHeight }) => !isNaN(dieHeight) && dieHeight >= minDieEdge,
	criticalArea: ({criticalArea, dieHeight, dieWidth}) => !isNaN(criticalArea) && criticalArea >= 0 && criticalArea <= dieWidth * dieHeight,
	defectRate: ({ defectRate }) => validPositiveInteger(defectRate),
	lossyEdgeWidth: ({lossyEdgeWidth}) => validPositiveInteger(lossyEdgeWidth),
	notchKeepOutHeight: ({notchKeepOutHeight}) => validPositiveInteger(notchKeepOutHeight),
	scribeHoriz: ({scribeHoriz}) => validPositiveInteger(scribeHoriz),
	scribeVert: ({scribeVert}) => validPositiveInteger(scribeVert),
	transHoriz: ({transHoriz}) => !isNaN(transHoriz),
	transVert: ({transVert}) => !isNaN(transVert),
	criticalLayers: ({criticalLayers}) => validPositiveInteger(criticalLayers),
}

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

	useDebouncedEffect(() => {
		// Reset to defaults if we can't use one or more values
		const invalidValues = Object.keys(validations).filter((validation) => !validations[validation as keyof typeof validations](values));

		if (invalidValues.length) {
			setResults(null);
		} else {
			if (shape === "Wafer") {
				setResults(evaluateDiscInputs(values, discSize, yieldModel, fieldWidth, fieldHeight));
			} else if (shape === "Panel") {
				setResults(evaluatePanelInputs(values, panelSize, yieldModel, fieldWidth, fieldHeight));
			}
		}
	}, [JSON.stringify(values), shape, panelSize, discSize, yieldModel, fieldWidth, fieldHeight], 100);

	return results;
}

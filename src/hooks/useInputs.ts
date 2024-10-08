import { useEffect, useState } from "react";
import { FabResults, WaferShape } from "../types";
import { discSizes, panelSizes, yieldModels, minDieEdge } from "../config";
import { evaluateDiscInputs, evaluatePanelInputs, InputValues } from "../utils/calculations";

const defaultState = {
	dies: [],
	totalDies: null,
	goodDies: null,
	defectiveDies: null,
	partialDies: null,
	lostDies: null,
	fabYield: null,
};

const validPositiveInteger = (value: number) => !isNaN(value) && value >= 0;

const validations : { [K in keyof InputValues] : (inputs: InputValues) => boolean } = {
	dieWidth: ({ dieWidth }) => !isNaN(dieWidth) && dieWidth >= minDieEdge,
	dieHeight: ({ dieHeight }) => !isNaN(dieHeight) && dieHeight >= minDieEdge,
	criticalArea: ({criticalArea, dieHeight, dieWidth}) => !isNaN(criticalArea) && criticalArea >= 0 && criticalArea <= dieWidth * dieHeight,
	defectRate: ({ defectRate }) => !isNaN(defectRate) && defectRate >= 0 && defectRate <= 1,
	lossyEdgeWidth: ({lossyEdgeWidth}) => validPositiveInteger(lossyEdgeWidth),
	scribeHoriz: ({scribeHoriz}) => validPositiveInteger(scribeHoriz),
	scribeVert: ({scribeVert}) => validPositiveInteger(scribeVert),
	transHoriz: ({transHoriz}) => validPositiveInteger(transHoriz),
	transVert: ({transVert}) => validPositiveInteger(transVert),
}

/**
 * Given the numeric inputs, selected wafer properties, and a yield model, calculate
 * the expected fabrication results.
 * @param values numeric values provided by the user via inputs
 * @param waferCenteringEnabled center by wafer (true) or by die (false)
 * @param yieldModel mathematical model for calculating yield
 * @param shape wafer shape
 * @param panelSize chosen size of panel wafer
 * @param discSize chosen size of disc wafer
 */
export function useInputs(
	values: InputValues,
	waferCenteringEnabled: boolean,
	yieldModel: keyof typeof yieldModels,
	shape: WaferShape,
	panelSize: keyof typeof panelSizes,
	discSize: keyof typeof discSizes
): FabResults {
	const [results, setResults] = useState<FabResults>(defaultState);

	useEffect(() => {
		// Reset to defaults if we can't use one or more values
		const invalidValues = Object.keys(validations).filter((validation) => !validations[validation as keyof typeof validations](values));

		if (invalidValues.length) {
			setResults(defaultState);
		} else {
			if (shape === "Disc") {
				setResults(evaluateDiscInputs(values, discSize, yieldModel, waferCenteringEnabled));
			} else if (shape === "Panel") {
				setResults(evaluatePanelInputs(values, panelSize, yieldModel, waferCenteringEnabled));
			}
		}
	}, [JSON.stringify(values), shape, panelSize, discSize, yieldModel, waferCenteringEnabled]);


	return results;
}

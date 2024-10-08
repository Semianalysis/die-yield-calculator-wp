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
		// Reset to defaults if we can't use some of the values
		const invalidValues = Object.values(values).filter(isNaN);

		if (invalidValues.length || values.dieWidth < minDieEdge || values.dieHeight < minDieEdge) {
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

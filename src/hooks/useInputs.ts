import { useEffect, useState } from "react";
import { FabResults, WaferShape } from "../types";
import { discSizes, panelSizes, yieldModels } from "../config";
import { evaluateDiscInputs, evaluatePanelInputs, InputValues } from "../utils/calculations";

/**
 * Given the numeric inputs, selected wafer properties, and a yield model, calculate
 * the expected fabrication results.
 * @param values numeric values provided by the user via inputs
 * @param yieldModel mathematical model for calculating yield
 * @param shape wafer shape
 * @param panelSize chosen size of panel wafer
 * @param discSize chosen size of disc wafer
 */
export function useInputs(
	values: InputValues,
	yieldModel: keyof typeof yieldModels,
	shape: WaferShape,
	panelSize: keyof typeof panelSizes,
	discSize: keyof typeof discSizes
): FabResults {
	const [results, setResults] = useState<FabResults>({
		dies: [],
		totalDies: 0,
		goodDies: 0,
		fabYield: 0,
	});

	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		lossyEdgeWidth,
		scribeHoriz,
		scribeVert,
	} = values;

	useEffect(() => {
		// Bail out if we can't use any of the values
		const invalidValues = Object.values(values).filter(isNaN);

		if (invalidValues.length) {
			return;
		}

		if (shape === "Disc") {
			setResults(evaluateDiscInputs(values, discSize, yieldModel));
		} else if (shape === "Panel") {
			setResults(evaluatePanelInputs(values, panelSize, yieldModel));
		}
	}, [dieWidth, dieHeight, criticalArea, defectRate, lossyEdgeWidth, scribeHoriz, scribeVert, shape, panelSize, discSize, yieldModel]);


	return results;
}

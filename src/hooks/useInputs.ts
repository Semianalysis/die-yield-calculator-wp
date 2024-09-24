import { useEffect, useState } from "react";
import { WaferShape } from "../types/wafers";
import { DiscSizes, PanelSizes } from "../config/sizes";
import { evaluateDiscInputs, evaluatePanelInputs, InputValues } from "../utils/calculations";
import { YieldModels } from "../config/yieldModels";
import { FabResults } from "../types/dies";

/**
 * Given the numeric inputs, selected wafer properties, and a yield model, calculate
 * the expected fabrication results.
 * @param values numeric values provided by the user via inputs
 * @param yieldModel mathematical model for calculating yield
 * @param shape wafer shape
 * @param panelSize chosen size of panel wafer
 * @param discSize chosen size of disc wafer
 */
export default function useInputs(
	values: InputValues,
	yieldModel: keyof typeof YieldModels,
	shape: WaferShape,
	panelSize: keyof typeof PanelSizes,
	discSize: keyof typeof DiscSizes
): FabResults {
	const [results, setResults] = useState<FabResults>({
		dies: [],
		totalDies: 0,
		goodDies: 0,
		fabYield: 0,
		waferWidth: 0,
		waferHeight: 0
	});

	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		edgeLoss,
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
	}, [dieWidth, dieHeight, criticalArea, defectRate, edgeLoss, scribeHoriz, scribeVert, shape, panelSize, discSize, yieldModel]);


	return results;
}

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { NumberInput } from "./NumberInput/NumberInput";
import { getFabYield, isInsideCircle, rectanglesInCircle } from "../utils/calculations";

const PANELSIZES = {
	s300mm: { name: "300 mm (12 in)", waferHeight: 300, waferWidth: 300 },
	s305mm: { name: "305 x 457 mm² (12 x 18 in²)", waferHeight: 305, waferWidth: 457 },
	s457mmsq: { name: "457 mm² (18 in)", waferHeight: 457, waferWidth: 457 },
	s457x600mm: { name: "457 x 600 mm² (18 x 24 in²)", waferHeight: 457, waferWidth: 600 },
	s510mm: { name: "510 x 515 mm² (21 in)", waferHeight: 510, waferWidth: 515 },
	s600m: { name: "600 mm (24 in)", waferHeight: 600, waferWidth: 600 }
};

const WAFERSIZES = {
	s51mm: { name: "51 mm (2 in)", waferWidth: 51 },
	s76mm: { name: "76 mm (3 in)", waferWidth: 76 },
	s100mm: { name: "100 mm (4 in)", waferWidth: 100 },
	s125mm: { name: "125 mm (5 in)", waferWidth: 125 },
	s150mm: { name: "150 mm (6 in)", waferWidth: 150 },
	s200mm: { name: "200 mm (8 in)", waferWidth: 200 },
	s300mm: { name: "300 mm (12 in)", waferWidth: 300 },
	s450mm: { name: "450 mm (18 in)", waferWidth: 450 }
};

const STATECOLORS = {
	good: "green",
	defective: "grey",
	partial: "yellow",
	lost: "red"
};

export const YIELDMODELS = {
	poisson: { name: "Poisson Model" },
	murphy: { name: "Murphy's Model" },
	rect: { name: "Rectangular Model" },
	//moore: {name: "Moore's Model"},
	seeds: { name: "Seeds Model" }
};

type Shape = "Panel" | "Wafer";

type Die = {
	x: number,
	y: number,
	width: number,
	height: number,
	key: number,
	dieState: keyof typeof STATECOLORS
};

type CalcState = {
	totalDies: number,
	goodDies: number,
	fabYield: number,
	waferWidth: number,
	waferHeight?: number,
	dies: Array<Die>
};


const ShapeSelector = (props: { shape: Shape, setShape: (value: Shape) => void }) => (
	<div className="input-group">
		<label>
			Shape:
			<select value={props.shape} onChange={(e) => props.setShape(e.target.value as Shape)}>
				<option value="Panel">Panel</option>
				<option value="Wafer">Wafer</option>
			</select>
		</label>
	</div>
);

const WaferSizeSelect = (props: {
	selectedSize: keyof typeof WAFERSIZES,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	const sizeInfo = WAFERSIZES[props.selectedSize];

	return (
		<div>
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(WAFERSIZES).map(([key, value]) => (
					<option key={key} value={key}>
						{value.name}
					</option>
				))}
			</select>
			<div>Width: {sizeInfo.waferWidth} mm
			</div>
		</div>
	);
};

const PanelSizeSelect = (props: {
	selectedSize: keyof typeof PANELSIZES,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	const sizeInfo = PANELSIZES[props.selectedSize];

	return (
		<div>
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(PANELSIZES).map(([key, value]) => (
					<option key={key} value={key}>
						{value.name}
					</option>
				))}
			</select>
			<div>Width: {sizeInfo.waferWidth} mm, Height: {sizeInfo.waferHeight} mm
			</div>
		</div>
	);
};

const ModelSelector = (props: {
	selectedModel: keyof typeof YIELDMODELS,
	handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
	<div>
		<select value={props.selectedModel} onChange={props.handleModelChange}>
			{Object.entries(YIELDMODELS).map(([key, value]) => (
				<option key={key} value={key}>
					{value.name}
				</option>
			))}
		</select>
		{}
		<div>
			Model: {YIELDMODELS[props.selectedModel].name}
		</div>
	</div>
);

const Calculations = (props: {
	calcState: CalcState
}) => (
	<div className="calculations">
		totalDies: {props.calcState.totalDies}, Good Wafers: {props.calcState.goodDies}, Fab
		Yield: {props.calcState.fabYield}
	</div>
);


function evaulatePanelInputs(
	inputVals: {
		dieWidth: number,
		dieHeight: number,
		criticalArea: number,
		defectRate: number,
		edgeLoss: number,
		scribeHoriz: number,
		scribeVert: number
	},
	selectedSize: keyof typeof PANELSIZES,
	selectedModel: keyof typeof YIELDMODELS) {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		edgeLoss,
		scribeHoriz,
		scribeVert
	} = inputVals;
	let dies = [];
	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const { waferWidth, waferHeight } = PANELSIZES[selectedSize];
	const adjustedDieWidth = dieWidth + scribeHoriz * 2;
	const adjustedDieHeight = dieHeight + scribeVert * 2;

	const diesPerRow = Math.floor(waferWidth / adjustedDieWidth);
	const diesPerColumn = Math.floor(waferHeight / adjustedDieHeight);

	const centerHorz = (waferWidth - adjustedDieWidth * diesPerRow) / 2;
	const centerVert = (waferHeight - adjustedDieHeight * diesPerColumn) / 2;

	const countWidth = Math.floor(waferWidth / (dieWidth + scribeHoriz * 2));
	const countHeight = Math.floor(waferHeight / (dieHeight + scribeVert * 2));

	const totalDies = countWidth * countHeight;

	const goodDies = Math.floor(fabYield * totalDies);

	let dieStates = new Array(totalDies).fill("defective");
	for (let i = 0; i < goodDies; i++) {
		dieStates[i] = "good";
	}

	for (let i = dieStates.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dieStates[i], dieStates[j]] = [dieStates[j], dieStates[i]];
	}

	for (let i = 0; i < dieStates.length; i++) {
		const row = Math.floor(i / diesPerRow);
		const col = i % diesPerRow;

		const dieState = dieStates[i];

		const x = col * adjustedDieWidth + centerHorz;
		const y = row * adjustedDieHeight + centerVert;
		const width = dieWidth;
		const height = dieHeight;

		dies[i] = { "key": i, "dieState": dieState, "x": x, "y": y, "width": width, "height": height };
	}

	return {
		dies,
		totalDies,
		goodDies,
		fabYield,
		waferWidth,
		waferHeight
	};
}

function evaluateWaferInputs(
	inputVals: {
		dieWidth: number,
		dieHeight: number,
		criticalArea: number,
		defectRate: number,
		edgeLoss: number,
		scribeHoriz: number,
		scribeVert: number,
	},
	selectedSize: keyof typeof WAFERSIZES,
	selectedModel: keyof typeof YIELDMODELS
) {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		edgeLoss,
		scribeHoriz,
		scribeVert
	} = inputVals;

	let dies = [];
	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const { waferWidth } = WAFERSIZES[selectedSize];

	let positions = rectanglesInCircle(waferWidth, dieWidth + scribeHoriz * 2, dieHeight + scribeVert * 2);
	let totalDies = positions.length;

	const goodDies = Math.floor(fabYield * totalDies);

	let dieStates = new Array(totalDies).fill("defective");
	for (let i = 0; i < goodDies; i++) {
		dieStates[i] = "good";
	}

	for (let i = dieStates.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dieStates[i], dieStates[j]] = [dieStates[j], dieStates[i]];
	}

	for (let i = 0; i < dieStates.length; i++) {
		const x = positions[i].x;
		const y = positions[i].y;

		const dieState = dieStates[i];
		const width = dieWidth;
		const height = dieHeight;

		const corners = [
			{ x: x, y: y },
			{ x: x + dieWidth, y: y },
			{ x: x, y: y + dieHeight },
			{ x: x + dieWidth, y: y + dieHeight }
		];

		let lossCircleRadius = waferWidth - edgeLoss;

		if (!corners.every(corner => isInsideCircle(corner.x, corner.y, waferWidth / 2, waferWidth / 2, lossCircleRadius))) {
			dieStates[i] = "partial";

		}

		dies[i] = { "key": i, "dieState": dieState, "x": x, "y": y, "width": width, "height": height };
	}

	return {
		dies,
		totalDies,
		goodDies,
		fabYield,
		waferWidth
	};
}

const WaferCanvas = (props: { calcState: CalcState }) => {
	// Bail out if there are too many dies to draw, otherwise the browser will hang
	if (props.calcState.totalDies > 9999) {
		return "Too many dies to visualize";
	}

	return (
		<svg width={props.calcState.waferWidth} height={props.calcState.waferWidth} style={{ border: "1px solid black" }}>
			<circle
				cx={props.calcState.waferWidth / 2}
				cy={props.calcState.waferWidth / 2}
				r={Math.min(props.calcState.waferWidth, props.calcState.waferWidth) / 2}
				stroke="black"
				strokeWidth="1"
				fill="none" />
			<>
				{
					props.calcState.dies.map((die) => (<Die
						key={die.key}
						color={STATECOLORS[die.dieState]}
						x={die.x}
						y={die.y}
						width={die.width}
						height={die.height}
					/>))
				}
			</>
		</svg>
	);
};

const PanelCanvas = (props: { calcState: CalcState }) => {
	// Bail out if there are too many dies to draw, otherwise the browser will hang
	if (props.calcState.totalDies > 9999) {
		return "Too many dies to visualize";
	}

	return (
		<svg width={props.calcState.waferWidth} height={props.calcState.waferHeight} style={{ border: "1px solid black" }}>
			{
				props.calcState.dies.map((die) => (
					<Die
						key={die.key}
						color={STATECOLORS[die.dieState]}
						x={die.x}
						y={die.y}
						width={die.width}
						height={die.height}
					/>
				))
			}
		</svg>
	);
};


const Die = (props: { color: string, x: number, y: number, width: number, height: number }) => (
	<rect x={props.x} y={props.y} width={props.width} height={props.height} fill={props.color} />
);

function App() {
	const [calcState, setCalcState] = useState<CalcState>({
		"dies": [],
		"totalDies": 0,
		"goodDies": 0,
		"fabYield": 0,
		"waferWidth": 0,
		"waferHeight": 0
	});
	const [dieWidth, setDieWidth] = useState<string>("8");
	const [dieHeight, setDieHeight] = useState<string>("8");
	const [aspectRatio, setAspectRatio] = useState<number>(1);
	const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
	const [criticalArea, setCriticalArea] = useState<string>("64");
	const [defectRate, setDefectRate] = useState<string>("0.1");
	const [edgeLoss, setEdgeLoss] = useState<string>("0");
	const [allCritical, setAllCritical] = useState(true);
	const [recticleLimit, setRecticleLimit] = useState(true);
	const [scribeHoriz, setScribeHoriz] = useState<string>("0.1");
	const [scribeVert, setScribeVert] = useState<string>("0.1");
	const [transHoriz, setTransHoriz] = useState<string>("0");
	const [transVert, setTransVert] = useState<string>("0.1");
	const [shape, setShape] = useState<Shape>("Panel");
	const [panelSize, setPanelSize] = useState<keyof typeof PANELSIZES>("s300mm");
	const [waferSize, setWaferSize] = useState<keyof typeof WAFERSIZES>("s300mm");
	const [selectedModel, setSelectedModel] = useState<keyof typeof YIELDMODELS>("murphy");

	useEffect(() => {
		const dieWidthNum = parseFloat(dieWidth);
		const dieHeightNum = parseFloat(dieHeight);
		if (maintainAspectRatio && !isNaN(dieWidthNum) && !isNaN(dieHeightNum)) {
			setAspectRatio(dieWidthNum / dieHeightNum);
		}
	}, [dieWidth, dieHeight, maintainAspectRatio]);

	useEffect(() => {
		const inputNums = {
			dieWidth: parseFloat(dieWidth),
			dieHeight: parseFloat(dieHeight),
			criticalArea: parseFloat(criticalArea),
			defectRate: parseFloat(defectRate),
			edgeLoss: parseFloat(edgeLoss),
			scribeHoriz: parseFloat(scribeHoriz),
			scribeVert: parseFloat(scribeVert)
		};

		// Bail out if we can't use any of the values
		const invalidValues = Object.values(inputNums).filter(isNaN);

		if (invalidValues.length) {
			return;
		}

		if (shape === "Wafer") {
			setCalcState(evaluateWaferInputs(inputNums, waferSize, selectedModel));
		} else if (shape === "Panel") {
			setCalcState(evaulatePanelInputs(inputNums, panelSize, selectedModel));
		}
	}, [dieWidth, dieHeight, criticalArea, defectRate, edgeLoss, scribeHoriz, scribeVert, shape, panelSize, waferSize, selectedModel]);

	const nullOrRound = (setter: (val: string) => void, value: string) => {
		const valFloat = parseFloat(value);

		if (isNaN(valFloat)) {
			setter("");
		} else {
			const roundedValue = Math.round(valFloat * 100) / 100;
			setter(roundedValue.toString());
		}
	};

	const handleBlur = (setter: Dispatch<SetStateAction<string>>) => () => {
		setter((prevValue) => (prevValue));
	};

	const handleDimensionChange = (dimension: "dieWidth" | "dieHeight") => (value: string) => {
		const valNum = parseFloat(value);

		if (!recticleLimit || ((dimension === "dieWidth" && valNum <= 33) || (dimension === "dieHeight" && valNum <= 26))) {
			if (dimension === "dieWidth") {
				nullOrRound(setDieWidth, value);

				if (maintainAspectRatio && aspectRatio) {
					const height = valNum / aspectRatio;

					if (!isNaN(height)) {
						nullOrRound(setDieHeight, height.toString());
					}
				}
			} else if (dimension === "dieHeight") {
				nullOrRound(setDieHeight, value);

				if (maintainAspectRatio && aspectRatio) {
					nullOrRound(setDieWidth, `${valNum * aspectRatio}`);
				}
			}
		} else {
			dimension === "dieWidth" ? setDieWidth(value) : setDieHeight(value);
		}

	};

	const handleScribeSizeChange = (dimension: string) => (value: string) => {
		if (dimension === "horiz") {
			nullOrRound(setScribeHoriz, value);
		} else if (dimension === "vert") {
			nullOrRound(setScribeVert, value);
		}
	};

	const handleCriticalAreaChange = (value: string) => {
		nullOrRound(setCriticalArea, value);
	};

	const handleDefectRateChange = (value: string) => {
		nullOrRound(setDefectRate, value);
	};

	const handleEdgeLossChange = (value: string) => {
		nullOrRound(setEdgeLoss, value);
	};

	const handleTransChange = (dimension: string) => (value: string) => {
		if (dimension === "horiz") {
			nullOrRound(setTransHoriz, value);
		} else if (dimension === "vert") {
			nullOrRound(setTransVert, value);
		}
	};

	const handleMaintainAspectRatio = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMaintainAspectRatio(event.target.checked);
	};

	const handleAllCriticalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCriticalArea(`${parseFloat(dieWidth) * parseFloat(dieHeight)}`);
		setAllCritical(event.target.checked);
	};

	const handleRecticleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecticleLimit(event.target.checked);
	};

	const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (shape === "Panel") {
			setPanelSize(event.target.value as keyof typeof PANELSIZES);
		} else if (shape === "Wafer") {
			setWaferSize(event.target.value as keyof typeof WAFERSIZES);
		}
	};

	const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(event.target.value as keyof typeof YIELDMODELS);
	};

	const numberInputs = [
		{
			label: "Die Width (mm)",
			value: dieWidth,
			onChange: handleDimensionChange("dieWidth"),
			onBlur: handleBlur(setDieWidth),
			isDisabled: false
		},
		{
			label: "Die Height (mm)",
			value: dieHeight,
			onChange: handleDimensionChange("dieHeight"),
			onBlur: handleBlur(setDieHeight),
			isDisabled: false
		},
		{
			label: "Critical Area (mm²)",
			value: criticalArea,
			onChange: handleCriticalAreaChange,
			onBlur: handleBlur(setCriticalArea),
			isDisabled: allCritical
		},
		{
			label: "Defect Rate (#/cm²)",
			value: defectRate,
			onChange: handleDefectRateChange,
			onBlur: handleBlur(setDefectRate),
			isDisabled: false
		},
		{
			label: "Edge Loss (mm)",
			value: edgeLoss,
			onChange: handleEdgeLossChange,
			onBlur: handleBlur(setEdgeLoss),
			isDisabled: false
		},
		{
			label: "Scribe Lines Horiz",
			value: scribeHoriz,
			onChange: handleScribeSizeChange("horiz"),
			onBlur: handleBlur(setScribeHoriz),
			isDisabled: false
		},
		{
			label: "Scribe Lines Vert",
			value: scribeVert,
			onChange: handleScribeSizeChange("vert"),
			onBlur: handleBlur(setScribeVert),
			isDisabled: false
		},
		{
			label: "Translation Horiz",
			value: transHoriz,
			onChange: handleTransChange("horiz"),
			onBlur: handleBlur(setTransHoriz),
			isDisabled: false
		},
		{
			label: "Translation Vert",
			value: transVert,
			onChange: handleTransChange("vert"),
			onBlur: handleBlur(setTransVert),
			isDisabled: false
		}
	];

	const checkboxes = [
		{ label: "Maintain Aspect Ratio", onChange: handleMaintainAspectRatio, checked: maintainAspectRatio },
		{ label: "Recticle Limit", onChange: handleRecticleLimitChange, checked: recticleLimit },
		{ label: "All Critical", onChange: handleAllCriticalChange, checked: allCritical },
		{
			label: "Centering", onChange: () => {
			}, checked: false
		}
	];

	return (
		<div className="calc">
			<div className="control-panel">
				{numberInputs.map(input => (
					<NumberInput
						key={input.label}
						label={input.label}
						value={input.value}
						isDisabled={input.isDisabled}
						onChange={(event) => {
							input.onChange(event.target.value);
						}}
					/>
				))}
				{checkboxes.map(input => (
					<Checkbox
						key={input.label}
						label={input.label}
						onChange={input.onChange}
						checked={input.checked}
					/>
				))}
				<ShapeSelector
					shape={shape}
					setShape={setShape}
				/>
				{
					shape === "Panel" &&
					<PanelSizeSelect
						selectedSize={panelSize}
						handleSizeChange={handleSizeChange}
					/>
				}
				{
					shape === "Wafer" &&
					<WaferSizeSelect
						selectedSize={waferSize}
						handleSizeChange={handleSizeChange}
					/>
				}
				<ModelSelector
					selectedModel={selectedModel}
					handleModelChange={handleModelChange}
				/>
			</div>
			<div className="calculations">
				<Calculations
					calcState={calcState} />
			</div>
			<div>
				{shape === "Panel" ? (
					<PanelCanvas calcState={calcState} />
				) : shape === "Wafer" ? (
					<WaferCanvas calcState={calcState} />
				) : null}
			</div>

		</div>
	);
}

export default App;

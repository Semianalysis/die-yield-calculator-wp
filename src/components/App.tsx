import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { NumberInput } from "./NumberInput/NumberInput";
import useInputs from "../hooks/useInputs";
import { PanelSizes, DiscSizes } from "../config/sizes";
import { YieldModels } from "../config/yieldModels";
import { WaferShape } from "../types/wafers";
import { FabResults } from "../types/dies";
import { DiscCanvas, PanelCanvas } from "./WaferCanvas/WaferCanvas";

const ShapeSelector = (props: { shape: WaferShape, setShape: (value: WaferShape) => void }) => (
	<div className="input-group">
		<label>
			Shape:
			<select value={props.shape} onChange={(e) => props.setShape(e.target.value as WaferShape)}>
				<option value="Panel">Panel</option>
				<option value="Disc">Wafer</option>
			</select>
		</label>
	</div>
);

const DiscSizeSelect = (props: {
	selectedSize: keyof typeof DiscSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	const sizeInfo = DiscSizes[props.selectedSize];

	return (
		<div>
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(DiscSizes).map(([key, value]) => (
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
	selectedSize: keyof typeof PanelSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	const sizeInfo = PanelSizes[props.selectedSize];

	return (
		<div>
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(PanelSizes).map(([key, value]) => (
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
	selectedModel: keyof typeof YieldModels,
	handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
	<div>
		<select value={props.selectedModel} onChange={props.handleModelChange}>
			{Object.entries(YieldModels).map(([key, value]) => (
				<option key={key} value={key}>
					{value.name}
				</option>
			))}
		</select>
		{}
		<div>
			Model: {YieldModels[props.selectedModel].name}
		</div>
	</div>
);

const ResultStats = (props: { results: FabResults }) => (
	<div className="calculations">
		totalDies: {props.results.totalDies}, Good Wafers: {props.results.goodDies}, Fab
		Yield: {props.results.fabYield}
	</div>
);

function App() {
	const [dieWidth, setDieWidth] = useState<string>("8");
	const [dieHeight, setDieHeight] = useState<string>("8");
	const [aspectRatio, setAspectRatio] = useState<number>(1);
	const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
	const [criticalArea, setCriticalArea] = useState<string>("64");
	const [defectRate, setDefectRate] = useState<string>("0.1");
	const [edgeLoss, setEdgeLoss] = useState<string>("0");
	const [allCritical, setAllCritical] = useState(true);
	const [reticleLimit, setReticleLimit] = useState(true);
	const [scribeHoriz, setScribeHoriz] = useState<string>("0.1");
	const [scribeVert, setScribeVert] = useState<string>("0.1");
	const [transHoriz, setTransHoriz] = useState<string>("0");
	const [transVert, setTransVert] = useState<string>("0.1");
	const [waferShape, setWaferShape] = useState<WaferShape>("Panel");
	const [panelSize, setPanelSize] = useState<keyof typeof PanelSizes>("s300mm");
	const [discSize, setDiscSize] = useState<keyof typeof DiscSizes>("s300mm");
	const [selectedModel, setSelectedModel] = useState<keyof typeof YieldModels>("murphy");
	const results = useInputs({
		dieWidth: parseFloat(dieWidth),
		dieHeight: parseFloat(dieHeight),
		criticalArea: parseFloat(criticalArea),
		defectRate: parseFloat(defectRate),
		edgeLoss: parseFloat(edgeLoss),
		scribeHoriz: parseFloat(scribeHoriz),
		scribeVert: parseFloat(scribeVert)
	}, selectedModel, waferShape, panelSize, discSize);

	useEffect(() => {
		const dieWidthNum = parseFloat(dieWidth);
		const dieHeightNum = parseFloat(dieHeight);
		if (maintainAspectRatio && !isNaN(dieWidthNum) && !isNaN(dieHeightNum)) {
			setAspectRatio(dieWidthNum / dieHeightNum);
		}
	}, [dieWidth, dieHeight, maintainAspectRatio]);

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

		if (!reticleLimit || ((dimension === "dieWidth" && valNum <= 33) || (dimension === "dieHeight" && valNum <= 26))) {
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

	const handleReticleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReticleLimit(event.target.checked);
	};

	const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (waferShape === "Panel") {
			setPanelSize(event.target.value as keyof typeof PanelSizes);
		} else if (waferShape === "Disc") {
			setDiscSize(event.target.value as keyof typeof DiscSizes);
		}
	};

	const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(event.target.value as keyof typeof YieldModels);
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
		{ label: "Reticle Limit", onChange: handleReticleLimitChange, checked: reticleLimit },
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
					shape={waferShape}
					setShape={setWaferShape}
				/>
				{
					waferShape === "Panel" &&
					<PanelSizeSelect
						selectedSize={panelSize}
						handleSizeChange={handleSizeChange}
					/>
				}
				{
					waferShape === "Disc" &&
					<DiscSizeSelect
						selectedSize={discSize}
						handleSizeChange={handleSizeChange}
					/>
				}
				<ModelSelector
					selectedModel={selectedModel}
					handleModelChange={handleModelChange}
				/>
			</div>
			<div className="calculations">
				<ResultStats results={results} />
			</div>
			<div>
				{waferShape === "Panel" && (
					<PanelCanvas results={results} />
				)}
				{waferShape === "Disc" && (
					<DiscCanvas results={results} />
				)}
			</div>

		</div>
	);
}

export default App;

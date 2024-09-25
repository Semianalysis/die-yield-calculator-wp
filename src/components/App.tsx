import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { NumberInput } from "./NumberInput/NumberInput";
import { useInputs } from "../hooks/useInputs";
import { panelSizes, discSizes, yieldModels } from "../config";
import { FabResults, WaferShape } from "../types";
import { DiscCanvas, PanelCanvas } from "./WaferCanvas/WaferCanvas";

const ShapeSelector = (props: { shape: WaferShape, setShape: (value: WaferShape) => void }) => {
	const shapes: Array<WaferShape> = ["Disc", "Panel"];

	return (
		<fieldset>
			<legend>Shape</legend>
			{
				shapes.map((shape) => (
					<label>
						<input
							type="radio"
							name="shape"
							checked={props.shape === shape}
							onChange={(e) => props.setShape(shape)}
						/>
						<span>{shape}</span>
					</label>
				))
			}
		</fieldset>
	);
};

const DiscSizeSelect = (props: {
	selectedSize: keyof typeof discSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	const sizeInfo = discSizes[props.selectedSize];

	return (
		<div>
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(discSizes).map(([key, value]) => (
					<option key={key} value={key}>
						{value.name}
					</option>
				))}
			</select>
			<div>Width: {sizeInfo.waferWidth} mm
			</div>
			;
		</div>
	)
		;
};

const PanelSizeSelect = (props: {
	selectedSize: keyof typeof panelSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	const sizeInfo = panelSizes[props.selectedSize];

	return (
		<div>
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(panelSizes).map(([key, value]) => (
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
	selectedModel: keyof typeof yieldModels,
	handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
	<div>
		<select value={props.selectedModel} onChange={props.handleModelChange}>
			{Object.entries(yieldModels).map(([key, value]) => (
				<option key={key} value={key}>
					{value.name}
				</option>
			))}
		</select>
		{}
		<div>
			Model: {yieldModels[props.selectedModel].name}
		</div>
	</div>
);

const ResultStats = (props: {
	results: FabResults;
}) => (
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
	const [waferShape, setWaferShape] = useState<WaferShape>("Disc");
	const [panelSize, setPanelSize] = useState<keyof typeof panelSizes>("s300mm");
	const [discSize, setDiscSize] = useState<keyof typeof discSizes>("s300mm");
	const [selectedModel, setSelectedModel] = useState<keyof typeof yieldModels>("murphy");
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
			setPanelSize(event.target.value as keyof typeof panelSizes);
		} else if (waferShape === "Disc") {
			setDiscSize(event.target.value as keyof typeof discSizes);
		}
	};

	const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(event.target.value as keyof typeof yieldModels);
	};

	return (
		<div className="container">
			<a href="https://semianalysis.com" target="_blank">
				<img
					alt="SemiAnalysis logo"
					className="logo"
					src="https://semianalysis-production.mystagingwebsite.com/wp-content/uploads/2024/07/logo-300x124.png"
				/>
			</a>
			<div className="columns">
				<div className="input">
					<h2>Die size</h2>
					<NumberInput
						label="Die Width (mm)"
						value={dieWidth}
						onChange={(event) => {
							handleDimensionChange("dieWidth")(event.target.value);
						}}
					/>
					<NumberInput
						label="Die Height (mm)"
						value={dieHeight}
						onChange={(event) => {
							handleDimensionChange("dieHeight")(event.target.value);
						}}
						isDisabled={maintainAspectRatio}
					/>
					<Checkbox
						label="Maintain Aspect Ratio"
						onChange={handleMaintainAspectRatio}
						checked={maintainAspectRatio}
					/>
					<Checkbox
						label="Reticle Limit (26mm x 33mm)"
						onChange={handleReticleLimitChange}
						checked={reticleLimit}
					/>

					<Checkbox
						label="All Critical"
						onChange={handleAllCriticalChange}
						checked={allCritical}
					/>
					<NumberInput
						label="Critical Area (mm²)"
						value={criticalArea}
						isDisabled={allCritical}
						onChange={(event) => {
							handleCriticalAreaChange(event.target.value);
						}}
					/>
					<hr />
					<h2>Wafer</h2>
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
					<NumberInput
						label="Defect Rate (#/cm²)"
						value={defectRate}
						onChange={(event) => {
							handleDefectRateChange(event.target.value);
						}}
					/>
					<NumberInput
						label="Edge Loss (mm)"
						value={edgeLoss}
						onChange={(event) => {
							handleEdgeLossChange(event.target.value);
						}}
					/>
					<NumberInput
						label="Scribe Lines Horiz"
						value={scribeHoriz}
						onChange={(event) => {
							handleScribeSizeChange("horiz")(event.target.value);
						}}
					/>
					<NumberInput
						label="Scribe Lines Vert"
						value={scribeVert}
						onChange={(event) => {
							handleScribeSizeChange("vert")(event.target.value);
						}}
					/>
					<NumberInput
						label="Translation Horiz"
						value={transHoriz}
						onChange={(event) => {
							handleTransChange("horiz")(event.target.value);
						}}
					/>
					<NumberInput
						label="Translation Vert"
						value={transVert}
						onChange={(event) => {
							handleTransChange("vert")(event.target.value);
						}}
					/>
					<ModelSelector
						selectedModel={selectedModel}
						handleModelChange={handleModelChange}
					/>
				</div>
				<div className="output">
					{waferShape === "Panel" && (
						<PanelCanvas results={results} />
					)}
					{waferShape === "Disc" && (
						<DiscCanvas results={results} />
					)}
					<ResultStats results={results} />
				</div>
			</div>
		</div>
	);
}

export default App;

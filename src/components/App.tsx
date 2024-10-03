import React, { useState, useEffect } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { NumberInput } from "./NumberInput/NumberInput";
import { useInputs } from "../hooks/useInputs";
import { panelSizes, discSizes, yieldModels } from "../config";
import { WaferShape } from "../types";
import { WaferCanvas } from "./WaferCanvas/WaferCanvas";
import { ResultsStats } from "./ResultsStats/ResultsStats";

const ShapeSelector = (props: { shape: WaferShape, setShape: (value: WaferShape) => void }) => {
	const shapes: Array<WaferShape> = ["Disc", "Panel"];

	return (
		<fieldset>
			<legend>Shape</legend>
			<div className="radio-group">
				{
					shapes.map((shape) => (
						<label className="radio-item" key={shape}>
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
			</div>
		</fieldset>
	);
};

const DiscSizeSelect = (props: {
	selectedSize: keyof typeof discSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	return (
		<label className="select">
			Diameter
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(discSizes).map(([key, value]) => (
					<option key={key} value={key}>
						{value.name}
					</option>
				))}
			</select>
		</label>
	);
};

const PanelSizeSelect = (props: {
	selectedSize: keyof typeof panelSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	return (
		<label className="select">
			Dimensions
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(panelSizes).map(([key, value]) => (
					<option key={key} value={key}>
						{value.name}
					</option>
				))}
			</select>
		</label>
	);
};

const ModelSelector = (props: {
	selectedModel: keyof typeof yieldModels,
	handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
	<label className="select">
		Yield Calculation Model
		<select value={props.selectedModel} onChange={props.handleModelChange}>
			{Object.entries(yieldModels).map(([key, value]) => (
				<option key={key} value={key}>
					{value.name}
				</option>
			))}
		</select>
	</label>
);

function App() {
	const [dieWidth, setDieWidth] = useState<string>("8");
	const [dieHeight, setDieHeight] = useState<string>("8");
	const [aspectRatio, setAspectRatio] = useState<number>(1);
	const [waferCenteringEnabled, setWaferCenteringEnabled] = useState(true);
	const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
	const [criticalArea, setCriticalArea] = useState<string>("64");
	const [defectRate, setDefectRate] = useState<string>("0.1");
	const [lossyEdgeWidth, setLossyEdgeWidth] = useState<string>("3");
	const [allCritical, setAllCritical] = useState(true);
	const [reticleLimit, setReticleLimit] = useState(true);
	const [scribeHoriz, setScribeHoriz] = useState<string>("0.2");
	const [scribeVert, setScribeVert] = useState<string>("0.2");
	const [transHoriz, setTransHoriz] = useState<string>("0");
	const [transVert, setTransVert] = useState<string>("0");
	const [waferShape, setWaferShape] = useState<WaferShape>("Disc");
	const [panelSize, setPanelSize] = useState<keyof typeof panelSizes>("s300mm");
	const [discSize, setDiscSize] = useState<keyof typeof discSizes>("s300mm");
	const [selectedModel, setSelectedModel] = useState<keyof typeof yieldModels>("murphy");
	const results = useInputs(
		{
			dieWidth: parseFloat(dieWidth),
			dieHeight: parseFloat(dieHeight),
			criticalArea: parseFloat(criticalArea),
			defectRate: parseFloat(defectRate),
			lossyEdgeWidth: parseFloat(lossyEdgeWidth),
			scribeHoriz: parseFloat(scribeHoriz),
			scribeVert: parseFloat(scribeVert),
			transHoriz: parseFloat(transHoriz),
			transVert: parseFloat(transVert),
		},
		waferCenteringEnabled,
		selectedModel,
		waferShape,
		panelSize,
		discSize,
	);

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
		nullOrRound(setLossyEdgeWidth, value);
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

	const handleWaferCenteringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWaferCenteringEnabled(event.target.checked);
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

	const waferWidth = waferShape === "Panel" ? panelSizes[panelSize].waferWidth : discSizes[discSize].waferWidth;
	const waferHeight = waferShape === "Panel" ? panelSizes[panelSize].waferHeight : discSizes[discSize].waferWidth;

	return (
		<div className="container">
			<div className="columns">
				<div className="input panel">
					<h2>Die size</h2>
					<div className="input-row--two-col">
						<NumberInput
							label="Width (mm)"
							value={dieWidth}
							onChange={(event) => {
								handleDimensionChange("dieWidth")(event.target.value);
							}}
						/>
						<NumberInput
							label="Height (mm)"
							value={dieHeight}
							onChange={(event) => {
								handleDimensionChange("dieHeight")(event.target.value);
							}}
							isDisabled={maintainAspectRatio}
						/>
					</div>
					<div className="input-row">
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
					</div>
					<div className="input-row--two-col">
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
					</div>
					<div className="input-row">
						<Checkbox
							label="All Critical"
							onChange={handleAllCriticalChange}
							checked={allCritical}
						/>
					</div>
					<div className="input-row">
						<NumberInput
							label="Critical Area (mm²)"
							value={criticalArea}
							isDisabled={allCritical}
							onChange={(event) => {
								handleCriticalAreaChange(event.target.value);
							}}
						/>
					</div>
					<hr />
					<h2>Wafer</h2>
					<div className="input-row">
						<ShapeSelector
							shape={waferShape}
							setShape={setWaferShape}
						/>
					</div>
					<div className="input-row">
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
					</div>
					<div className="input-row">
						<NumberInput
							label="Defect Rate (#/cm²)"
							value={defectRate}
							onChange={(event) => {
								handleDefectRateChange(event.target.value);
							}}
						/>
					</div>
					<div className="input-row">
						<NumberInput
							label="Edge Loss (mm)"
							value={lossyEdgeWidth}
							onChange={(event) => {
								handleEdgeLossChange(event.target.value);
							}}
							max={Math.min(waferWidth, waferHeight) / 2}
						/>
					</div>
					<div className="input-row--two-col">
						<NumberInput
							label="Translation Horizontal (mm)"
							value={transHoriz}
							onChange={(event) => {
								handleTransChange("horiz")(event.target.value);
							}}
						/>
						<NumberInput
							label="Translation Vertical (mm)"
							value={transVert}
							onChange={(event) => {
								handleTransChange("vert")(event.target.value);
							}}
						/>
					</div>
					<div className="input-row">
						<Checkbox
							label="Wafer Centering"
							onChange={handleWaferCenteringChange}
							checked={waferCenteringEnabled}
						/>
					</div>
					<hr />
					<h2>Options</h2>
					<div className="input-row">
						<ModelSelector
							selectedModel={selectedModel}
							handleModelChange={handleModelChange}
						/>
					</div>
				</div>
				<div className="output">
					<div>
						<WaferCanvas
							results={results}
							shape={waferShape}
							lossyEdgeWidth={parseFloat(lossyEdgeWidth)}
							waferWidth={waferWidth}
							waferHeight={waferHeight}
						/>
						<div className="panel">
							<h2>Results</h2>
							<ResultsStats
								results={results}
								shape={waferShape}
								dieWidth={parseFloat(dieWidth)}
								dieHeight={parseFloat(dieHeight)}
								waferWidth={waferShape === "Panel" ? panelSizes[panelSize].waferWidth : discSizes[discSize].waferWidth}
								waferHeight={waferShape === "Panel" ? panelSizes[panelSize].waferHeight : discSizes[discSize].waferWidth}
							/>
						</div>
					</div>
					<a
						href="https://semianalysis.com"
						target="_blank"
						className="logo"
					>
						<img
							alt="SemiAnalysis logo"
							src="https://semianalysis-production.mystagingwebsite.com/wp-content/uploads/2024/07/logo-300x124.png"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;

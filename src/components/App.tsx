import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { NumberInput } from "./NumberInput/NumberInput";
import { useInputs } from "../hooks/useInputs";
import {
	panelSizes,
	waferSizes,
	yieldModels,
	minDieEdge,
} from "../config";
import { SubstrateShape } from "../types";
import { WaferCanvas } from "./WaferCanvas/WaferCanvas";
import { ResultsStats } from "./ResultsStats/ResultsStats";
import semiAnalysisLogo from "../assets/semianalysis-logo-full-360px.png";
import { useEasterEgg } from "../hooks/useEasterEgg";
import { JumpToResults } from "./JumpToResults/JumpToResults";

const ShapeSelector = (props: { shape: SubstrateShape, setShape: (value: SubstrateShape) => void }) => {
	const shapes: Array<SubstrateShape> = ["Wafer", "Panel"];

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

const WaferSizeSelect = (props: {
	selectedSize: keyof typeof waferSizes,
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
	return (
		<label className="select">
			Diameter
			<select value={props.selectedSize} onChange={props.handleSizeChange}>
				{Object.entries(waferSizes).map(([key, value]) => (
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

/**
 * Get the maximum possible die size based on whether reticle limiting is enabled
 * and what the aspect ratio is, if any, falling back to a % of wafer dimensions
 * as a sane default
 */
function getDieMaxDimensions(
	reticleLimit: boolean,
	waferWidth: number,
	waferHeight: number,
	maintainAspectRatio: boolean,
	aspectRatio: number,
	fieldWidthMM: number,
	fieldHeightMM: number
) {
	// Cannot exceed reticle dimensions
	const boundingSquareWidth = reticleLimit ? fieldWidthMM : waferWidth / 4;
	const boundingSquareHeight = reticleLimit ? fieldHeightMM : waferHeight / 4;

	if (!maintainAspectRatio) {
		return {
			width: boundingSquareWidth,
			height: boundingSquareHeight
		};
	}

	return {
		width: Math.min(boundingSquareWidth, boundingSquareHeight * aspectRatio),
		height: Math.min(boundingSquareHeight, boundingSquareWidth / aspectRatio)
	};
}

/**
 * Round a numeric string and return its rounded string for display purposes,
 * stripped of any trailing zeroes
 */
function getDisplayValue(value: string) {
	const valueNum = parseFloat(value);

	if (isNaN(valueNum)) {
		return value;
	}

	return parseFloat(valueNum.toFixed(4)).toString();
}

function App() {
	const [dieWidth, setDieWidth] = useState<string>("8");
	const [dieHeight, setDieHeight] = useState<string>("8");
	const [maintainAspectRatio, setMaintainAspectRatio] = useState(false);
	const [criticalArea, setCriticalArea] = useState<string>("64");
	const [defectRate, setDefectRate] = useState<string>("0.1");
	const [lossyEdgeWidth, setLossyEdgeWidth] = useState<string>("3");
	const [allCritical, setAllCritical] = useState(true);
	const [reticleLimit, setReticleLimit] = useState(true);
	const [showShotMap, setShowShotMap] = useState(true);
	const [halfField, setHalfField] = useState(false);
	const [scribeHoriz, setScribeHoriz] = useState<string>("0.2");
	const [scribeVert, setScribeVert] = useState<string>("0.2");
	const [transHoriz, setTransHoriz] = useState<string>("0");
	const [transVert, setTransVert] = useState<string>("0");
	const [substrateShape, setSubstrateShape] = useState<SubstrateShape>("Wafer");
	const [panelSize, setPanelSize] = useState<keyof typeof panelSizes>("s300mm");
	const [waferSize, setWaferSize] = useState<keyof typeof waferSizes>("s300mm");
	const [selectedModel, setSelectedModel] = useState<keyof typeof yieldModels>("murphy");
	const aspectRatio = useRef(parseFloat(dieWidth) / parseFloat(dieHeight));

	const fieldWidthMM = halfField ? 13 : 26;
	const fieldHeightMM = 33;

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
			transVert: parseFloat(transVert)
		},
		selectedModel,
		substrateShape,
		panelSize,
		waferSize,
		fieldWidthMM,
		fieldHeightMM
	);
	const easterEggEnabled = useEasterEgg();
	const outputRef = useRef<HTMLDivElement | null>(null);

	const waferWidth = substrateShape === "Panel"
		? panelSizes[panelSize].width
		: waferSizes[waferSize].width;
	const waferHeight = substrateShape === "Panel"
		? panelSizes[panelSize].height
		: waferSizes[waferSize].width;

	// Derive max die width/height based on whether reticle limit is set.
	// Fall back to wafer dimensions / 4 as a sane max.
	const {
		width: maxDieWidth,
		height: maxDieHeight,
	} = getDieMaxDimensions(
		reticleLimit,
		waferWidth,
		waferHeight,
		maintainAspectRatio,
		aspectRatio.current,
		fieldWidthMM,
		fieldHeightMM
	);

	useEffect(() => {
		if (parseFloat(dieWidth) > maxDieWidth) {
			setDieWidth(maxDieWidth.toString());
		}
	}, [maxDieWidth]);

	useEffect(() => {
		if (parseFloat(dieHeight) > maxDieHeight) {
			setDieHeight(maxDieHeight.toString());
		}
	}, [maxDieHeight]);

	const handleDieWidthChange = (value: string) => {
		const inputValNum = parseFloat(value);

		if(isNaN(inputValNum) || inputValNum === 0) {
			setDieWidth(value);
			return;
		}

		const newWidth = Math.max(minDieEdge, Math.min(inputValNum, maxDieWidth));
		setDieWidth(newWidth.toString());

		if (maintainAspectRatio) {
			const newHeight = Math.min(newWidth / aspectRatio.current, maxDieHeight);
			setDieHeight(newHeight.toString());
		}
	};

	const handleDieHeightChange = (value: string) => {
		const inputValNum = parseFloat(value);

		if(isNaN(inputValNum) || inputValNum === 0) {
			setDieHeight(value);
			return;
		}

		const newHeight = Math.max(minDieEdge, Math.min(inputValNum, maxDieHeight));
		setDieHeight(newHeight.toString());

		if (maintainAspectRatio) {
			const newWidth = Math.min(newHeight * aspectRatio.current, maxDieWidth);
			setDieWidth(newWidth.toString());
		}
	};

	// Update critical area and aspect ratio when die size changes
	useEffect(() => {
		const dieWidthNum = parseFloat(dieWidth);
		const dieHeightNum = parseFloat(dieHeight);

		if (dieWidthNum >= minDieEdge && dieHeightNum >= minDieEdge) {
			aspectRatio.current = dieWidthNum / dieHeightNum;
			setCriticalArea(`${dieWidthNum * dieHeightNum}`);
		}
	}, [dieWidth, dieHeight]);

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
		if (substrateShape === "Panel") {
			setPanelSize(event.target.value as keyof typeof panelSizes);
		} else if (substrateShape === "Wafer") {
			setWaferSize(event.target.value as keyof typeof waferSizes);
		}
	};

	const handleShowShotMapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowShotMap(event.target.checked);
	}

	const handleHalfFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHalfField(event.target.checked);
	}

	return (
		<div className="container">
			<div className="columns">
				<div className="input panel">
					<h2>Die size</h2>
					<div className="input-row--two-col">
						<NumberInput
							label="Width (mm)"
							value={getDisplayValue(dieWidth)}
							onChange={(event) => {
								handleDieWidthChange(event.target.value);
							}}
							max={maxDieWidth}
						/>
						<NumberInput
							label="Height (mm)"
							value={getDisplayValue(dieHeight)}
							onChange={(event) => {
								handleDieHeightChange(event.target.value);
							}}
							max={maxDieHeight}
						/>
					</div>
					<div className="input-row">
						<Checkbox
							label="Maintain Aspect Ratio"
							onChange={handleMaintainAspectRatio}
							checked={maintainAspectRatio}
						/>
						<Checkbox
							label={`Reticle Limit (${fieldWidthMM}mm x ${fieldHeightMM}mm)`}
							onChange={handleReticleLimitChange}
							checked={reticleLimit}
						/>
					</div>
					<div className="input-row--two-col">
						<NumberInput
							label="Scribe Line Minimum X (mm)"
							value={scribeHoriz}
							onChange={(event) => setScribeHoriz(event.target.value)}
						/>
						<NumberInput
							label="Scribe Line Minimum Y (mm)"
							value={scribeVert}
							onChange={(event) => setScribeVert(event.target.value)}
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
							value={getDisplayValue(criticalArea)}
							isDisabled={allCritical}
							onChange={(event) => setCriticalArea(event.target.value)}
							max={parseFloat(criticalArea)}
						/>
					</div>
					<hr />
					<h2>Reticle</h2>
					<div className="input-row">
						<Checkbox
							label="Half Field Exposures"
							onChange={handleHalfFieldChange}
							checked={halfField}
						/>
					</div>
					<hr />
					<h2>Substrate</h2>
					<div className="input-row">
						<ShapeSelector
							shape={substrateShape}
							setShape={setSubstrateShape}
						/>
					</div>
					<div className="input-row">
						{
							substrateShape === "Panel" &&
							<PanelSizeSelect
								selectedSize={panelSize}
								handleSizeChange={handleSizeChange}
							/>
						}
						{
							substrateShape === "Wafer" &&
							<WaferSizeSelect
								selectedSize={waferSize}
								handleSizeChange={handleSizeChange}
							/>
						}
					</div>
					<div className="input-row">
						<NumberInput
							label="Defect Rate (#/cm²)"
							value={defectRate}
							min={0}
							onChange={(event) => setDefectRate(event.target.value)}
						/>
					</div>
					<div className="input-row">
						<NumberInput
							label="Edge Loss (mm)"
							value={lossyEdgeWidth}
							onChange={(event) => setLossyEdgeWidth(event.target.value)}
							max={Math.min(waferWidth, waferHeight) / 2}
						/>
					</div>
					<div className="input-row--two-col">
						<NumberInput
							label="Reticle Offset Horizontal (mm)"
							value={transHoriz}
							onChange={(event) => setTransHoriz(event.target.value)}
						/>
						<NumberInput
							label="Reticle Offset Vertical (mm)"
							value={transVert}
							onChange={(event) => setTransVert(event.target.value)}
						/>
					</div>
					<hr />
					<h2>Options</h2>
					<div className="input-row">
						<ModelSelector
							selectedModel={selectedModel}
							handleModelChange={(event) => setSelectedModel(event.target.value as keyof typeof yieldModels)}
						/>
					</div>
					<JumpToResults outputRef={outputRef} />
				</div>
				<div className="output" ref={outputRef}>
					<div>
						<WaferCanvas
							results={results}
							shape={substrateShape}
							lossyEdgeWidth={parseFloat(lossyEdgeWidth)}
							waferWidth={waferWidth}
							waferHeight={waferHeight}
							easterEggEnabled={easterEggEnabled}
							showShotMap={showShotMap}
							fieldWidth={fieldWidthMM}
							fieldHeight={fieldHeightMM}
						/>
						<Checkbox
							label="Show Reticle Shot Grid"
							onChange={handleShowShotMapChange}
							checked={showShotMap}
						/>
						<div className="panel">
							<h2>Results</h2>
							<ResultsStats
								results={easterEggEnabled ? null : results}
								shape={substrateShape}
								dieWidth={parseFloat(dieWidth)}
								dieHeight={parseFloat(dieHeight)}
								waferWidth={substrateShape === "Panel" ? panelSizes[panelSize].width : waferSizes[waferSize].width}
								waferHeight={substrateShape === "Panel" ? panelSizes[panelSize].height : waferSizes[waferSize].width}
							/>
						</div>
					</div>
					<a
						href="https://www.semianalysis.com/"
						target="_blank"
						className="logo"
					>
						<img
							alt="SemiAnalysis logo"
							src={semiAnalysisLogo}
							width={180}
							height={60}
						/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;

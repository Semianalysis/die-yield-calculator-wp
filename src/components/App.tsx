import React, { useState, useEffect, useRef, useMemo } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { NumberInput } from "./NumberInput/NumberInput";
import { useInputs } from "../hooks/useInputs";
import {
	defaultFieldWidth,
	defaultFieldHeight,
	minDieEdge,
	panelSizes,
	waferSizes,
	yieldModels,
} from "../config";
import { SubstrateShape } from "../types";
import { WaferCanvas } from "./WaferCanvas/WaferCanvas";
import { ReticleStats, WaferStats } from "./ResultsStats/ResultsStats";
import semiAnalysisLogo from "../assets/semianalysis-logo-full-360px.png";
import { useEasterEgg } from "../hooks/useEasterEgg";
import { JumpToResults } from "./JumpToResults/JumpToResults";
import { clampedInputDisplayValue } from "../utils/inputs";
import { ReticleCanvas } from "./ReticleCanvas/ReticleCanvas";

const ShapeSelector = (props: {
	shape: SubstrateShape;
	setShape: (value: SubstrateShape) => void;
}) => {
	const shapes: Array<SubstrateShape> = ["Wafer", "Panel"];

	return (
		<fieldset>
			<legend>Shape</legend>
			<div className="radio-group">
				{shapes.map((shape) => (
					<label className="radio-item" key={shape}>
						<input
							type="radio"
							name="shape"
							checked={props.shape === shape}
							onChange={(e) => props.setShape(shape)}
						/>
						<span>{shape}</span>
					</label>
				))}
			</div>
		</fieldset>
	);
};

const WaferSizeSelect = (props: {
	selectedSize: keyof typeof waferSizes;
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
	selectedSize: keyof typeof panelSizes;
	handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
	selectedModel: keyof typeof yieldModels;
	handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
	const [maintainAspectRatio, setMaintainAspectRatio] = useState(false);
	const [criticalArea, setCriticalArea] = useState<string>("64");
	const [defectRate, setDefectRate] = useState<string>("0.1");
	const [lossyEdgeWidth, setLossyEdgeWidth] = useState<string>("3");
	const [notchKeepOutHeight, setNotchKeepOutHeight] = useState<string>("5");
	const [substrateCost, setSubstrateCost] = useState<string>("20000");
	const [allCritical, setAllCritical] = useState(true);
	const [reticleLimit, setReticleLimit] = useState(true);
	const [showShotMap, setShowShotMap] = useState(true);
	const [showReticleBackground, setShowReticleBackground] = useState(true);
	const [halfField, setHalfField] = useState(false);
	const [scribeHoriz, setScribeHoriz] = useState<string>("0.2");
	const [scribeVert, setScribeVert] = useState<string>("0.2");
	const [transHoriz, setTransHoriz] = useState<string>("0");
	const [transVert, setTransVert] = useState<string>("0");
	const [substrateShape, setSubstrateShape] = useState<SubstrateShape>("Wafer");
	const [panelSize, setPanelSize] = useState<keyof typeof panelSizes>("s300mm");
	const [waferSize, setWaferSize] = useState<keyof typeof waferSizes>("s300mm");
	const [selectedModel, setSelectedModel] =
		useState<keyof typeof yieldModels>("murphy");
	const [criticalLayers, setCriticalLayers] = useState<string>("25");
	const [manualYield, setManualYield] = useState<string>("100");
	const aspectRatio = useRef(parseFloat(dieWidth) / parseFloat(dieHeight));

	const waferWidth =
		substrateShape === "Panel"
			? panelSizes[panelSize].width
			: waferSizes[waferSize].width;
	const waferHeight =
		substrateShape === "Panel"
			? panelSizes[panelSize].height
			: waferSizes[waferSize].width;

	const { width: fieldWidthMM, height: fieldHeightMM } = useMemo(() => {
		if (!reticleLimit) {
			return {
				width: waferWidth,
				height: waferHeight,
			};
		}

		return {
			width: defaultFieldWidth,
			height: halfField ? defaultFieldHeight / 2 : defaultFieldHeight,
		};
	}, [reticleLimit, halfField, waferWidth, waferHeight]);

	const { results, validationError } = useInputs(
		{
			dieWidth: parseFloat(dieWidth),
			dieHeight: parseFloat(dieHeight),
			criticalArea: parseFloat(criticalArea),
			defectRate: parseFloat(defectRate),
			lossyEdgeWidth: parseFloat(lossyEdgeWidth),
			notchKeepOutHeight: parseFloat(notchKeepOutHeight),
			substrateCost: parseFloat(substrateCost),
			scribeHoriz: parseFloat(scribeHoriz),
			scribeVert: parseFloat(scribeVert),
			transHoriz: parseFloat(transHoriz),
			transVert: parseFloat(transVert),
			criticalLayers: parseFloat(criticalLayers),
			manualYield: parseFloat(manualYield),
		},
		{
			yieldModel: selectedModel,
			substrateShape,
			panelSize,
			discSize: waferSize,
			fieldWidth: fieldWidthMM,
			fieldHeight: fieldHeightMM,
			reticleLimit,
		},
	);
	const easterEggEnabled = useEasterEgg();
	const outputRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (parseFloat(dieWidth) > fieldWidthMM) {
			setDieWidth(fieldWidthMM.toString());
		}
	}, [fieldWidthMM]);

	useEffect(() => {
		if (parseFloat(dieHeight) > fieldHeightMM) {
			setDieHeight(fieldHeightMM.toString());
		}
	}, [fieldHeightMM]);

	useEffect(() => {
		if (!reticleLimit) {
			setShowShotMap(false);
			setHalfField(false);
		} else {
			setShowShotMap(true);
		}
	}, [reticleLimit]);

	const handleDieWidthChange = (value: string) => {
		const inputValNum = parseFloat(value);

		if (isNaN(inputValNum) || inputValNum === 0) {
			setDieWidth(value);
			return;
		}

		const clampedWidth = clampedInputDisplayValue(
			value,
			minDieEdge,
			fieldWidthMM,
		);
		setDieWidth(clampedWidth);

		if (maintainAspectRatio) {
			const clampedHeight = clampedInputDisplayValue(
				clampedWidth,
				minDieEdge,
				fieldHeightMM,
			);
			setDieHeight(clampedHeight);
		}
	};

	const handleDieHeightChange = (value: string) => {
		const inputValNum = parseFloat(value);

		if (isNaN(inputValNum) || inputValNum === 0) {
			setDieHeight(value);
			return;
		}

		const clampedHeight = clampedInputDisplayValue(
			value,
			minDieEdge,
			fieldHeightMM,
		);
		setDieHeight(clampedHeight);

		if (maintainAspectRatio) {
			const clampedWidth = clampedInputDisplayValue(
				clampedHeight,
				minDieEdge,
				fieldHeightMM,
			);
			setDieWidth(clampedWidth);
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

	const handleMaintainAspectRatio = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMaintainAspectRatio(event.target.checked);
	};

	const handleAllCriticalChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setCriticalArea(`${parseFloat(dieWidth) * parseFloat(dieHeight)}`);
		setAllCritical(event.target.checked);
	};

	const handleReticleLimitChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setReticleLimit(event.target.checked);
	};

	const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (substrateShape === "Panel") {
			setPanelSize(event.target.value as keyof typeof panelSizes);
		} else if (substrateShape === "Wafer") {
			setWaferSize(event.target.value as keyof typeof waferSizes);
		}
	};

	const handleShowShotMapChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setShowShotMap(event.target.checked);
	};

	const handleShowReticleBackgroundChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setShowReticleBackground(event.target.checked);
	};

	const handleHalfFieldChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setHalfField(event.target.checked);
	};

	return (
		<div className="container">
			<div className="columns">
				<div className="input panel">
					<h2>Die Size</h2>
					<div className="input-row--two-col">
						<NumberInput
							label="Die Width (mm)"
							value={dieWidth}
							onChange={(event) => {
								handleDieWidthChange(event.target.value);
							}}
							max={fieldWidthMM}
						/>
						<NumberInput
							label="Die Height (mm)"
							value={dieHeight}
							onChange={(event) => {
								handleDieHeightChange(event.target.value);
							}}
							max={fieldHeightMM}
						/>
					</div>
					<div className="input-row">
						<Checkbox
							label="Maintain Aspect Ratio"
							onChange={handleMaintainAspectRatio}
							checked={maintainAspectRatio}
						/>
						<Checkbox
							label={`Reticle Limit (${defaultFieldWidth}mm x ${defaultFieldHeight}mm)`}
							onChange={handleReticleLimitChange}
							checked={reticleLimit}
						/>
					</div>
					<div className="input-row--two-col">
						<NumberInput
							label="Scribe Line X (mm)"
							value={scribeHoriz}
							onChange={(event) => setScribeHoriz(event.target.value)}
						/>
						<NumberInput
							label="Scribe Line Y (mm)"
							value={scribeVert}
							onChange={(event) => setScribeVert(event.target.value)}
						/>
					</div>
					<hr />
					<h2>Reticle</h2>
					<div className="input-row">
						<Checkbox
							label="Half Field Exposures (High NA)"
							onChange={handleHalfFieldChange}
							checked={halfField}
							disabled={!reticleLimit}
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
					<h2>Substrate</h2>
					<div className="input-row">
						<ShapeSelector
							shape={substrateShape}
							setShape={setSubstrateShape}
						/>
					</div>
					<div className="input-row">
						{substrateShape === "Panel" && (
							<PanelSizeSelect
								selectedSize={panelSize}
								handleSizeChange={handleSizeChange}
							/>
						)}
						{substrateShape === "Wafer" && (
							<WaferSizeSelect
								selectedSize={waferSize}
								handleSizeChange={handleSizeChange}
							/>
						)}
					</div>
					<div className="input-row">
						<NumberInput
							label="Edge Loss (mm)"
							value={lossyEdgeWidth}
							onChange={(event) => setLossyEdgeWidth(event.target.value)}
							max={Math.min(waferWidth, waferHeight) / 2}
						/>
					</div>
					{substrateShape === "Wafer" && (
						<div className="input-row">
							<NumberInput
								label="Notch keep-out (mm)"
								value={notchKeepOutHeight}
								onChange={(event) => setNotchKeepOutHeight(event.target.value)}
								max={Math.min(waferWidth, waferHeight) / 2}
							/>
						</div>
					)}
					<div className="input-row">
						<NumberInput
							label="Substrate Cost ($)"
							value={substrateCost}
							onChange={(event) => setSubstrateCost(event.target.value)}
							min={0}
							step={100}
						/>
					</div>
					<hr />
					<h2>Defects</h2>
					<div className="input-row">
						<ModelSelector
							selectedModel={selectedModel}
							handleModelChange={(event) =>
								setSelectedModel(event.target.value as keyof typeof yieldModels)
							}
						/>
					</div>
					{selectedModel !== "manual" && (
						<>
							<div className="input-row">
								<Checkbox
									label="All Die Area Critical"
									onChange={handleAllCriticalChange}
									checked={allCritical}
								/>
							</div>
							<div className="input-row">
								<NumberInput
									label="Critical Die Area (mm²)"
									value={criticalArea}
									isDisabled={allCritical}
									onChange={(event) => setCriticalArea(event.target.value)}
									max={parseFloat(criticalArea)}
								/>
							</div>
							<div className="input-row">
								<NumberInput
									label="Defect Rate (#/cm²)"
									value={defectRate}
									min={0}
									onChange={(event) => setDefectRate(event.target.value)}
								/>
							</div>
						</>
					)}
					{selectedModel === "bose-einstein" && (
						<div className="input-row">
							<NumberInput
								label="Critical Layers"
								value={criticalLayers}
								onChange={(event) => setCriticalLayers(event.target.value)}
								min={0}
								max={100}
							/>
						</div>
					)}
					{selectedModel === "manual" && (
						<div className="input-row">
							<NumberInput
								label="Yield (%)"
								value={manualYield}
								onChange={(event) => setManualYield(event.target.value)}
								min={0}
								max={100}
							/>
						</div>
					)}
					<JumpToResults outputRef={outputRef} />
				</div>
				<div className="output" ref={outputRef}>
					<div className="panel">
						<h2>Wafer Results</h2>
						<WaferCanvas
							results={results}
							shape={substrateShape}
							lossyEdgeWidth={parseFloat(lossyEdgeWidth)}
							notchKeepOutHeight={parseFloat(notchKeepOutHeight)}
							waferWidth={waferWidth}
							waferHeight={waferHeight}
							easterEggEnabled={easterEggEnabled}
							showShotMap={showShotMap}
							validationError={validationError}
						/>
						<Checkbox
							label="Show Reticle Shot Grid"
							onChange={handleShowShotMapChange}
							checked={showShotMap}
							disabled={!reticleLimit}
						/>
						<hr />
						<WaferStats
							results={easterEggEnabled ? null : results}
							shape={substrateShape}
							dieWidth={parseFloat(dieWidth)}
							dieHeight={parseFloat(dieHeight)}
							waferWidth={
								substrateShape === "Panel"
									? panelSizes[panelSize].width
									: waferSizes[waferSize].width
							}
							waferHeight={
								substrateShape === "Panel"
									? panelSizes[panelSize].height
									: waferSizes[waferSize].width
							}
							reticleLimit={reticleLimit}
						/>
					</div>
					{reticleLimit && (
						<div className="panel">
							<h2>Reticle Results</h2>
							<ReticleCanvas
								dieWidth={parseFloat(dieWidth)}
								dieHeight={parseFloat(dieHeight)}
								scribeHoriz={parseFloat(scribeHoriz)}
								scribeVert={parseFloat(scribeVert)}
								mmToPxScale={12}
								showReticleBackground={showReticleBackground}
								halfField={halfField}
							/>
							<Checkbox
								label="Show Illustrative Background"
								onChange={handleShowReticleBackgroundChange}
								checked={showReticleBackground}
							/>
							<hr />
							<ReticleStats results={easterEggEnabled ? null : results} />
						</div>
					)}
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

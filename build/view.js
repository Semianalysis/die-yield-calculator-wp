/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const PANELSIZES = {
  s300mm: {
    name: "300 mm (12 in)",
    waferHeight: 300,
    waferWidth: 300
  },
  s305mm: {
    name: "305 x 457 mm² (12 x 18 in²)",
    waferHeight: 305,
    waferWidth: 457
  },
  s457mmsq: {
    name: "457 mm² (18 in)",
    waferHeight: 457,
    waferWidth: 457
  },
  s457x600mm: {
    name: "457 x 600 mm² (18 x 24 in²)",
    waferHeight: 457,
    waferWidth: 600
  },
  s510mm: {
    name: "510 x 515 mm² (21 in)",
    waferHeight: 510,
    waferWidth: 515
  },
  s600m: {
    name: "600 mm (24 in)",
    waferHeight: 600,
    waferWidth: 600
  }
};
const WAFERSIZES = {
  s51mm: {
    name: "51 mm (2 in)",
    waferWidth: 51
  },
  s76mm: {
    name: "76 mm (3 in)",
    waferWidth: 76
  },
  s100mm: {
    name: "100 mm (4 in)",
    waferWidth: 100
  },
  s125mm: {
    name: "125 mm (5 in)",
    waferWidth: 125
  },
  s150mm: {
    name: "150 mm (6 in)",
    waferWidth: 150
  },
  s200mm: {
    name: "200 mm (8 in)",
    waferWidth: 200
  },
  s300mm: {
    name: "300 mm (12 in)",
    waferWidth: 300
  },
  s450mm: {
    name: "450 mm (18 in)",
    waferWidth: 450
  }
};
const STATECOLORS = {
  good: "green",
  defective: "grey",
  partial: "yellow",
  lost: "red"
};
const YIELDMODELS = {
  poisson: {
    name: "Poisson Model"
  },
  murph: {
    name: "Murphy's Model"
  },
  rect: {
    name: "Rectangular Model"
  },
  //moore: {name: "Moore's Model"},
  seeds: {
    name: "Seeds Model"
  }
};
const NumberInput = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "input-group"
}, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, props.label, ":", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
  type: "number",
  disabled: props.isDisabled,
  value: props.value,
  onChange: props.onChange,
  onBlur: props.onBlur,
  step: "0.01"
})));
const Checkbox = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
  className: "checkbox"
}, props.label, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
  type: "checkbox",
  onChange: props.onChange,
  checked: props.checked
}));
const ShapeSelector = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "input-group"
}, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Shape:", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
  value: props.shape,
  onChange: e => props.setShape(e.target.value)
}, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  value: "Panel"
}, "Panel"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  value: "Wafer"
}, "Wafer"))));
const WaferSizeSelect = props => {
  const sizeInfo = WAFERSIZES[props.selectedSize];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: props.selectedSize,
    onChange: props.handleSizeChange
  }, Object.entries(WAFERSIZES).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: key,
    value: key
  }, value.name))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Width: ", sizeInfo.waferWidth, " mm"));
};
const PanelSizeSelect = props => {
  const sizeInfo = PANELSIZES[props.selectedSize];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: props.selectedSize,
    onChange: props.handleSizeChange
  }, Object.entries(PANELSIZES).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: key,
    value: key
  }, value.name))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Width: ", sizeInfo.waferWidth, " mm, Height: ", sizeInfo.waferHeight, " mm"));
};
const ModelSelector = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
  value: props.selectedModel,
  onChange: props.handleModelChange
}, Object.entries(YIELDMODELS).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  key: key,
  value: key
}, value.name))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Model: ", YIELDMODELS[props.selectedModel].name));
const Calculations = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "calculations"
}, "totalDies: ", props.calcState.totalDies, ", Good Wafers: ", props.calcState.goodDies, ", Fab Yield: ", props.calcState.fabYield);
function isInsideCircle(x, y, centerX, centerY, radius) {
  return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}
function rectanglesInCircle(diameter, rectWidth, rectHeight) {
  const radius = diameter / 2;
  const centerX = radius;
  const centerY = radius;
  let positions = [];
  for (let x = 0; x <= diameter + rectWidth; x += rectWidth) {
    for (let y = 0; y <= diameter + rectHeight; y += rectHeight) {
      const corners = [{
        x: x,
        y: y
      }, {
        x: x + rectWidth,
        y: y
      }, {
        x: x,
        y: y + rectHeight
      }, {
        x: x + rectWidth,
        y: y + rectHeight
      }];
      if (corners.every(corner => isInsideCircle(corner.x, corner.y, centerX, centerY, radius))) {
        positions.push({
          x: x,
          y: y
        });
      }
    }
  }
  return positions;
}
function getFabYield(defectRate, criticalArea, model) {
  const defects = criticalArea * defectRate / 100;
  switch (model) {
    case "poisson":
      return Math.exp(-defects);
    case "murph":
      return Math.pow((1 - Math.exp(-defects)) / defects, 2);
    case "rect":
      return (1 - Math.exp(-2 * defects)) / (2 * defects);
    //case ('moore'):
    //  return Math.exp(Math.sqrt(-defects));
    case "seeds":
      return 1 / (1 + defects);
    default:
      console.log("Invalid Model.");
      return 0;
  }
}
function evaulatePanelInputs(inputVals, selectedSize, selectedModel) {
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
  const {
    waferWidth,
    waferHeight
  } = PANELSIZES[selectedSize];
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
    dies[i] = {
      "key": i,
      "dieState": dieState,
      "x": x,
      "y": y,
      "width": width,
      "height": height
    };
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
function evaluateWaferInputs(inputVals, selectedSize, selectedModel) {
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
  const {
    waferWidth
  } = WAFERSIZES[selectedSize];
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
    const corners = [{
      x: x,
      y: y
    }, {
      x: x + dieWidth,
      y: y
    }, {
      x: x,
      y: y + dieHeight
    }, {
      x: x + dieWidth,
      y: y + dieHeight
    }];
    let lossCircleRadius = waferWidth - edgeLoss;
    if (!corners.every(corner => isInsideCircle(corner.x, corner.y, waferWidth / 2, waferWidth / 2, lossCircleRadius))) {
      dieStates[i] = "partial";
    }
    dies[i] = {
      "key": i,
      "dieState": dieState,
      "x": x,
      "y": y,
      "width": width,
      "height": height
    };
  }
  return {
    dies,
    totalDies,
    goodDies,
    fabYield,
    waferWidth
  };
}
const WaferCanvas = props => {
  // Bail out if there are too many dies to draw, otherwise the browser will hang
  if (props.calcState.totalDies > 9999) {
    return 'Too many dies to visualize';
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: props.calcState.waferWidth,
    height: props.calcState.waferWidth,
    style: {
      border: "1px solid black"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: props.calcState.waferWidth / 2,
    cy: props.calcState.waferWidth / 2,
    r: Math.min(props.calcState.waferWidth, props.calcState.waferWidth) / 2,
    stroke: "black",
    strokeWidth: "1",
    fill: "none"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, props.calcState.dies.map(die => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Die, {
    key: die.key,
    color: STATECOLORS[die.dieState],
    x: die.x,
    y: die.y,
    width: die.width,
    height: die.height
  }))));
};
const PanelCanvas = props => {
  // Bail out if there are too many dies to draw, otherwise the browser will hang
  if (props.calcState.totalDies > 9999) {
    return 'Too many dies to visualize';
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: props.calcState.waferWidth,
    height: props.calcState.waferHeight,
    style: {
      border: "1px solid black"
    }
  }, props.calcState.dies.map(die => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Die, {
    key: die.key,
    color: STATECOLORS[die.dieState],
    x: die.x,
    y: die.y,
    width: die.width,
    height: die.height
  })));
};
const Die = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
  x: props.x,
  y: props.y,
  width: props.width,
  height: props.height,
  fill: props.color
});
function App() {
  const [calcState, setCalcState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    "dies": [],
    "totalDies": 0,
    "goodDies": 0,
    "fabYield": 0,
    "waferWidth": 0,
    "waferHeight": 0
  });
  const [dieWidth, setDieWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("8");
  const [dieHeight, setDieHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("8");
  const [aspectRatio, setAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [maintainAspectRatio, setMaintainAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [criticalArea, setCriticalArea] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("64");
  const [defectRate, setDefectRate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [edgeLoss, setEdgeLoss] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0");
  const [allCritical, setAllCritical] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [recticleLimit, setRecticleLimit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [scribeHoriz, setScribeHoriz] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [scribeVert, setScribeVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [transHoriz, setTransHoriz] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0");
  const [transVert, setTransVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [shape, setShape] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Panel");
  const [panelSize, setPanelSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("s300mm");
  const [waferSize, setWaferSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("s300mm");
  const [selectedModel, setSelectedModel] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("murph");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const dieWidthNum = parseFloat(dieWidth);
    const dieHeightNum = parseFloat(dieHeight);
    if (maintainAspectRatio && !isNaN(dieWidthNum) && !isNaN(dieHeightNum)) {
      setAspectRatio(dieWidthNum / dieHeightNum);
    }
  }, [dieWidth, dieHeight, maintainAspectRatio]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
  const nullOrRound = (setter, value) => {
    const valFloat = parseFloat(value);
    if (isNaN(valFloat)) {
      setter("");
    } else {
      const roundedValue = Math.round(valFloat * 100) / 100;
      setter(roundedValue.toString());
    }
  };
  const handleBlur = setter => () => {
    setter(prevValue => prevValue);
  };
  const handleDimensionChange = dimension => value => {
    const valNum = parseFloat(value);
    if (!recticleLimit || dimension === "dieWidth" && valNum <= 33 || dimension === "dieHeight" && valNum <= 26) {
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
  const handleScribeSizeChange = dimension => value => {
    if (dimension === "horiz") {
      nullOrRound(setScribeHoriz, value);
    } else if (dimension === "vert") {
      nullOrRound(setScribeVert, value);
    }
  };
  const handleCriticalAreaChange = value => {
    nullOrRound(setCriticalArea, value);
  };
  const handleDefectRateChange = value => {
    nullOrRound(setDefectRate, value);
  };
  const handleEdgeLossChange = value => {
    nullOrRound(setEdgeLoss, value);
  };
  const handleTransChange = dimension => value => {
    if (dimension === "horiz") {
      nullOrRound(setTransHoriz, value);
    } else if (dimension === "vert") {
      nullOrRound(setTransVert, value);
    }
  };
  const handleMaintainAspectRatio = event => {
    setMaintainAspectRatio(event.target.checked);
  };
  const handleAllCriticalChange = event => {
    setCriticalArea(`${parseFloat(dieWidth) * parseFloat(dieHeight)}`);
    setAllCritical(event.target.checked);
  };
  const handleRecticleLimitChange = event => {
    setRecticleLimit(event.target.checked);
  };
  const handleSizeChange = event => {
    if (shape === "Panel") {
      setPanelSize(event.target.value);
    } else if (shape === "Wafer") {
      setWaferSize(event.target.value);
    }
  };
  const handleModelChange = event => {
    setSelectedModel(event.target.value);
  };
  const numberInputs = [{
    label: "Die Width (mm)",
    value: dieWidth,
    onChange: handleDimensionChange("dieWidth"),
    onBlur: handleBlur(setDieWidth),
    isDisabled: false
  }, {
    label: "Die Height (mm)",
    value: dieHeight,
    onChange: handleDimensionChange("dieHeight"),
    onBlur: handleBlur(setDieHeight),
    isDisabled: false
  }, {
    label: "Critical Area (mm²)",
    value: criticalArea,
    onChange: handleCriticalAreaChange,
    onBlur: handleBlur(setCriticalArea),
    isDisabled: allCritical
  }, {
    label: "Defect Rate (#/cm²)",
    value: defectRate,
    onChange: handleDefectRateChange,
    onBlur: handleBlur(setDefectRate),
    isDisabled: false
  }, {
    label: "Edge Loss (mm)",
    value: edgeLoss,
    onChange: handleEdgeLossChange,
    onBlur: handleBlur(setEdgeLoss),
    isDisabled: false
  }, {
    label: "Scribe Lines Horiz",
    value: scribeHoriz,
    onChange: handleScribeSizeChange("horiz"),
    onBlur: handleBlur(setScribeHoriz),
    isDisabled: false
  }, {
    label: "Scribe Lines Vert",
    value: scribeVert,
    onChange: handleScribeSizeChange("vert"),
    onBlur: handleBlur(setScribeVert),
    isDisabled: false
  }, {
    label: "Translation Horiz",
    value: transHoriz,
    onChange: handleTransChange("horiz"),
    onBlur: handleBlur(setTransHoriz),
    isDisabled: false
  }, {
    label: "Translation Vert",
    value: transVert,
    onChange: handleTransChange("vert"),
    onBlur: handleBlur(setTransVert),
    isDisabled: false
  }];
  const checkboxes = [{
    label: "Maintain Aspect Ratio",
    onChange: handleMaintainAspectRatio,
    checked: maintainAspectRatio
  }, {
    label: "Recticle Limit",
    onChange: handleRecticleLimitChange,
    checked: recticleLimit
  }, {
    label: "All Critical",
    onChange: handleAllCriticalChange,
    checked: allCritical
  }, {
    label: "Centering",
    onChange: () => {},
    checked: false
  }];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "calc"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "control-panel"
  }, numberInputs.map(input => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NumberInput, {
    key: input.label,
    label: input.label,
    value: input.value,
    isDisabled: input.isDisabled,
    onChange: event => {
      input.onChange(event.target.value);
    }
  })), checkboxes.map(input => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Checkbox, {
    key: input.label,
    label: input.label,
    onChange: input.onChange,
    checked: input.checked
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ShapeSelector, {
    shape: shape,
    setShape: setShape
  }), shape === "Panel" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PanelSizeSelect, {
    selectedSize: panelSize,
    handleSizeChange: handleSizeChange
  }), shape === "Wafer" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(WaferSizeSelect, {
    selectedSize: waferSize,
    handleSizeChange: handleSizeChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ModelSelector, {
    selectedModel: selectedModel,
    handleModelChange: handleModelChange
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "calculations"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Calculations, {
    calcState: calcState
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, shape === "Panel" ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PanelCanvas, {
    calcState: calcState
  }) : shape === "Wafer" ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(WaferCanvas, {
    calcState: calcState
  }) : null));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



document.addEventListener('DOMContentLoaded', () => {
  const domNode = document.getElementById('die-yield-calculator');
  react_dom__WEBPACK_IMPORTED_MODULE_0___default().render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], {}), domNode);
});
/******/ })()
;
//# sourceMappingURL=view.js.map
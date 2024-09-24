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
/* harmony import */ var _Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox/Checkbox */ "./src/components/Checkbox/Checkbox.tsx");
/* harmony import */ var _NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NumberInput/NumberInput */ "./src/components/NumberInput/NumberInput.tsx");
/* harmony import */ var _hooks_useInputs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useInputs */ "./src/hooks/useInputs.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./src/config/index.ts");
/* harmony import */ var _WaferCanvas_WaferCanvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WaferCanvas/WaferCanvas */ "./src/components/WaferCanvas/WaferCanvas.tsx");






const ShapeSelector = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "input-group"
}, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Shape:", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
  value: props.shape,
  onChange: e => props.setShape(e.target.value)
}, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  value: "Panel"
}, "Panel"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  value: "Disc"
}, "Wafer"))));
const DiscSizeSelect = props => {
  const sizeInfo = _config__WEBPACK_IMPORTED_MODULE_4__.DiscSizes[props.selectedSize];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: props.selectedSize,
    onChange: props.handleSizeChange
  }, Object.entries(_config__WEBPACK_IMPORTED_MODULE_4__.DiscSizes).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: key,
    value: key
  }, value.name))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Width: ", sizeInfo.waferWidth, " mm"));
};
const PanelSizeSelect = props => {
  const sizeInfo = _config__WEBPACK_IMPORTED_MODULE_4__.PanelSizes[props.selectedSize];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: props.selectedSize,
    onChange: props.handleSizeChange
  }, Object.entries(_config__WEBPACK_IMPORTED_MODULE_4__.PanelSizes).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: key,
    value: key
  }, value.name))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Width: ", sizeInfo.waferWidth, " mm, Height: ", sizeInfo.waferHeight, " mm"));
};
const ModelSelector = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
  value: props.selectedModel,
  onChange: props.handleModelChange
}, Object.entries(_config__WEBPACK_IMPORTED_MODULE_4__.YieldModels).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  key: key,
  value: key
}, value.name))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Model: ", _config__WEBPACK_IMPORTED_MODULE_4__.YieldModels[props.selectedModel].name));
const ResultStats = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "calculations"
}, "totalDies: ", props.results.totalDies, ", Good Wafers: ", props.results.goodDies, ", Fab Yield: ", props.results.fabYield);
function App() {
  const [dieWidth, setDieWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("8");
  const [dieHeight, setDieHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("8");
  const [aspectRatio, setAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [maintainAspectRatio, setMaintainAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [criticalArea, setCriticalArea] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("64");
  const [defectRate, setDefectRate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [edgeLoss, setEdgeLoss] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0");
  const [allCritical, setAllCritical] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [reticleLimit, setReticleLimit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [scribeHoriz, setScribeHoriz] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [scribeVert, setScribeVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [transHoriz, setTransHoriz] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0");
  const [transVert, setTransVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
  const [waferShape, setWaferShape] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Panel");
  const [panelSize, setPanelSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("s300mm");
  const [discSize, setDiscSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("s300mm");
  const [selectedModel, setSelectedModel] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("murphy");
  const results = (0,_hooks_useInputs__WEBPACK_IMPORTED_MODULE_3__.useInputs)({
    dieWidth: parseFloat(dieWidth),
    dieHeight: parseFloat(dieHeight),
    criticalArea: parseFloat(criticalArea),
    defectRate: parseFloat(defectRate),
    edgeLoss: parseFloat(edgeLoss),
    scribeHoriz: parseFloat(scribeHoriz),
    scribeVert: parseFloat(scribeVert)
  }, selectedModel, waferShape, panelSize, discSize);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const dieWidthNum = parseFloat(dieWidth);
    const dieHeightNum = parseFloat(dieHeight);
    if (maintainAspectRatio && !isNaN(dieWidthNum) && !isNaN(dieHeightNum)) {
      setAspectRatio(dieWidthNum / dieHeightNum);
    }
  }, [dieWidth, dieHeight, maintainAspectRatio]);
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
    if (!reticleLimit || dimension === "dieWidth" && valNum <= 33 || dimension === "dieHeight" && valNum <= 26) {
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
  const handleReticleLimitChange = event => {
    setReticleLimit(event.target.checked);
  };
  const handleSizeChange = event => {
    if (waferShape === "Panel") {
      setPanelSize(event.target.value);
    } else if (waferShape === "Disc") {
      setDiscSize(event.target.value);
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
    label: "Reticle Limit",
    onChange: handleReticleLimitChange,
    checked: reticleLimit
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
  }, numberInputs.map(input => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    key: input.label,
    label: input.label,
    value: input.value,
    isDisabled: input.isDisabled,
    onChange: event => {
      input.onChange(event.target.value);
    }
  })), checkboxes.map(input => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
    key: input.label,
    label: input.label,
    onChange: input.onChange,
    checked: input.checked
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ShapeSelector, {
    shape: waferShape,
    setShape: setWaferShape
  }), waferShape === "Panel" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PanelSizeSelect, {
    selectedSize: panelSize,
    handleSizeChange: handleSizeChange
  }), waferShape === "Disc" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DiscSizeSelect, {
    selectedSize: discSize,
    handleSizeChange: handleSizeChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ModelSelector, {
    selectedModel: selectedModel,
    handleModelChange: handleModelChange
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "calculations"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResultStats, {
    results: results
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, waferShape === "Panel" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WaferCanvas_WaferCanvas__WEBPACK_IMPORTED_MODULE_5__.PanelCanvas, {
    results: results
  }), waferShape === "Disc" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WaferCanvas_WaferCanvas__WEBPACK_IMPORTED_MODULE_5__.DiscCanvas, {
    results: results
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/Checkbox/Checkbox.tsx":
/*!**********************************************!*\
  !*** ./src/components/Checkbox/Checkbox.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Checkbox: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Checkbox(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox"
  }, props.label, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    onChange: props.onChange,
    checked: props.checked
  }));
}

/***/ }),

/***/ "./src/components/NumberInput/NumberInput.tsx":
/*!****************************************************!*\
  !*** ./src/components/NumberInput/NumberInput.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NumberInput: () => (/* binding */ NumberInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function NumberInput(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, props.label, ":", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    disabled: props.isDisabled,
    value: props.value,
    onChange: props.onChange,
    onBlur: props.onBlur,
    step: "0.01"
  })));
}

/***/ }),

/***/ "./src/components/WaferCanvas/WaferCanvas.tsx":
/*!****************************************************!*\
  !*** ./src/components/WaferCanvas/WaferCanvas.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscCanvas: () => (/* binding */ DiscCanvas),
/* harmony export */   PanelCanvas: () => (/* binding */ PanelCanvas)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function DieItem(props) {
  const stateColors = {
    good: "green",
    defective: "grey",
    partial: "yellow",
    lost: "red"
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    fill: stateColors[props.dieState]
  });
}
function DiscCanvas(props) {
  // Bail out if there are too many dies to draw, otherwise the browser will hang
  if (props.results.totalDies > 9999) {
    return "Too many dies to visualize";
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: props.results.waferWidth,
    height: props.results.waferWidth,
    style: {
      border: "1px solid black"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: props.results.waferWidth / 2,
    cy: props.results.waferWidth / 2,
    r: Math.min(props.results.waferWidth, props.results.waferWidth) / 2,
    stroke: "black",
    strokeWidth: "1",
    fill: "none"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, props.results.dies.map(die => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DieItem, {
    ...die
  }))));
}
function PanelCanvas(props) {
  // Bail out if there are too many dies to draw, otherwise the browser will hang
  if (props.results.totalDies > 9999) {
    return "Too many dies to visualize";
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: props.results.waferWidth,
    height: props.results.waferHeight,
    style: {
      border: "1px solid black"
    }
  }, props.results.dies.map(die => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DieItem, {
    ...die
  })));
}

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscSizes: () => (/* reexport safe */ _sizes__WEBPACK_IMPORTED_MODULE_0__.DiscSizes),
/* harmony export */   PanelSizes: () => (/* reexport safe */ _sizes__WEBPACK_IMPORTED_MODULE_0__.PanelSizes),
/* harmony export */   YieldModels: () => (/* reexport safe */ _yieldModels__WEBPACK_IMPORTED_MODULE_1__.YieldModels)
/* harmony export */ });
/* harmony import */ var _sizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sizes */ "./src/config/sizes.ts");
/* harmony import */ var _yieldModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./yieldModels */ "./src/config/yieldModels.ts");



/***/ }),

/***/ "./src/config/sizes.ts":
/*!*****************************!*\
  !*** ./src/config/sizes.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscSizes: () => (/* binding */ DiscSizes),
/* harmony export */   PanelSizes: () => (/* binding */ PanelSizes)
/* harmony export */ });
const PanelSizes = {
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
const DiscSizes = {
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

/***/ }),

/***/ "./src/config/yieldModels.ts":
/*!***********************************!*\
  !*** ./src/config/yieldModels.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YieldModels: () => (/* binding */ YieldModels)
/* harmony export */ });
const YieldModels = {
  poisson: {
    name: "Poisson Model"
  },
  murphy: {
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

/***/ }),

/***/ "./src/hooks/useInputs.ts":
/*!********************************!*\
  !*** ./src/hooks/useInputs.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useInputs: () => (/* binding */ useInputs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_calculations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/calculations */ "./src/utils/calculations.ts");


/**
 * Given the numeric inputs, selected wafer properties, and a yield model, calculate
 * the expected fabrication results.
 * @param values numeric values provided by the user via inputs
 * @param yieldModel mathematical model for calculating yield
 * @param shape wafer shape
 * @param panelSize chosen size of panel wafer
 * @param discSize chosen size of disc wafer
 */
function useInputs(values, yieldModel, shape, panelSize, discSize) {
  const [results, setResults] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
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
    scribeVert
  } = values;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Bail out if we can't use any of the values
    const invalidValues = Object.values(values).filter(isNaN);
    if (invalidValues.length) {
      return;
    }
    if (shape === "Disc") {
      setResults((0,_utils_calculations__WEBPACK_IMPORTED_MODULE_1__.evaluateDiscInputs)(values, discSize, yieldModel));
    } else if (shape === "Panel") {
      setResults((0,_utils_calculations__WEBPACK_IMPORTED_MODULE_1__.evaluatePanelInputs)(values, panelSize, yieldModel));
    }
  }, [dieWidth, dieHeight, criticalArea, defectRate, edgeLoss, scribeHoriz, scribeVert, shape, panelSize, discSize, yieldModel]);
  return results;
}

/***/ }),

/***/ "./src/utils/calculations.ts":
/*!***********************************!*\
  !*** ./src/utils/calculations.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateDiscInputs: () => (/* binding */ evaluateDiscInputs),
/* harmony export */   evaluatePanelInputs: () => (/* binding */ evaluatePanelInputs),
/* harmony export */   getFabYield: () => (/* binding */ getFabYield),
/* harmony export */   isInsideCircle: () => (/* binding */ isInsideCircle),
/* harmony export */   rectanglesInCircle: () => (/* binding */ rectanglesInCircle)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config/index.ts");

/**
 * Determine whether a target position (x, y) is inside or outside a circle
 * drawn from a center point (centerX, centerY) and extends outward to a given
 * size (radius)
 * @param x horizontal position of the target
 * @param y vertical position of the target
 * @param centerX horizontal center of the circle
 * @param centerY vertical center of the circle
 * @param radius size of the circle
 */
function isInsideCircle(x, y, centerX, centerY, radius) {
  return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}
/**
 * Given a circle with the provided diameter, determine the maximum number of
 * rectangles of a given width and height would fit fully inside it, without
 * overlapping the edges
 * @param diameter size of the circle
 * @param rectWidth width of each rectangle
 * @param rectHeight height of each rectangle
 */
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
/**
 * Determine the yield based on the provided model
 * @param defectRate decimal representing how many dies will be defective
 * @param criticalArea die area
 * @param model model to calculate the yield
 */
function getFabYield(defectRate, criticalArea, model) {
  if (!defectRate) {
    return 1;
  }
  const defects = criticalArea * defectRate / 100;
  switch (model) {
    case "poisson":
      return Math.exp(-defects);
    case "murphy":
      return Math.pow((1 - Math.exp(-defects)) / defects, 2);
    case "rect":
      return (1 - Math.exp(-2 * defects)) / (2 * defects);
    //case ('moore'):
    //  return Math.exp(Math.sqrt(-defects));
    case "seeds":
      return 1 / (1 + defects);
    default:
      return 0;
  }
}
function evaluatePanelInputs(inputVals, selectedSize, selectedModel) {
  const {
    dieWidth,
    dieHeight,
    criticalArea,
    defectRate,
    scribeHoriz,
    scribeVert
  } = inputVals;
  let dies = [];
  const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
  const {
    waferWidth,
    waferHeight
  } = _config__WEBPACK_IMPORTED_MODULE_0__.PanelSizes[selectedSize];
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
    dies[i] = {
      key: i,
      dieState,
      x,
      y,
      width: dieWidth,
      height: dieHeight
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
function evaluateDiscInputs(inputVals, selectedSize, selectedModel) {
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
  } = _config__WEBPACK_IMPORTED_MODULE_0__.DiscSizes[selectedSize];
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
      key: i,
      dieState,
      x,
      y,
      width: dieWidth,
      height: dieHeight
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
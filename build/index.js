/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function Edit() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {})
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

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






const ShapeSelector = props => {
  const shapes = ["Disc", "Panel"];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("fieldset", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("legend", null, "Shape"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "radio-group"
  }, shapes.map(shape => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "radio-item",
    key: shape
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "radio",
    name: "shape",
    checked: props.shape === shape,
    onChange: e => props.setShape(shape)
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, shape)))));
};
const DiscSizeSelect = props => {
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "select"
  }, "Diameter", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: props.selectedSize,
    onChange: props.handleSizeChange
  }, Object.entries(_config__WEBPACK_IMPORTED_MODULE_4__.discSizes).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: key,
    value: key
  }, value.name))));
};
const PanelSizeSelect = props => {
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "select"
  }, "Dimensions", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: props.selectedSize,
    onChange: props.handleSizeChange
  }, Object.entries(_config__WEBPACK_IMPORTED_MODULE_4__.panelSizes).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: key,
    value: key
  }, value.name))));
};
const ModelSelector = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
  className: "select"
}, "Yield Calculation Model", react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
  value: props.selectedModel,
  onChange: props.handleModelChange
}, Object.entries(_config__WEBPACK_IMPORTED_MODULE_4__.yieldModels).map(([key, value]) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
  key: key,
  value: key
}, value.name))));
const ResultStats = props => react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
  className: "calculations"
}, props.results.waferHeight ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Panel Width: ", props.results.waferWidth, "mm"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Panel Height: ", props.results.waferHeight, "mm")) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Wafer Diameter: ", props.results.waferWidth, "mm"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Total Dies: ", props.results.totalDies), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Good Dies: ", props.results.goodDies), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Fab Yield: ", props.results.fabYield.toFixed(6)));
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
  const [transVert, setTransVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0");
  const [waferShape, setWaferShape] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Disc");
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
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "columns"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input panel"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Die size"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row--two-col"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Width (mm)",
    value: dieWidth,
    onChange: event => {
      handleDimensionChange("dieWidth")(event.target.value);
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Height (mm)",
    value: dieHeight,
    onChange: event => {
      handleDimensionChange("dieHeight")(event.target.value);
    },
    isDisabled: maintainAspectRatio
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
    label: "Maintain Aspect Ratio",
    onChange: handleMaintainAspectRatio,
    checked: maintainAspectRatio
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
    label: "Reticle Limit (26mm x 33mm)",
    onChange: handleReticleLimitChange,
    checked: reticleLimit
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row--two-col"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Scribe Lines Horiz",
    value: scribeHoriz,
    onChange: event => {
      handleScribeSizeChange("horiz")(event.target.value);
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Scribe Lines Vert",
    value: scribeVert,
    onChange: event => {
      handleScribeSizeChange("vert")(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
    label: "All Critical",
    onChange: handleAllCriticalChange,
    checked: allCritical
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Critical Area (mm\u00B2)",
    value: criticalArea,
    isDisabled: allCritical,
    onChange: event => {
      handleCriticalAreaChange(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Wafer"), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ShapeSelector, {
    shape: waferShape,
    setShape: setWaferShape
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, waferShape === "Panel" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PanelSizeSelect, {
    selectedSize: panelSize,
    handleSizeChange: handleSizeChange
  }), waferShape === "Disc" && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DiscSizeSelect, {
    selectedSize: discSize,
    handleSizeChange: handleSizeChange
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Defect Rate (#/cm\u00B2)",
    value: defectRate,
    onChange: event => {
      handleDefectRateChange(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Edge Loss (mm)",
    value: edgeLoss,
    onChange: event => {
      handleEdgeLossChange(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row--two-col"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Translation Horizontal (mm)",
    value: transHoriz,
    onChange: event => {
      handleTransChange("horiz")(event.target.value);
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Translation Vertical (mm)",
    value: transVert,
    onChange: event => {
      handleTransChange("vert")(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "input-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ModelSelector, {
    selectedModel: selectedModel,
    handleModelChange: handleModelChange
  }))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "output"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WaferCanvas_WaferCanvas__WEBPACK_IMPORTED_MODULE_5__.WaferCanvas, {
    results: results,
    shape: waferShape
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "panel"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResultStats, {
    results: results
  }))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://semianalysis.com",
    target: "_blank",
    className: "logo"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    alt: "SemiAnalysis logo",
    src: "https://semianalysis-production.mystagingwebsite.com/wp-content/uploads/2024/07/logo-300x124.png"
  })))));
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
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "checkbox"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    onChange: props.onChange,
    checked: props.checked
  }), props.label));
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
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: props.isDisabled ? 'disabled' : ''
  }, props.label, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
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
/* harmony export */   WaferCanvas: () => (/* binding */ WaferCanvas)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_parallax_tilt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-parallax-tilt */ "./node_modules/react-parallax-tilt/dist/modern/index.js");


// How many pixels should be rendered for every mm of wafer size
const mmToPxScale = 3;
// Don't try and draw too many dies, or performance will suffer too much and the
// page may hang or crash
const maxDies = 100000;
function DieMapCanvas(props) {
  // Don't try and draw too many dies, or performance will suffer too much and the
  // page may hang or crash
  const maxDies = 100000;
  // Draw good and bad dies on separate canvases for parallax effect
  const goodCanvasEl = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const badCanvasEl = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const dieStateColors = {
    good: "rgba(6,231,6,0.77)",
    defective: "rgba(151,138,129,0.8)",
    partial: "yellow",
    lost: "red"
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!goodCanvasEl.current || !badCanvasEl.current || !props.results.dies.length || props.results.dies.length > maxDies) {
      return;
    }
    const goodContext = goodCanvasEl.current.getContext("2d");
    const badContext = badCanvasEl.current.getContext("2d");
    if (!goodContext || !badContext) {
      return;
    }
    // Clear the canvases before drawing new die map
    goodContext.clearRect(0, 0, goodCanvasEl.current.width, goodCanvasEl.current.height);
    badContext.clearRect(0, 0, badCanvasEl.current.width, badCanvasEl.current.height);
    // Draw each die onto the canvas
    props.results.dies.forEach(die => {
      if (die.dieState === 'good') {
        goodContext.fillStyle = dieStateColors.good;
        goodContext.fillRect(mmToPxScale * die.x, mmToPxScale * die.y, mmToPxScale * die.width, mmToPxScale * die.height);
      } else {
        badContext.fillStyle = dieStateColors[die.dieState];
        badContext.fillRect(mmToPxScale * die.x, mmToPxScale * die.y, mmToPxScale * die.width, mmToPxScale * die.height);
      }
    });
  }, [JSON.stringify(props.results)]);
  if (props.results.dies.length > maxDies) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "too-many-dies",
      style: {
        paddingBottom: `${props.results.waferWidth / props.results.waferHeight * 100}%`
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Too many dies to visualize"));
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    className: "die-map--good",
    ref: goodCanvasEl,
    width: props.results.waferWidth * mmToPxScale,
    height: props.results.waferHeight * mmToPxScale
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    className: "die-map--bad",
    ref: badCanvasEl,
    width: props.results.waferWidth * mmToPxScale,
    height: props.results.waferHeight * mmToPxScale
  }));
}
function DieDecorativeCanvas(props) {
  const canvasEl = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!canvasEl.current || !props.results.dies.length || props.results.dies.length > maxDies) {
      return;
    }
    const context = canvasEl.current.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    // Background color
    context.fillStyle = "rgba(217,217,210,0.76)";
    // Draw a background rectangle for a panel, or a background circle for a disc
    if (props.shape === 'Panel') {
      context.fillRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    } else {
      context.arc(canvasEl.current.width / 2, canvasEl.current.width / 2, canvasEl.current.width / 2, 0, 2 * Math.PI, false);
      context.fill();
    }
    // Cut out each die from the background color the canvas
    props.results.dies.forEach(die => {
      context.clearRect(mmToPxScale * die.x, mmToPxScale * die.y, mmToPxScale * die.width, mmToPxScale * die.height);
    });
  }, [JSON.stringify(props.results)]);
  if (props.results.dies.length > maxDies) {
    return null;
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    className: "die-decorative",
    ref: canvasEl,
    width: props.results.waferWidth * mmToPxScale,
    height: props.results.waferHeight * mmToPxScale
  });
}
/**
 * Draw a die map onto either a circular or rectangular background, depending on
 * the shape of the wafer. Dies are drawn using <canvas> and colored according
 * to their state (good, defective, etc.)
 */
function WaferCanvas(props) {
  const [tiltX, setTiltX] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [tiltY, setTiltY] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  function onMove({
    tiltAngleXPercentage,
    tiltAngleYPercentage
  }) {
    setTiltX(tiltAngleXPercentage);
    setTiltY(tiltAngleYPercentage);
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_parallax_tilt__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: props.shape,
    glareEnable: true,
    glareMaxOpacity: 0.8,
    scale: 1.05,
    onMove: onMove,
    className: `wafer-canvas ${props.shape === 'Disc' ? 'disc' : ''}`,
    glareBorderRadius: props.shape === 'Disc' ? "100%" : "0"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DieMapCanvas, {
    results: props.results
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DieDecorativeCanvas, {
    results: props.results,
    shape: props.shape
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mirror-background",
    style: {
      backgroundPositionX: `${tiltY / 2 + tiltX / 4}% `
    }
  }));
}

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   discSizes: () => (/* reexport safe */ _sizes__WEBPACK_IMPORTED_MODULE_0__.discSizes),
/* harmony export */   panelSizes: () => (/* reexport safe */ _sizes__WEBPACK_IMPORTED_MODULE_0__.panelSizes),
/* harmony export */   yieldModels: () => (/* reexport safe */ _yieldModels__WEBPACK_IMPORTED_MODULE_1__.yieldModels)
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
/* harmony export */   discSizes: () => (/* binding */ discSizes),
/* harmony export */   panelSizes: () => (/* binding */ panelSizes)
/* harmony export */ });
/**
 * Available sizes for rectangular wafers
 */
const panelSizes = {
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
    waferWidth: 457,
    waferHeight: 600
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
/**
 * Available sizes for round wafers
 */
const discSizes = {
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
/* harmony export */   yieldModels: () => (/* binding */ yieldModels)
/* harmony export */ });
/**
 * Available mathematical models for calculating yield
 */
const yieldModels = {
  poisson: {
    name: "Poisson Model",
    yield: defects => Math.exp(-defects)
  },
  murphy: {
    name: "Murphy's Model",
    yield: defects => Math.pow((1 - Math.exp(-defects)) / defects, 2)
  },
  rect: {
    name: "Rectangular Model",
    yield: defects => (1 - Math.exp(-2 * defects)) / (2 * defects)
  },
  //moore: {name: "Moore's Model"},
  seeds: {
    name: "Seeds Model",
    yield: defects => 1 / (1 + defects)
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
  return _config__WEBPACK_IMPORTED_MODULE_0__.yieldModels[model].yield(defects);
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
  } = _config__WEBPACK_IMPORTED_MODULE_0__.panelSizes[selectedSize];
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
  } = _config__WEBPACK_IMPORTED_MODULE_0__.discSizes[selectedSize];
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
    waferWidth,
    waferHeight: waferWidth
  };
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/react-parallax-tilt/dist/modern/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-parallax-tilt/dist/modern/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
function i(t,e,i,n){return new(i||(i=Promise))((function(s,r){function l(t){try{o(n.next(t))}catch(t){r(t)}}function a(t){try{o(n.throw(t))}catch(t){r(t)}}function o(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(l,a)}o((n=n.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const n=(t,e,i,n)=>{t.style.transition=`${e} ${i}ms ${n}`},s=(t,e,i)=>Math.min(Math.max(t,e),i);class r{constructor(t,e){this.glareAngle=0,this.glareOpacity=0,this.calculateGlareSize=t=>{const{width:e,height:i}=t,n=Math.sqrt(Math.pow(e,2)+Math.pow(i,2));return{width:n,height:n}},this.setSize=t=>{const e=this.calculateGlareSize(t);this.glareEl.style.width=`${e.width}px`,this.glareEl.style.height=`${e.height}px`},this.update=(t,e,i,n)=>{this.updateAngle(t,e.glareReverse),this.updateOpacity(t,e,i,n)},this.updateAngle=(t,e)=>{const{xPercentage:i,yPercentage:n}=t,s=180/Math.PI,r=i?Math.atan2(n,-i)*s:0;this.glareAngle=r-(e?180:0)},this.updateOpacity=(t,e,i,n)=>{const{xPercentage:r,yPercentage:l}=t,{glarePosition:a,glareReverse:o,glareMaxOpacity:h}=e,p=i?-1:1,c=n?-1:1,g=o?-1:1;let d=0;switch(a){case"top":d=-r*p*g;break;case"right":d=l*c*g;break;case"bottom":case void 0:d=r*p*g;break;case"left":d=-l*c*g;break;case"all":d=Math.hypot(r,l)}const u=s(d,0,100);this.glareOpacity=u*h/100},this.render=t=>{const{glareColor:e}=t;this.glareEl.style.transform=`rotate(${this.glareAngle}deg) translate(-50%, -50%)`,this.glareEl.style.opacity=this.glareOpacity.toString(),this.glareEl.style.background=`linear-gradient(0deg, rgba(255,255,255,0) 0%, ${e} 100%)`},this.glareWrapperEl=document.createElement("div"),this.glareEl=document.createElement("div"),this.glareWrapperEl.appendChild(this.glareEl),this.glareWrapperEl.className="glare-wrapper",this.glareEl.className="glare";const i={position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",borderRadius:e,WebkitMaskImage:"-webkit-radial-gradient(white, black)",pointerEvents:"none"},n=this.calculateGlareSize(t),r={position:"absolute",top:"50%",left:"50%",transformOrigin:"0% 0%",pointerEvents:"none",width:`${n.width}px`,height:`${n.height}px`};Object.assign(this.glareWrapperEl.style,i),Object.assign(this.glareEl.style,r)}}class l{constructor(){this.glareAngle=0,this.glareOpacity=0,this.tiltAngleX=0,this.tiltAngleY=0,this.tiltAngleXPercentage=0,this.tiltAngleYPercentage=0,this.update=(t,e)=>{this.updateTilt(t,e),this.updateTiltManualInput(t,e),this.updateTiltReverse(e),this.updateTiltLimits(e)},this.updateTilt=(t,e)=>{const{xPercentage:i,yPercentage:n}=t,{tiltMaxAngleX:s,tiltMaxAngleY:r}=e;this.tiltAngleX=i*s/100,this.tiltAngleY=n*r/100*-1},this.updateTiltManualInput=(t,e)=>{const{tiltAngleXManual:i,tiltAngleYManual:n,tiltMaxAngleX:s,tiltMaxAngleY:r}=e;(null!==i||null!==n)&&(this.tiltAngleX=null!==i?i:0,this.tiltAngleY=null!==n?n:0,t.xPercentage=100*this.tiltAngleX/s,t.yPercentage=100*this.tiltAngleY/r)},this.updateTiltReverse=t=>{const e=t.tiltReverse?-1:1;this.tiltAngleX=e*this.tiltAngleX,this.tiltAngleY=e*this.tiltAngleY},this.updateTiltLimits=t=>{const{tiltAxis:e}=t;this.tiltAngleX=s(this.tiltAngleX,-90,90),this.tiltAngleY=s(this.tiltAngleY,-90,90);e&&(this.tiltAngleX="x"===e?this.tiltAngleX:0,this.tiltAngleY="y"===e?this.tiltAngleY:0)},this.updateTiltAnglesPercentage=t=>{const{tiltMaxAngleX:e,tiltMaxAngleY:i}=t;this.tiltAngleXPercentage=this.tiltAngleX/e*100,this.tiltAngleYPercentage=this.tiltAngleY/i*100},this.render=t=>{t.style.transform+=`rotateX(${this.tiltAngleX}deg) rotateY(${this.tiltAngleY}deg) `}}}const a=Object.assign(Object.assign({scale:1,perspective:1e3,flipVertically:!1,flipHorizontally:!1,reset:!0,transitionEasing:"cubic-bezier(.03,.98,.52,.99)",transitionSpeed:400,trackOnWindow:!1,gyroscope:!1},{tiltEnable:!0,tiltReverse:!1,tiltAngleXInitial:0,tiltAngleYInitial:0,tiltMaxAngleX:20,tiltMaxAngleY:20,tiltAxis:void 0,tiltAngleXManual:null,tiltAngleYManual:null}),{glareEnable:!1,glareMaxOpacity:.7,glareColor:"#ffffff",glarePosition:"bottom",glareReverse:!1,glareBorderRadius:"0"});class o extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent{constructor(){super(...arguments),this.wrapperEl={node:null,size:{width:0,height:0,left:0,top:0},clientPosition:{x:null,y:null,xPercentage:0,yPercentage:0},updateAnimationId:null,scale:1},this.tilt=null,this.glare=null,this.addDeviceOrientationEventListener=()=>i(this,void 0,void 0,(function*(){if(!window.DeviceOrientationEvent)return;const t=DeviceOrientationEvent.requestPermission;if("function"==typeof t){"granted"===(yield t())&&window.addEventListener("deviceorientation",this.onMove)}else window.addEventListener("deviceorientation",this.onMove)})),this.setSize=()=>{this.setWrapperElSize(),this.glare&&this.glare.setSize(this.wrapperEl.size)},this.mainLoop=t=>{null!==this.wrapperEl.updateAnimationId&&cancelAnimationFrame(this.wrapperEl.updateAnimationId),this.processInput(t),this.update(t.type),this.wrapperEl.updateAnimationId=requestAnimationFrame(this.renderFrame)},this.onEnter=t=>{const{onEnter:e}=this.props;this.setSize(),this.wrapperEl.node.style.willChange="transform",this.setTransitions(),e&&e(t.type)},this.onMove=t=>{this.mainLoop(t),this.emitOnMove(t)},this.onLeave=t=>{const{onLeave:e}=this.props;if(this.setTransitions(),e&&e(t.type),this.props.reset){const t=new CustomEvent("autoreset");this.onMove(t)}},this.processInput=t=>{const{scale:e}=this.props;switch(t.type){case"mousemove":this.wrapperEl.clientPosition.x=t.pageX,this.wrapperEl.clientPosition.y=t.pageY,this.wrapperEl.scale=e;break;case"touchmove":this.wrapperEl.clientPosition.x=t.touches[0].pageX,this.wrapperEl.clientPosition.y=t.touches[0].pageY,this.wrapperEl.scale=e;break;case"deviceorientation":this.processInputDeviceOrientation(t),this.wrapperEl.scale=e;break;case"autoreset":const{tiltAngleXInitial:i,tiltAngleYInitial:n,tiltMaxAngleX:r,tiltMaxAngleY:l}=this.props,a=n/l*100;this.wrapperEl.clientPosition.xPercentage=s(i/r*100,-100,100),this.wrapperEl.clientPosition.yPercentage=s(a,-100,100),this.wrapperEl.scale=1}},this.processInputDeviceOrientation=t=>{if(!t.gamma||!t.beta||!this.props.gyroscope)return;const{tiltMaxAngleX:e,tiltMaxAngleY:i}=this.props,n=t.gamma;this.wrapperEl.clientPosition.xPercentage=t.beta/e*100,this.wrapperEl.clientPosition.yPercentage=n/i*100,this.wrapperEl.clientPosition.xPercentage=s(this.wrapperEl.clientPosition.xPercentage,-100,100),this.wrapperEl.clientPosition.yPercentage=s(this.wrapperEl.clientPosition.yPercentage,-100,100)},this.update=t=>{const{tiltEnable:e,flipVertically:i,flipHorizontally:n}=this.props;"autoreset"!==t&&"deviceorientation"!==t&&"propChange"!==t&&this.updateClientInput(),e&&this.tilt.update(this.wrapperEl.clientPosition,this.props),this.updateFlip(),this.tilt.updateTiltAnglesPercentage(this.props),this.glare&&this.glare.update(this.wrapperEl.clientPosition,this.props,i,n)},this.updateClientInput=()=>{const{trackOnWindow:t}=this.props;let e,i;if(t){const{x:t,y:n}=this.wrapperEl.clientPosition;e=n/window.innerHeight*200-100,i=t/window.innerWidth*200-100}else{const{size:{width:t,height:n,left:s,top:r},clientPosition:{x:l,y:a}}=this.wrapperEl;e=(a-r)/n*200-100,i=(l-s)/t*200-100}this.wrapperEl.clientPosition.xPercentage=s(e,-100,100),this.wrapperEl.clientPosition.yPercentage=s(i,-100,100)},this.updateFlip=()=>{const{flipVertically:t,flipHorizontally:e}=this.props;t&&(this.tilt.tiltAngleX+=180,this.tilt.tiltAngleY*=-1),e&&(this.tilt.tiltAngleY+=180)},this.renderFrame=()=>{this.resetWrapperElTransform(),this.renderPerspective(),this.tilt.render(this.wrapperEl.node),this.renderScale(),this.glare&&this.glare.render(this.props)}}componentDidMount(){if(this.tilt=new l,this.initGlare(),this.addEventListeners(),"undefined"==typeof CustomEvent)return;const t=new CustomEvent("autoreset");this.mainLoop(t);const e=new CustomEvent("initial");this.emitOnMove(e)}componentWillUnmount(){null!==this.wrapperEl.updateAnimationId&&cancelAnimationFrame(this.wrapperEl.updateAnimationId),this.removeEventListeners()}componentDidUpdate(){const t=new CustomEvent("propChange");this.mainLoop(t),this.emitOnMove(t)}addEventListeners(){const{trackOnWindow:t,gyroscope:e}=this.props;window.addEventListener("resize",this.setSize),t&&(window.addEventListener("mouseenter",this.onEnter),window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseout",this.onLeave),window.addEventListener("touchstart",this.onEnter),window.addEventListener("touchmove",this.onMove),window.addEventListener("touchend",this.onLeave)),e&&this.addDeviceOrientationEventListener()}removeEventListeners(){const{trackOnWindow:t,gyroscope:e}=this.props;window.removeEventListener("resize",this.setSize),t&&(window.removeEventListener("mouseenter",this.onEnter),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseout",this.onLeave),window.removeEventListener("touchstart",this.onEnter),window.removeEventListener("touchmove",this.onMove),window.removeEventListener("touchend",this.onLeave)),e&&window.DeviceOrientationEvent&&window.removeEventListener("deviceorientation",this.onMove)}setWrapperElSize(){const t=this.wrapperEl.node.getBoundingClientRect();this.wrapperEl.size.width=this.wrapperEl.node.offsetWidth,this.wrapperEl.size.height=this.wrapperEl.node.offsetHeight,this.wrapperEl.size.left=t.left+window.scrollX,this.wrapperEl.size.top=t.top+window.scrollY}initGlare(){const{glareEnable:t,glareBorderRadius:e}=this.props;t&&(this.glare=new r(this.wrapperEl.size,e),this.wrapperEl.node.appendChild(this.glare.glareWrapperEl))}emitOnMove(t){const{onMove:e}=this.props;if(!e)return;let i=0,n=0;this.glare&&(i=this.glare.glareAngle,n=this.glare.glareOpacity),e({tiltAngleX:this.tilt.tiltAngleX,tiltAngleY:this.tilt.tiltAngleY,tiltAngleXPercentage:this.tilt.tiltAngleXPercentage,tiltAngleYPercentage:this.tilt.tiltAngleYPercentage,glareAngle:i,glareOpacity:n,eventType:t.type})}resetWrapperElTransform(){this.wrapperEl.node.style.transform=""}renderPerspective(){const{perspective:t}=this.props;this.wrapperEl.node.style.transform+=`perspective(${t}px) `}renderScale(){const{scale:t}=this.wrapperEl;this.wrapperEl.node.style.transform+=`scale3d(${t},${t},${t})`}setTransitions(){const{transitionSpeed:t,transitionEasing:e}=this.props;n(this.wrapperEl.node,"all",t,e),this.glare&&n(this.glare.glareEl,"opacity",t,e)}render(){const{children:e,className:i,style:n}=this.props;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{ref:t=>this.wrapperEl.node=t,onMouseEnter:this.onEnter,onMouseMove:this.onMove,onMouseLeave:this.onLeave,onTouchStart:this.onEnter,onTouchMove:this.onMove,onTouchEnd:this.onLeave,className:i,style:n},e)}}o.defaultProps=a;


/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/die-yield-calculator","version":"0.1.0","title":"SemiAnalysis Die Yield Calculator","category":"widgets","icon":"smiley","description":"Embeds a React application for calculating expected semiconductor yield from a die.","example":{},"supports":{"html":false},"textdomain":"die-yield-calculator","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdie_yield_calculator_wp"] = self["webpackChunkdie_yield_calculator_wp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
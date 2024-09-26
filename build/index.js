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
  const [transVert, setTransVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("0.1");
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
    className: "input-row--two-col"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Translation Horiz",
    value: transHoriz,
    onChange: event => {
      handleTransChange("horiz")(event.target.value);
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NumberInput_NumberInput__WEBPACK_IMPORTED_MODULE_2__.NumberInput, {
    label: "Translation Vert",
    value: transVert,
    onChange: event => {
      handleTransChange("vert")(event.target.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ModelSelector, {
    selectedModel: selectedModel,
    handleModelChange: handleModelChange
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
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
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, props.label, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
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

const mmToPxScale = 4;
function DieMapCanvas(props) {
  // Don't try and draw too many dies, or performance will suffer too much and the
  // page may hang or crash
  const maxDies = 100000;
  const canvasEl = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const dieStateColors = {
    good: "rgba(6,231,6,0.77)",
    defective: "rgba(151,138,129,0.8)",
    partial: "yellow",
    lost: "red"
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!canvasEl.current || !props.results.dies.length || props.results.dies.length > maxDies) {
      return;
    }
    const context = canvasEl.current.getContext("2d");
    if (!context) {
      return;
    }
    // Clear the canvas before drawing new die map
    context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    // Draw each die onto the canvas
    props.results.dies.forEach(die => {
      context.fillStyle = dieStateColors[die.dieState];
      context.fillRect(mmToPxScale * die.x, mmToPxScale * die.y, mmToPxScale * die.width, mmToPxScale * die.height);
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
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
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
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `wafer-canvas ${props.shape === 'Disc' ? 'disc' : ''}`
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DieMapCanvas, {
    results: props.results
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
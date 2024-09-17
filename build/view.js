/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


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
  good: 'green',
  defective: 'grey',
  partial: 'yellow',
  lost: 'red'
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
const NumberInput = ({
  label,
  value,
  onChange,
  onBlur,
  isDisabled
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
  className: "input-group",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
    children: [label, ":", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
      type: "number",
      disabled: isDisabled,
      value: value,
      onChange: e => onChange(e.target.value),
      onBlur: onBlur,
      step: "0.01"
    })]
  })
});
const Checkbox = ({
  label,
  onChange,
  checked
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
  className: "checkbox",
  children: [label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
    type: "checkbox",
    onChange: onChange,
    checked: checked
  })]
});
const ShapeSelector = ({
  shape,
  setShape
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
  className: "input-group",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
    children: ["Shape:", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("select", {
      value: shape,
      onChange: e => setShape(e.target.value),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
        value: "Panel",
        children: "Panel"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
        value: "Wafer",
        children: "Wafer"
      })]
    })]
  })
});
const ShapeSizeSelector = ({
  selectedShape,
  selectedSize,
  handleSizeChange
}) => {
  const sizes = selectedShape === 'Panel' ? PANELSIZES : selectedShape === 'Wafer' ? WAFERSIZES : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: sizes && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("select", {
        value: selectedSize,
        onChange: handleSizeChange,
        children: Object.keys(sizes).map(key => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
          value: key,
          children: sizes[key].name
        }, key))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        children: ["Width: ", sizes[selectedSize].waferWidth, " mm, Height: ", sizes[selectedSize].waferHeight, " mm"]
      })]
    })
  });
};
const ModelSelector = ({
  selectedModel,
  handleModelChange
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("select", {
    value: selectedModel,
    onChange: handleModelChange,
    children: Object.keys(YIELDMODELS).map(key => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
      value: key,
      children: YIELDMODELS[key].name
    }, key))
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    children: ["Model: ", YIELDMODELS[selectedModel].name]
  })]
});
const Calculations = ({
  calcState
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
  className: "calculations",
  children: ["totalDies: ", calcState.totalDies, ", Good Wafers: ", calcState.goodDies, ", Fab Yield: ", calcState.fabYield]
});
function isInsideCircle(x, y, centerX, centerY, radius) {
  return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}
function rectanglesInCircle(diameter, rectWidth, rectHeight) {
  const radius = diameter / 2;
  const centerX = radius;
  const centerY = radius;
  let count = 0;
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
        count++;
      }
    }
  }
  return [count, positions];
}
function getFabYield(defectRate, criticalArea, model) {
  const defects = criticalArea * defectRate / 100;
  switch (model) {
    case 'poisson':
      return Math.exp(-defects);
    case 'murph':
      return Math.pow((1 - Math.exp(-defects)) / defects, 2);
    case 'rect':
      return (1 - Math.exp(-2 * defects)) / (2 * defects);
    //case ('moore'):
    //  return Math.exp(Math.sqrt(-defects));
    case 'seeds':
      return 1 / (1 + defects);
    default:
      console.log('Invalid Model.');
      return;
  }
}
const evaluateInputs = (dieWidth, dieHeight, criticalArea, defectRate, edgeLoss, scribeHoriz, scribeVert, shape, selectedSize, selectedModel) => {
  let totalDies = 0;
  let fabYield = getFabYield(defectRate, criticalArea, selectedModel);
  let goodDies = 0;
  let waferWidth = null;
  let waferHeight = null;
  let dies = [];
  if (shape === 'Panel') {
    waferWidth = PANELSIZES[selectedSize].waferWidth;
    waferHeight = PANELSIZES[selectedSize].waferHeight;
    const adjustedDieWidth = dieWidth + scribeHoriz * 2;
    const adjustedDieHeight = dieHeight + scribeVert * 2;
    const diesPerRow = Math.floor(waferWidth / adjustedDieWidth);
    const diesPerColumn = Math.floor(waferHeight / adjustedDieHeight);
    const centerHorz = (waferWidth - adjustedDieWidth * diesPerRow) / 2;
    const centerVert = (waferHeight - adjustedDieHeight * diesPerColumn) / 2;
    const countWidth = Math.floor(waferWidth / (dieWidth + scribeHoriz * 2));
    const countHeight = Math.floor(waferHeight / (dieHeight + scribeVert * 2));
    totalDies = countWidth * countHeight;
    goodDies = Math.floor(fabYield * totalDies);
    let dieStates = new Array(totalDies).fill('defective');
    for (let i = 0; i < goodDies; i++) {
      dieStates[i] = 'good';
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
        'key': i,
        'dieState': dieState,
        'x': x,
        'y': y,
        'width': width,
        'height': height
      };
    }
  } else if (shape === 'Wafer') {
    waferWidth = WAFERSIZES[selectedSize].waferWidth;
    let positions;
    [totalDies, positions] = rectanglesInCircle(waferWidth, dieWidth + scribeHoriz * 2, dieHeight + scribeVert * 2);
    goodDies = Math.floor(fabYield * totalDies);
    let dieStates = new Array(totalDies).fill('defective');
    for (let i = 0; i < goodDies; i++) {
      dieStates[i] = 'good';
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
        dieStates[i] = 'partial';
      }
      dies[i] = {
        'key': i,
        'dieState': dieState,
        'x': x,
        'y': y,
        'width': width,
        'height': height
      };
    }
  }
  return {
    'dies': dies,
    'totalDies': totalDies,
    'goodDies': goodDies,
    'fabYield': fabYield,
    'waferWidth': waferWidth,
    'waferHeight': waferHeight
  };
};
const Wafer = ({
  calcState,
  panelSize,
  dieHeight,
  dieWidth,
  scribeHoriz,
  scribeVert
}) => {
  const dies = calcState.dies;
  const drawnDies = [];
  for (let i = 0; i < dies.length; i++) {
    drawnDies.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Die, {
      color: STATECOLORS[dies[i].dieState],
      x: dies[i].x,
      y: dies[i].y,
      width: dies[i].width,
      height: dies[i].height
    }, dies[i].key));
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    width: calcState.waferWidth,
    height: calcState.waferWidth,
    style: {
      border: '1px solid black'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("circle", {
      cx: calcState.waferWidth / 2,
      cy: calcState.waferWidth / 2,
      r: Math.min(calcState.waferWidth, calcState.waferWidth) / 2,
      stroke: "black",
      strokeWidth: "1",
      fill: "none"
    }), drawnDies]
  });
};
const Panel = ({
  calcState
}) => {
  const dies = calcState.dies;
  const drawnDies = [];
  console.log(dies);
  for (let i = 0; i < dies.length; i++) {
    drawnDies.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Die, {
      color: STATECOLORS[dies[i].color],
      x: dies[i].x,
      y: dies[i].y,
      width: dies[i].width,
      height: dies[i].height
    }, dies[i].key));
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    width: calcState.waferWidth,
    height: calcState.waferHeight,
    style: {
      border: '1px solid black'
    },
    children: drawnDies
  });
};
const Die = ({
  color,
  x,
  y,
  width,
  height
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
  x: x,
  y: y,
  width: width,
  height: height,
  fill: color
});
function App() {
  const [calcState, setCalcState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    'dies': [],
    'totalDies': 0,
    'goodDies': 0,
    'fabYield': 0,
    'waferWidth:': 0,
    'waferHeight': 0
  });
  const [dieWidth, setDieWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(8);
  const [dieHeight, setDieHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(8);
  const [aspectRatio, setAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dieWidth / dieHeight);
  const [maintainAspectRatio, setMaintainAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [criticalArea, setCriticalArea] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(64);
  const [defectRate, setDefectRate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.1);
  const [edgeLoss, setEdgeLoss] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [allCritical, setAllCritical] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [recticleLimit, setRecticleLimit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [scribeHoriz, setScribeHoriz] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.1);
  const [scribeVert, setScribeVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.1);
  const [transHoriz, setTransHoriz] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [transVert, setTransVert] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.1);
  const [shape, setShape] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('Panel');
  const [selectedSize, setSelectedSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Object.keys(PANELSIZES)[0]);
  const [selectedModel, setSelectedModel] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Object.keys(YIELDMODELS)[1]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (maintainAspectRatio) {
      setAspectRatio(dieWidth / dieHeight);
    }
  }, [dieWidth, dieHeight, maintainAspectRatio]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setCalcState(evaluateInputs(dieWidth, dieHeight, criticalArea, defectRate, edgeLoss, scribeHoriz, scribeVert, shape, selectedSize, selectedModel));
  }, [dieWidth, dieHeight, criticalArea, defectRate, edgeLoss, scribeHoriz, scribeVert, shape, selectedSize, selectedModel]);
  const nullOrRound = (setter, value) => {
    if (value === '') {
      setter(value);
    } else {
      const roundedValue = Math.round(value * 100) / 100;
      setter(roundedValue);
    }
  };
  const handleBlur = setter => () => {
    setter(prevValue => prevValue === '' ? 0 : prevValue);
  };
  const handleDimensionChange = dimension => value => {
    if (!recticleLimit || dimension === 'dieWidth' && value <= 33 || dimension === 'dieHeight' && value <= 26) {
      if (maintainAspectRatio) {
        if (dimension === 'dieWidth') {
          nullOrRound(setDieWidth, value);
          nullOrRound(setDieHeight, value / aspectRatio);
        } else if (dimension === 'dieHeight') {
          nullOrRound(setDieHeight, value);
          nullOrRound(setDieWidth, value * aspectRatio);
        }
      } else {
        dimension === 'dieWidth' ? setDieWidth(value) : setDieHeight(value);
      }
    }
  };
  const handleScribeSizeChange = dimension => value => {
    if (dimension === 'horiz') {
      nullOrRound(setScribeHoriz, value);
    } else if (dimension === 'vert') {
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
    if (dimension === 'horiz') {
      nullOrRound(setTransHoriz, value);
    } else if (dimension === 'vert') {
      nullOrRound(setTransVert, value);
    }
  };
  const handleMaintainAspectRatio = event => {
    setMaintainAspectRatio(event.target.checked);
  };
  const handleAllCriticalChange = event => {
    setCriticalArea(dieWidth * dieHeight);
    setAllCritical(event.target.checked);
  };
  const handleRecticleLimitChange = event => {
    setRecticleLimit(event.target.checked);
  };
  const handleShapeChange = event => {
    setShape(event.target.value);
  };
  const handleSizeChange = event => {
    setSelectedSize(event.target.value);
    if (allCritical) {
      //setCriticalArea()
    }
  };
  const handleModelChange = event => {
    setSelectedModel(event.target.value);
  };
  const numberInputs = [{
    label: "Die Width (mm)",
    value: dieWidth,
    onChange: handleDimensionChange('dieWidth'),
    onBlur: handleBlur(setDieWidth),
    isDisabled: ''
  }, {
    label: "Die Height (mm)",
    value: dieHeight,
    onChange: handleDimensionChange('dieHeight'),
    onBlur: handleBlur(setDieHeight),
    isDisabled: ''
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
    isDisabled: ''
  }, {
    label: "Edge Loss (mm)",
    value: edgeLoss,
    onChange: handleEdgeLossChange,
    onBlur: handleBlur(setEdgeLoss),
    isDisabled: ''
  }, {
    label: "Scribe Lines Horiz",
    value: scribeHoriz,
    onChange: handleScribeSizeChange('horiz'),
    onBlur: handleBlur(setScribeHoriz),
    isDisabled: ''
  }, {
    label: "Scribe Lines Vert",
    value: scribeVert,
    onChange: handleScribeSizeChange('vert'),
    onBlur: handleBlur(setScribeVert),
    isDisabled: ''
  }, {
    label: "Translation Horiz",
    value: transHoriz,
    onChange: handleTransChange('horiz'),
    onBlur: handleBlur(setTransHoriz),
    isDisabled: ''
  }, {
    label: "Translation Vert",
    value: transVert,
    onChange: handleTransChange('vert'),
    onBlur: handleBlur(setTransVert),
    isDisabled: ''
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
    onChange: '',
    checked: ''
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "calc",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "control-panel",
      children: [numberInputs.map(input => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(NumberInput, {
        label: input.label,
        value: input.value,
        isDisabled: input.isDisabled,
        onChange: event => {
          input.onChange(event);
        }
      }, input.label)), checkboxes.map(input => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Checkbox, {
        label: input.label,
        onChange: event => {
          input.onChange(event);
        },
        checked: input.checked
      }, input.label)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ShapeSelector, {
        label: "Shape",
        shape: shape,
        setShape: setShape
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ShapeSizeSelector, {
        selectedSize: selectedSize,
        handleSizeChange: handleSizeChange,
        selectedShape: shape
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ModelSelector, {
        label: "Yield Model",
        selectedModel: selectedModel,
        handleModelChange: handleModelChange
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "calculations",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Calculations, {
        calcState: calcState
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      children: shape === 'Panel' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Panel, {
        calcState: calcState,
        panelSize: PANELSIZES[selectedSize],
        dieHeight: dieHeight,
        dieWidth: dieHeight,
        scribeHoriz: scribeHoriz,
        scribeVert: scribeVert
      }) : shape === 'Wafer' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Wafer, {
        calcState: calcState,
        waferSize: WAFERSIZES[selectedSize],
        dieHeight: dieHeight,
        dieWidth: dieHeight,
        scribeHoriz: scribeHoriz,
        scribeVert: scribeVert
      }) : null
    })]
  });
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
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./src/components/App.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



document.addEventListener('DOMContentLoaded', () => {
  const domNode = document.getElementById('die-yield-calculator');
  react_dom__WEBPACK_IMPORTED_MODULE_0___default().render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], {}), domNode);
});
/******/ })()
;
//# sourceMappingURL=view.js.map
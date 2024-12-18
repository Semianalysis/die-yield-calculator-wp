/**
 * Smallest die edge we will calculate, in mm
 */
export const minDieEdge = 0.2;

/**
 * Available sizes for rectangular wafers
 */
export const panelSizes = {
	s300mm: { name: "300 mm (12 in)", height: 300, width: 300 },
	s305mm: { name: "305 x 457 mm² (12 x 18 in²)", height: 305, width: 457 },
	s457mmsq: { name: "457 mm² (18 in)", height: 457, width: 457 },
	s457x600mm: { name: "457 x 600 mm² (18 x 24 in²)", width: 457, height: 600 },
	s510mm: { name: "510 x 515 mm² (21 in)", height: 510, width: 515 },
	s600m: { name: "600 mm (24 in)", height: 600, width: 600 }
};

/**
 * Available sizes for round wafers
 */
export const waferSizes = {
	s51mm: { name: "51 mm (2 in)", width: 51 },
	s76mm: { name: "76 mm (3 in)", width: 76 },
	s100mm: { name: "100 mm (4 in)", width: 100 },
	s125mm: { name: "125 mm (5 in)", width: 125 },
	s150mm: { name: "150 mm (6 in)", width: 150 },
	s200mm: { name: "200 mm (8 in)", width: 200 },
	s300mm: { name: "300 mm (12 in)", width: 300 },
	s450mm: { name: "450 mm (18 in)", width: 450 }
};

export const fieldWidthMM = 26;
export const fieldHeightMM = 33;

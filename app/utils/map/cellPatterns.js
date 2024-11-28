import { CELL_SIZE, round } from './map';

export const radiusGenerator = {
  memory: new Map(),
  set(coord, modifier, value) {
    this.memory.set(`${coord},${modifier}`, value);
  },
  get(coord, modifier) {
    if (this.memory.has(`${coord},${modifier}`)) {
      return this.memory.get(`${coord},${modifier}`);
    }

    const modifiedCoord = round(coord + modifier * CELL_SIZE);
    this.memory.set(`${coord},${modifier}`, modifiedCoord);
    return modifiedCoord;
  },

  radiusCells(radius, x, y) {
    return this[`_radius${radius}Cells`](x, y);
  },

  _radius1Cells(x, y) {
    return [[y, x]];
  },

  _radius2Cells(x, y) {
    const yPlus1 = this.get(y, 1);
    const xMinus1 = this.get(x, -1);
    // prettier-ignore
    return [
      [yPlus1, xMinus1],  [yPlus1, x],
      [y, xMinus1],       [y, x],
    ];
  },

  _radius3Cells(x, y) {
    const yPlus1 = this.get(y, 1);
    const yMinus1 = this.get(y, -1);
    const xPlus1 = this.get(x, 1);
    const xMinus1 = this.get(x, -1);
    // prettier-ignore
    return [
      [yPlus1, xMinus1],  [yPlus1, x],  [yPlus1, xPlus1],
      [y, xMinus1],       [y, x],       [y, xPlus1],
      [yMinus1, xMinus1], [yMinus1, x], [yMinus1, xPlus1],
    ];
  },

  _radius4Cells(x, y) {
    const yPlus2 = this.get(y, 2);
    const yPlus1 = this.get(y, 1);
    const yMinus1 = this.get(y, -1);
    const xPlus1 = this.get(x, 1);
    const xMinus1 = this.get(x, -1);
    const xMinus2 = this.get(x, -2);
    // prettier-ignore
    return [
                          [yPlus2, xMinus1],  [yPlus2, x],
      [yPlus1, xMinus2],  [yPlus1, xMinus1],  [yPlus1, x],  [yPlus1, xPlus1],
      [y, xMinus2],       [y, xMinus1],       [y, x],       [y, xPlus1],
                          [yMinus1, xMinus1], [yMinus1, x],
    ];
  },

  _radius5Cells(x, y) {
    const yPlus2 = this.get(y, 2);
    const yPlus1 = this.get(y, 1);
    const yMinus1 = this.get(y, -1);
    const yMinus2 = this.get(y, -2);
    const xPlus2 = this.get(x, 2);
    const xPlus1 = this.get(x, 1);
    const xMinus1 = this.get(x, -1);
    const xMinus2 = this.get(x, -2);

    // prettier-ignore
    return [
                          [yPlus2, xMinus1],  [yPlus2, x],  [yPlus2, xPlus1],
      [yPlus1, xMinus2],  [yPlus1, xMinus1],  [yPlus1, x],  [yPlus1, xPlus1], [yPlus1, xPlus2],
      [y, xMinus2],       [y, xMinus1],       [y, x],       [y, xPlus1],      [y, xPlus2],
      [yMinus1, xMinus2], [yMinus1, xMinus1], [yMinus1, x], [yMinus1, xPlus1],[yMinus1, xPlus2],
                          [yMinus2, xMinus1], [yMinus2, x], [yMinus2, xPlus1],
    ];
  },

  _radius6Cells(x, y) {
    const yPlus3 = this.get(y, 3);
    const yPlus2 = this.get(y, 2);
    const yPlus1 = this.get(y, 1);
    const yMinus1 = this.get(y, -1);
    const yMinus2 = this.get(y, -2);
    const xPlus2 = this.get(x, 2);
    const xPlus1 = this.get(x, 1);
    const xMinus1 = this.get(x, -1);
    const xMinus2 = this.get(x, -2);
    const xMinus3 = this.get(x, -3);

    // prettier-ignore
    return [
                          [yPlus3, xMinus2],  [yPlus3, xMinus1],  [yPlus3, x],  [yPlus3, xPlus1],
      [yPlus2, xMinus3],  [yPlus2, xMinus2],  [yPlus2, xMinus1],  [yPlus2, x],  [yPlus2, xPlus1],   [yPlus2, xPlus2],
      [yPlus1, xMinus3],  [yPlus1, xMinus2],  [yPlus1, xMinus1],  [yPlus1, x],  [yPlus1, xPlus1],   [yPlus1, xPlus2],
      [y, xMinus3],       [y, xMinus2],       [y, xMinus1],       [y, x],       [y, xPlus1],        [y, xPlus2],
      [yMinus1, xMinus3], [yMinus1, xMinus2], [yMinus1, xMinus1], [yMinus1, x], [yMinus1, xPlus1],  [yMinus1, xPlus2],
                          [yMinus2, xMinus2], [yMinus2, xMinus1], [yMinus2, x], [yMinus2, xPlus1],
    ];
  },

  _radius7Cells(x, y) {
    const yPlus3 = this.get(y, 3);
    const yPlus2 = this.get(y, 2);
    const yPlus1 = this.get(y, 1);
    const yMinus1 = this.get(y, -1);
    const yMinus2 = this.get(y, -2);
    const yMinus3 = this.get(y, -3);
    const xPlus3 = this.get(x, 3);
    const xPlus2 = this.get(x, 2);
    const xPlus1 = this.get(x, 1);
    const xMinus1 = this.get(x, -1);
    const xMinus2 = this.get(x, -2);
    const xMinus3 = this.get(x, -3);

    // prettier-ignore
    return [
                                              [yPlus3, xMinus1],  [yPlus3, x],  [yPlus3, xPlus1], 
                          [yPlus2, xMinus2],  [yPlus2, xMinus1],  [yPlus2, x],  [yPlus2, xPlus1],   [yPlus2, xPlus2], 
      [yPlus1, xMinus3],  [yPlus1, xMinus2],  [yPlus1, xMinus1],  [yPlus1, x],  [yPlus1, xPlus1],   [yPlus1, xPlus2],  [yPlus1, xPlus3],
      [y, xMinus3],       [y, xMinus2],       [y, xMinus1],       [y, x],       [y, xPlus1],        [y, xPlus2],       [y, xPlus3],
      [yMinus1, xMinus3], [yMinus1, xMinus2], [yMinus1, xMinus1], [yMinus1, x], [yMinus1, xPlus1],  [yMinus1, xPlus2], [yMinus1, xPlus3],
                          [yMinus2, xMinus2], [yMinus2, xMinus1], [yMinus2, x], [yMinus2, xPlus1],  [yMinus2, xPlus2],
                                              [yMinus3, xMinus1], [yMinus3, x], [yMinus3, xPlus1], 
    ];
  },

  _radius8Cells(x, y) {
    const yPlus4 = this.get(y, 4);
    const yPlus3 = this.get(y, 3);
    const yPlus2 = this.get(y, 2);
    const yPlus1 = this.get(y, 1);
    const yMinus1 = this.get(y, -1);
    const yMinus2 = this.get(y, -2);
    const yMinus3 = this.get(y, -3);
    const xPlus3 = this.get(x, 3);
    const xPlus2 = this.get(x, 2);
    const xPlus1 = this.get(x, 1);
    const xMinus1 = this.get(x, -1);
    const xMinus2 = this.get(x, -2);
    const xMinus3 = this.get(x, -3);
    const xMinus4 = this.get(x, -4);
    // prettier-ignore
    return [
                                              [yPlus4, xMinus2],  [yPlus4, xMinus1],  [yPlus4, x],  [yPlus4, xPlus1],
                          [yPlus3, xMinus3],  [yPlus3, xMinus2],  [yPlus3, xMinus1],  [yPlus3, x],  [yPlus3, xPlus1],  [yPlus3, xPlus2],
      [yPlus2, xMinus4],  [yPlus2, xMinus3],  [yPlus2, xMinus2],  [yPlus2, xMinus1],  [yPlus2, x],  [yPlus2, xPlus1],  [yPlus2, xPlus2],  [yPlus2, xPlus3], 
      [yPlus1, xMinus4],  [yPlus1, xMinus3],  [yPlus1, xMinus2],  [yPlus1, xMinus1],  [yPlus1, x],  [yPlus1, xPlus1],  [yPlus1, xPlus2],  [yPlus1, xPlus3],
      [y, xMinus4],       [y, xMinus3],       [y, xMinus2],       [y, xMinus1],       [y, x],       [y, xPlus1],       [y, xPlus2],       [y, xPlus3],
      [yMinus1, xMinus4], [yMinus1, xMinus3], [yMinus1, xMinus2], [yMinus1, xMinus1], [yMinus1, x], [yMinus1, xPlus1], [yMinus1, xPlus2], [yMinus1, xPlus3],
                          [yMinus2, xMinus3], [yMinus2, xMinus2], [yMinus2, xMinus1], [yMinus2, x], [yMinus2, xPlus1], [yMinus2, xPlus2],
                                              [yMinus3, xMinus2], [yMinus3, xMinus1], [yMinus3, x], [yMinus3, xPlus1], 
    ];
  },

  _radius9Cells(x, y) {
    const yRange = Array.from({ length: 33 }, (_, i) => this.get(y, -16 + i));
    const xRange = Array.from({ length: 33 }, (_, i) => this.get(x, -16 + i));

    return yRange.reduce(
      (cells, y, j) =>
        cells.concat(
          xRange.reduce((cellsForX, x, i) => {
            // 22 = 16 + 6
            if (Math.abs(i - 16) + Math.abs(j - 16) <= 22) {
              cellsForX.push([y, x]);
            }
            return cellsForX;
          }, [])
        ),
      []
    );
  },

  _radius10Cells(x, y) {
    const yRange = Array.from({ length: 49 }, (_, i) => this.get(y, -24 + i));
    const xRange = Array.from({ length: 49 }, (_, i) => this.get(x, -24 + i));

    return yRange.reduce(
      (cells, y, j) =>
        cells.concat(
          xRange.reduce((cellsForX, x, i) => {
            // 34 = 24 + 10
            if (Math.abs(i - 24) + Math.abs(j - 24) <= 34) {
              cellsForX.push([y, x]);
            }
            return cellsForX;
          }, [])
        ),
      []
    );
  },
};

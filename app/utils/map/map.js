export const CELL_SIZE = 0.04;
export const HALF_CELL_SIZE = 0.02;

const labelOffsetMap = {
  3: 0.035,
  4: 0.035,
  5: 0.035,
  6: 0.025,
  7: 0.035,
  8: 0.035,
  9: 0.03,
  10: 0.022,
};

function getLabelOffset(zoom) {
  return labelOffsetMap[zoom];
}

export function getLabelX(location, zoom, initZoom, bounds) {
  return `${
    (location.lng / bounds[1][1]) * 100 -
    0.1 +
    5 * getLabelOffset(zoom) * (zoom - initZoom)
  }%`;
}

export function getLabelY(location, zoom, initZoom, bounds) {
  return `${
    (location.lat / bounds[1][0]) * 100 -
    0.1 +
    getLabelOffset(zoom) * (zoom - initZoom)
  }%`;
}

const SETTLEMENT_RADIUS = {
  city: ({ population }) => population / 10000 + 4.5,
  town: ({ population }) => population / 2000 + 3.5,
  village: ({ population }) => population / 480 + 2.96,
};

export function getSettlementRadius(settlement) {
  return SETTLEMENT_RADIUS[settlement.type](settlement);
}

export function shouldShowSettlementName(settlement, zoom) {
  if (zoom <= 4) {
    return settlement.type === 'city';
  } else {
    return true;
  }
}

export function getLocationFromPoint(point) {
  return { lat: point[0], lng: point[1] };
}

export function getPointFromLocation(location) {
  return [location.lat, location.lng];
}

export function round(value) {
  return Math.round(value * 100) / 100;
}

export function roundCoords(y, x) {
  return [round(y), round(x)];
}

export function getCellCorner(location) {
  return roundCoords(
    Math.round((location.lat - HALF_CELL_SIZE) / CELL_SIZE) * CELL_SIZE,
    Math.round((location.lng - HALF_CELL_SIZE) / CELL_SIZE) * CELL_SIZE
  );
}

export function getPolygonsFromPoints(points) {
  // First, create a 2D grid to track which points are occupied
  const grid = {};
  points.forEach(point => {
    const x = point[1];
    const y = point[0];
    if (!grid[y]) grid[y] = {};
    grid[y][x] = true;
  });

  // Function to check if a point is in the grid
  const isOccupied = (y, x) => grid[y]?.[x];

  // Function to find the width of a rectangle starting at (y,x)
  const findWidth = (y, x) => {
    let width = CELL_SIZE;
    while (isOccupied(y, x + width)) width += CELL_SIZE;
    return width;
  };

  // Function to check if a rectangle is valid
  const isValidRectangle = (y, x, width, height) => {
    for (let dy = 0; dy < height; dy += CELL_SIZE) {
      for (let dx = 0; dx < width; dx += CELL_SIZE) {
        if (!isOccupied(y + dy, x + dx)) return false;
      }
    }
    return true;
  };

  // Function to mark cells as used
  const markUsed = (y, x, width, height) => {
    for (let dy = 0; dy < height; dy += CELL_SIZE) {
      for (let dx = 0; dx < width; dx += CELL_SIZE) {
        grid[y + dy][x + dx] = false;
      }
    }
  };

  const polygons = [];

  // Find all rectangles
  Object.keys(grid).forEach(y => {
    y = parseFloat(y);
    Object.keys(grid[y]).forEach(x => {
      x = parseFloat(x);
      if (!grid[y][x]) return;

      const width = findWidth(y, x);
      let height = CELL_SIZE;

      // Try to extend rectangle vertically
      while (isValidRectangle(y, x, width, height + CELL_SIZE)) {
        height += CELL_SIZE;
      }

      // Convert grid coordinates to lat/lng
      const [deltaY, deltaX] = roundCoords(y + height, x + width);
      const polygon = [
        [y, x], // top-left
        [y, deltaX], // top-right
        [deltaY, deltaX], // bottom-right
        [deltaY, x], // bottom-left
      ];

      polygons.push(polygon);
      markUsed(y, x, width, height);
    });
  });

  return polygons;
}

export function closeMapPopup(popupRef, e) {
  e?.stopPropagation();
  if (popupRef.current) {
    popupRef.current._closeButton?.click() ||
      popupRef.current.closePopup?.() ||
      popupRef.current.close?.();
  }
}

export function areSameCoords(a, b) {
  const [a0, a1] = a.map(e => Math.round(e * 100));
  const [b0, b1] = b.map(e => Math.round(e * 100));
  return a0 === b0 && a1 === b1;
}

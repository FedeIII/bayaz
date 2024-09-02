const labelOffsetMap = {
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
    getLabelOffset(zoom) * (zoom - initZoom)
  }%`;
}

export function getLabelY(location, zoom, initZoom, bounds) {
  return `${
    (location.lat / bounds[1][0]) * 100 -
    0.1 +
    getLabelOffset(zoom) * (zoom - initZoom)
  }%`;
}

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

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

export default function MapLabels(props) {
  const { zoom, settlements, initZoom, newLocation, bounds } = props;

  return (
    <>
      {zoom > 4 && (
        <>
          {settlements.map(settlement => (
            <text
              key={settlement.name}
              // x >
              // y v
              x={`${
                (settlement.location.lng / bounds[1][1]) * 100 -
                0.1 +
                getLabelOffset(zoom) * (zoom - initZoom)
              }%`}
              y={`${
                (1 - settlement.location.lat / bounds[1][0]) * 100 -
                0.1 +
                getLabelOffset(zoom) * (zoom - initZoom)
              }%`}
              textAnchor="end"
              fontFamily="Rosarivo"
              fontSize="16px"
              stroke="#d84343"
            >
              {settlement.name}
            </text>
          ))}
          {!!newLocation && (
            <text
              // x >
              // y v
              x={`${
                (newLocation.lng / bounds[1][1]) * 100 -
                0.1 +
                getLabelOffset(zoom) * (zoom - initZoom)
              }%`}
              y={`${
                (1 - newLocation.lat / bounds[1][0]) * 100 -
                0.1 +
                getLabelOffset(zoom) * (zoom - initZoom)
              }%`}
              textAnchor="end"
              fontFamily="Rosarivo"
              fontSize="16px"
              stroke="#d84343"
            >
              New
            </text>
          )}
        </>
      )}
    </>
  );
}

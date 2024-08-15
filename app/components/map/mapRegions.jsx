import MapPopup from './mapPopup';

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

export default function MapRegions(props) {
  const { L, regions, newRegion, bounds, zoom, initZoom } = props;

  return (
    <>
      {!!regions.length &&
        regions.map(region => (
          <L.Polygon
            pathOptions={{ color: region.color }}
            positions={region.vertices}
          >
            <MapPopup L={L} title={region.name}>
              {region.name}
            </MapPopup>
          </L.Polygon>
        ))}
      <L.SVGOverlay bounds={bounds}>
        {!!regions.length &&
          regions.map(region => (
            <text
              key={region.name}
              // x >
              // y v
              x={`${
                (region.vertices[0].lng / bounds[1][1]) * 100 -
                0.1 +
                getLabelOffset(zoom) * (zoom - initZoom)
              }%`}
              y={`${
                (1 - region.vertices[0].lat / bounds[1][0]) * 100 -
                0.1 +
                getLabelOffset(zoom) * (zoom - initZoom)
              }%`}
              textAnchor="end"
              fontFamily="Rosarivo"
              fontSize="16px"
              stroke={region.color}
            >
              {region.name}
            </text>
          ))}
      </L.SVGOverlay>
      <L.Polygon pathOptions={{ color: 'red' }} positions={newRegion}>
        <MapPopup L={L} title="Nueva región">
          <ul className="map__popup-options">
            <li>
              Nombre:{' '}
              <input
                name="regionName"
                type="text"
                className="map__popup-text-input"
              />
            </li>
            <li>
              Color:{' '}
              <input
                name="regionColor"
                type="text"
                className="map__popup-text-input"
              />
            </li>
            <li>
              <button name="action" value="createRegion" type="submit">
                Crear región
              </button>
            </li>
          </ul>
        </MapPopup>
      </L.Polygon>
    </>
  );
}

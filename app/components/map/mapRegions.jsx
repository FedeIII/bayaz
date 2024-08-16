import { useRef, useState } from 'react';
import { useSubmit } from '@remix-run/react';
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

function ExistingRegions(props) {
  const { L, regions = [], bounds, zoom, initZoom } = props;

  const submit = useSubmit();

  return (
    <>
      {!!regions.length &&
        regions.map(region => (
          <>
            {region.vertices.map(vertex => (
              <L.CircleMarker
                center={[vertex.lat, vertex.lng]}
                pathOptions={{ color: region.color }}
                radius={5}
              >
                <MapPopup L={L} title={region.name}>
                  <ul className="map__popup-options">
                    <li>
                      <button
                        type="button"
                        onClick={() =>
                          submit(
                            {
                              action: 'deleteVertex',
                              id: region.id,
                              vertexId: vertex._id,
                            },
                            { method: 'post' }
                          )
                        }
                      >
                        Quitar vértice de {region.name}
                      </button>
                    </li>
                  </ul>
                </MapPopup>
              </L.CircleMarker>
            ))}
            <L.Polygon
              pathOptions={{ color: region.color }}
              positions={region.vertices}
            >
              <MapPopup L={L} title={region.name}>
                {region.name}
              </MapPopup>
            </L.Polygon>
          </>
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
    </>
  );
}

function NewRegion(props) {
  const {
    L,
    newRegion,
    newLocation,
    onMapClick,
    resetRegion,
    addLocationToRegion,
    removeLocationFromRegion,
  } = props;

  const [regionColor, setRegionColor] = useState('#d84343');
  const submit = useSubmit();
  const nameRef = useRef(null);

  return (
    <>
      {newRegion.map(vertex => (
        <L.CircleMarker center={[vertex.lat, vertex.lng]} radius={5}>
          <MapPopup L={L} title="Nueva región">
            <ul className="map__popup-options">
              <li>
                <button
                  type="button"
                  onClick={() => removeLocationFromRegion(vertex)}
                >
                  Quitar vértice
                </button>
              </li>
            </ul>
          </MapPopup>
        </L.CircleMarker>
      ))}
      <L.Polygon
        pathOptions={{ color: regionColor }}
        positions={newRegion}
        eventHandlers={{ click: onMapClick }}
      >
        <MapPopup L={L} title="Nueva región">
          <ul className="map__popup-options">
            <li>
              Nombre:{' '}
              <input
                ref={nameRef}
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
                value={regionColor}
                onChange={e => setRegionColor(e.target.value)}
              />
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  submit(
                    {
                      action: 'createRegion',
                      regionName: nameRef.current.value,
                      regionColor: regionColor,
                      vertices: newRegion
                        .map(v => `${v.lat},${v.lng}`)
                        .join('|'),
                    },
                    { method: 'post' }
                  )
                }
              >
                Crear región
              </button>{' '}
              <button type="button" onClick={resetRegion}>
                Borrar región
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => addLocationToRegion(newLocation)}
              >
                Añadir vértice
              </button>
            </li>
          </ul>
        </MapPopup>
      </L.Polygon>
    </>
  );
}

export default function MapRegions(props) {
  const {
    L,
    regions,
    newRegion,
    newLocation,
    bounds,
    zoom,
    initZoom,
    onMapClick,
    resetRegion,
    addLocationToRegion,
    removeLocationFromRegion,
  } = props;

  return (
    <>
      <ExistingRegions
        L={L}
        regions={regions}
        bounds={bounds}
        zoom={zoom}
        initZoom={initZoom}
      />
      {!!newRegion.length && (
        <NewRegion
          L={L}
          newRegion={newRegion}
          newLocation={newLocation}
          onMapClick={onMapClick}
          resetRegion={resetRegion}
          addLocationToRegion={addLocationToRegion}
          removeLocationFromRegion={removeLocationFromRegion}
        />
      )}
    </>
  );
}

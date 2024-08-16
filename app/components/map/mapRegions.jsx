import { Fragment, useRef, useState } from 'react';
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
  const {
    L,
    regions = [],
    bounds,
    zoom,
    initZoom,
    newLocation,
    addLocationToRegion,
    onMapClick,
  } = props;

  const submit = useSubmit();
  const [regionOver, setRegionOver] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [vertexOver, setVertexOver] = useState(null);

  return (
    <>
      {!!regions.length &&
        regions.map(region => (
          <Fragment key={region.id}>
            {selectedRegion === region.id &&
              region.vertices.map(vertex => (
                <L.CircleMarker
                  key={`${vertex.lat}-${vertex.lng}`}
                  pane="subdomainsPane"
                  center={[vertex.lat, vertex.lng]}
                  pathOptions={{
                    color: vertexOver === vertex._id ? '#2b8c47' : region.color,
                  }}
                  radius={vertexOver === vertex._id ? 5 : 2}
                  eventHandlers={{
                    click: onMapClick,
                    mouseover: () => setVertexOver(vertex._id),
                    mouseout: () => setVertexOver(null),
                  }}
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
                </L.CircleMarker>
              ))}

            <L.Polygon
              pane="subdomainsPane"
              pathOptions={{
                color: region.color,
                opacity:
                  selectedRegion === region.id
                    ? 1.0
                    : regionOver === region.id
                    ? 0.5
                    : 0.2,
              }}
              positions={region.vertices}
              eventHandlers={{
                click: e => {
                  onMapClick(e);
                  setSelectedRegion(region.id);
                },
                mouseover: () => setRegionOver(region.id),
                mouseout: () => setRegionOver(null),
              }}
            >
              <MapPopup L={L} title={region.name}>
                <ul className="map__popup-options">
                  <li>{region.name}</li>
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
          </Fragment>
        ))}
      <L.SVGOverlay bounds={bounds}>
        {!!regions.length &&
          regions.map(
            region =>
              (regionOver === region.id || selectedRegion === region.id) && (
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
                  fontSize="22px"
                  stroke="black"
                  fill={region.color}
                >
                  {region.name}
                </text>
              )
          )}
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
        <L.CircleMarker
          pane="newElementsPane"
          center={[vertex.lat, vertex.lng]}
          radius={5}
        >
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
        pane="newElementsPane"
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
        newLocation={newLocation}
        addLocationToRegion={addLocationToRegion}
        onMapClick={onMapClick}
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

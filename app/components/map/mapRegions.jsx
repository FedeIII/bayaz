import { useEffect, useRef, useState } from 'react';
import { Link, useSubmit } from '@remix-run/react';
import MapPopup from './mapPopup';
import { RegionPaneMap } from '~/domain/places/regions';
import { getLabelX, getLabelY } from '~/utils/map';

function RegionVertexMarker(props) {
  const {
    L,
    vertex,
    isEditingVertices,
    isMovingRegion,
    vertexOver,
    region,
    onMapClick,
    setVertexOver,
    addLocationToRegion,
    newLocation,
  } = props;

  const regionVertexPopupRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState([vertex.lat, vertex.lng]);
  useEffect(() => {
    setPosition([vertex.lat, vertex.lng]);
  }, [vertex.lat, vertex.lng]);

  const submit = useSubmit();
  function placeVertex(id, location) {
    submit(
      {
        action: 'editVertex',
        regionId: region.id,
        vertexId: id,
        lat: location.lat,
        lng: location.lng,
        isMovingRegion,
      },
      { method: 'post' }
    );
  }

  const MarkerComponent = isEditingVertices ? L.Marker : L.CircleMarker;

  return (
    <MarkerComponent
      key={`${vertex.lat}-${vertex.lng}`}
      ref={markerRef}
      pane="regionMarkersPane"
      center={position}
      position={position}
      pathOptions={{
        color: vertexOver === vertex._id ? '#2b8c47' : region.color,
      }}
      radius={vertexOver === vertex._id ? 5 : 2}
      draggable
      eventHandlers={{
        click: onMapClick,
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const newPosition = marker.getLatLng();
            setPosition(marker.getLatLng());
            placeVertex(vertex._id, newPosition);
          }
        },
        mouseover: () => setVertexOver(vertex._id),
        mouseout: () => setVertexOver(null),
      }}
    >
      <MapPopup L={L} title={region.name} ref={regionVertexPopupRef}>
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
              onClick={() => {
                addLocationToRegion(newLocation);
                regionVertexPopupRef.current._closeButton.click();
              }}
            >
              Añadir vértice
            </button>
          </li>
        </ul>
      </MapPopup>
    </MarkerComponent>
  );
}

function Region(props) {
  const {
    L,
    selectedRegion,
    region,
    vertexOver,
    onMapClick,
    setVertexOver,
    addLocationToRegion,
    newLocation,
    regionOver,
    setSelectedRegion,
    setRegionOver,
  } = props;

  const regionPopupRef = useRef(null);
  const typeRef = useRef(null);
  const [isEditingVertices, setIsEditingVertices] = useState(false);
  const [isMovingRegion, setIsMovingRegion] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const submit = useSubmit();

  function onRegionClick(e) {
    onMapClick(e);
    setSelectedRegion(region.id);
    if (isEditingLabel) {
      setIsEditingLabel(false);
      submit(
        {
          action: 'moveRegionName',
          id: region.id,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        },
        { method: 'post' }
      );
    }
  }

  return (
    <>
      {selectedRegion === region.id &&
        region.vertices.map(vertex => (
          <RegionVertexMarker
            key={vertex._id}
            L={L}
            vertex={vertex}
            isEditingVertices={isEditingVertices}
            isMovingRegion={isMovingRegion}
            vertexOver={vertexOver}
            region={region}
            onMapClick={onMapClick}
            setVertexOver={setVertexOver}
            addLocationToRegion={addLocationToRegion}
            newLocation={newLocation}
          />
        ))}

      <L.Polygon
        pane={RegionPaneMap[region.type]}
        pathOptions={{
          color: region.color,
          opacity:
            selectedRegion === region.id
              ? 1.0
              : regionOver === region.id
              ? 0.5
              : 0.2,
          fillOpacity: isMovingRegion ? 0.66 : 0.2,
        }}
        positions={region.vertices}
        eventHandlers={{
          click: onRegionClick,
          mouseover: () => setRegionOver(region.id),
          mouseout: () => setRegionOver(null),
        }}
      >
        <MapPopup L={L} title={region.name} ref={regionPopupRef}>
          <ul className="map__popup-options">
            <li>
              <Link
                to={`/places/generic/${region.name}`}
                target="_blank"
                className="places__save"
              >
                {region.name || 'Sin nombre'}
              </Link>{' '}
              <button
                type="button"
                onClick={() => {
                  setIsEditingLabel(true);
                  regionPopupRef.current._closeButton.click();
                }}
              >
                Colocar nombre
              </button>
            </li>
            <li>
              <select
                name="settlementType"
                defaultValue="village"
                ref={typeRef}
              >
                <option value="village">Aldea</option>
                <option value="town">Pueblo</option>
                <option value="city">Ciudad</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  submit(
                    {
                      action: 'createSettlement',
                      lat: newLocation.lat,
                      lng: newLocation.lng,
                      type: typeRef.current.value,
                    },
                    { method: 'post' }
                  )
                }
              >
                Crear asentamiento
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  addLocationToRegion(newLocation);
                  regionPopupRef.current._closeButton.click();
                }}
              >
                Añadir vértice
              </button>{' '}
              {isEditingVertices ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingVertices(false);
                      setIsMovingRegion(false);
                      regionPopupRef.current._closeButton.click();
                    }}
                  >
                    Parar edición
                  </button>
                  <button
                    type="button"
                    onClick={e => {
                      setIsMovingRegion(true);
                      regionPopupRef.current._closeButton.click();
                    }}
                  >
                    Mover región
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingVertices(true);
                    regionPopupRef.current._closeButton.click();
                  }}
                >
                  Editar vértices
                </button>
              )}
            </li>
          </ul>
        </MapPopup>
      </L.Polygon>
    </>
  );
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

  const [regionOver, setRegionOver] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [vertexOver, setVertexOver] = useState(null);

  return (
    <>
      {!!regions.length &&
        regions.map(region => (
          <Region
            key={region.id}
            L={L}
            selectedRegion={selectedRegion}
            region={region}
            vertexOver={vertexOver}
            onMapClick={onMapClick}
            setVertexOver={setVertexOver}
            addLocationToRegion={addLocationToRegion}
            newLocation={newLocation}
            regionOver={regionOver}
            setSelectedRegion={setSelectedRegion}
            setRegionOver={setRegionOver}
          />
        ))}
      <L.SVGOverlay bounds={bounds} pane="textPane">
        {!!regions.length &&
          regions.map(
            region =>
              (regionOver === region.id || selectedRegion === region.id) && (
                <text
                  key={region.name}
                  // x >
                  // y v
                  x={getLabelX(
                    region.nameLocation || region.vertices[0],
                    zoom,
                    initZoom,
                    bounds
                  )}
                  y={getLabelY(
                    region.nameLocation || region.vertices[0],
                    zoom,
                    initZoom,
                    bounds
                  )}
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
  const newRegionPopupRef = useRef(null);

  return (
    <>
      {newRegion.map(vertex => (
        <L.CircleMarker
          key={`${vertex.lat}-${vertex.lng}`}
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
        <MapPopup L={L} title="Nueva región" ref={newRegionPopupRef}>
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
                onClick={() => {
                  addLocationToRegion(newLocation);
                  newRegionPopupRef.current._closeButton.click();
                }}
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

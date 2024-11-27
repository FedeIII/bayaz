import { useEffect, useRef, useState } from 'react';
import { Link, useSubmit } from '@remix-run/react';
import { SVGOverlay, Polygon } from 'react-leaflet';

import {
  closeMapPopup,
  getLabelX,
  getLabelY,
  getPolygonsFromPoints,
} from '~/utils/map';
import { RegionPaneMap } from '~/domain/places/regions';
import MapPopup from './mapPopup';

function Region(props) {
  const {
    selectedRegion,
    region,
    onMapClick,
    newLocation,
    regionOver,
    setSelectedRegion,
    setRegionOver,
    editingRegionPoints,
  } = props;

  const regionPopupRef = useRef(null);
  const typeRef = useRef(null);
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

  const regionPoints = editingRegionPoints.length
    ? editingRegionPoints
    : region.points;
  const polygons = getPolygonsFromPoints(regionPoints);

  return polygons.map(polygon => (
    <Polygon
      key={polygon._id}
      pane={RegionPaneMap[region.type]}
      pathOptions={{
        color: region.color,
        opacity: 0,
        fillOpacity:
          selectedRegion === region.id
            ? 0.5
            : regionOver === region.id
            ? 0.35
            : 0.2,
      }}
      positions={polygon.map(point => ({ lat: point[0], lng: point[1] }))}
      eventHandlers={{
        click: onRegionClick,
        mouseover: () => setRegionOver(region.id),
        mouseout: () => setRegionOver(null),
      }}
    >
      <MapPopup title={region.name} ref={regionPopupRef}>
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
              onClick={e => {
                setIsEditingLabel(true);
                closeMapPopup(regionPopupRef, e);
              }}
            >
              Colocar nombre
            </button>
          </li>
          <li>
            <select name="settlementType" defaultValue="village" ref={typeRef}>
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
        </ul>
      </MapPopup>
    </Polygon>
  ));
}

function ExistingRegions(props) {
  const {
    regions = [],
    bounds,
    zoom,
    initZoom,
    newLocation,
    onMapClick,
    editingRegion,
    editingRegionPoints,
    selectedRegion,
    setSelectedRegion,
  } = props;

  const [regionOver, setRegionOver] = useState(null);

  return (
    <>
      {!!regions.length &&
        regions.map(region => (
          <Region
            key={region.id}
            selectedRegion={selectedRegion}
            region={region}
            onMapClick={onMapClick}
            newLocation={newLocation}
            regionOver={regionOver}
            setSelectedRegion={setSelectedRegion}
            setRegionOver={setRegionOver}
            editingRegionPoints={
              editingRegion === region.id ? editingRegionPoints : []
            }
          />
        ))}
      <SVGOverlay bounds={bounds} pane="textPane">
        {!!regions.length &&
          regions.map(
            region =>
              (regionOver === region.id || selectedRegion === region.id) && (
                <text
                  key={region.name}
                  // x >
                  // y v
                  x={getLabelX(
                    region.nameLocation || region.points[0],
                    zoom,
                    initZoom,
                    bounds
                  )}
                  y={getLabelY(
                    region.nameLocation || region.points[0],
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
      </SVGOverlay>
    </>
  );
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function NewRegion(props) {
  const { newRegion, onMapClick, resetNewRegion } = props;

  const [regionColor, setRegionColor] = useState(randomColor());
  const submit = useSubmit();
  const nameRef = useRef(null);
  const newRegionPopupRef = useRef(null);

  useEffect(() => {
    setRegionColor(randomColor());
  }, []);

  const newRegionPolygons = getPolygonsFromPoints(newRegion);

  return newRegionPolygons.map(polygon => (
    <Polygon
      key={polygon._id}
      pane="newElementsPane"
      pathOptions={{
        color: regionColor,
        opacity: 0,
        fillOpacity: 0.6,
      }}
      positions={polygon}
      eventHandlers={{ click: onMapClick }}
    >
      <MapPopup title="Nueva región" ref={newRegionPopupRef}>
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
                    points: newRegion.map(p => `${p[0]},${p[1]}`).join('|'),
                  },
                  { method: 'post' }
                )
              }
            >
              Crear región
            </button>{' '}
            <button type="button" onClick={resetNewRegion}>
              Borrar región
            </button>
          </li>
        </ul>
      </MapPopup>
    </Polygon>
  ));
}

export default function MapRegions(props) {
  const {
    regions,
    newRegion,
    newLocation,
    bounds,
    zoom,
    initZoom,
    onMapClick,
    resetNewRegion,
    editingRegion,
    editingRegionPoints,
    selectedRegion,
    setSelectedRegion,
  } = props;

  return (
    <>
      <ExistingRegions
        regions={regions}
        bounds={bounds}
        zoom={zoom}
        initZoom={initZoom}
        newLocation={newLocation}
        onMapClick={onMapClick}
        editingRegion={editingRegion}
        editingRegionPoints={editingRegionPoints}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      {!!newRegion.length && (
        <NewRegion
          newRegion={newRegion}
          onMapClick={onMapClick}
          resetNewRegion={resetNewRegion}
        />
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { Util, CRS, Transformation } from 'leaflet';
import {
  useMapEvents,
  MapContainer,
  Pane,
  TileLayer,
  SVGOverlay,
} from 'react-leaflet';

import withLoading from '~/components/HOCs/withLoading';
import { areSameCoords, getCellCorner } from '~/utils/map';
import MapMarkers from './mapMarkers';
import MapLabels from './mapLabels';
import MapRegions from './mapRegions';

// x c [0, 100] left to right
// y c [0, 120] bottom to top

const bounds = [
  [0, 0],
  [129, 109],
];

const initZoom = 6;

function ClientMap() {
  const { center: initCenter, settlements, regions } = useLoaderData();
  const submit = useSubmit();

  const [zoom, setZoom] = useState(initZoom);
  const [newLocation, setNewLocation] = useState(null);

  const [selectedRegion, setSelectedRegion] = useState(null);

  // new region defined as an array of points
  const [newRegion, setNewRegion] = useState([]);
  const [regionCreationStarted, setRegionCreationStarted] = useState(false);

  const [editingRegion, setEditingRegion] = useState(null);
  const [editingRegionPoints, setEditingRegionPoints] = useState([]);
  const [isUsingTool, setIsUsingTool] = useState(false);

  const [tool, setTool] = useState(null); // paint, delete
  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if (!mapContainer) return;

    if (tool) {
      // Only override cursor when a tool is selected
      const cursor =
        tool === 'paint' ? 'crosshair' : tool === 'delete' ? 'no-drop' : 'auto';

      mapContainer.style.cursor = cursor;
    } else {
      // Remove our cursor override when no tool is selected
      mapContainer.style.removeProperty('cursor');
    }
  }, [tool]);

  function startRegionCreation(location) {
    setRegionCreationStarted(true);
  }

  function addLocationToNewRegion(location) {
    const [y, x] = getCellCorner(location);

    setNewRegion(old => [...old, [y, x]]);
  }

  function startRegionEditing() {
    setEditingRegion(selectedRegion);
    setEditingRegionPoints(regions.find(r => r.id === selectedRegion).points);
  }

  function stopRegionEditing() {
    setTool(null);
    setIsUsingTool(false);
    setEditingRegion(null);
    setEditingRegionPoints([]);
  }

  function editRegion(location) {
    const [y, x] = getCellCorner(location);
    switch (tool) {
      case 'paint':
        return setEditingRegionPoints(old => [...old, [y, x]]);
      case 'delete':
        return setEditingRegionPoints(old =>
          old.filter(point => !areSameCoords(point, [y, x]))
        );
    }
  }

  function saveLocationsToRegion() {
    if (!editingRegion) return;

    submit(
      {
        action: 'setPointsForRegion',
        regionId: editingRegion,
        points: editingRegionPoints.map(point => point.join(',')).join('|'),
      },
      { method: 'post' }
    );

    stopRegionEditing();
  }

  function resetNewRegion(e) {
    e?.preventDefault();
    e?.stopPropagation();
    setNewRegion([]);
    setRegionCreationStarted(false);
  }

  useEffect(() => {
    resetNewRegion();
  }, [regions.length]);

  const center = initCenter || [70.385009765625, 34.26859054483621];

  function onMapClick(e) {
    console.log('Click', [e.latlng.lat, e.latlng.lng], e);
    if (regionCreationStarted) {
      addLocationToNewRegion(e.latlng);
    } else if (!editingRegion) {
      setNewLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  }

  function MapEvents() {
    const map = useMapEvents({
      click: onMapClick,
      zoom: e => {
        console.log('Zoom', e.target._zoom, e);
        setZoom(e.target._zoom);
      },
      mousedown: e => {
        console.log('Mousedown', e.latlng);
        // Disable dragging when editing with paint/delete tools
        if (editingRegion && (tool === 'paint' || tool === 'delete')) {
          map.dragging.disable();
          setIsUsingTool(true);
          editRegion(e.latlng);
        }
      },
      mouseup: () => {
        // Re-enable dragging when mouse is released
        if (!map.dragging.enabled()) {
          map.dragging.enable();
        }

        if (
          editingRegion &&
          (tool === 'paint' || tool === 'delete') &&
          isUsingTool
        ) {
          setIsUsingTool(false);
        }
      },
      mousemove: e => {
        if (isUsingTool) {
          console.log('Using tool', [e.latlng.lat, e.latlng.lng], e);
          editRegion(e.latlng);
        }
      },
    });

    useEffect(() => {
      return () => {
        // Cleanup: ensure dragging is enabled when component unmounts
        if (map && !map.dragging.enabled()) {
          map.dragging.enable();
        }
      };
    }, [map]);

    return null;
  }

  return (
    <Form
      method="post"
      style={{ width: '100vw', height: '100vh', cursor: 'inherit' }}
    >
      <MapContainer
        // center={[y^, x>]}
        center={center}
        zoom={initZoom}
        minZoom="2"
        maxZoom="8"
        scrollWheelZoom={true}
        crs={Util.extend(CRS.Simple, {
          transformation: new Transformation(1, 0, 1, 0),
        })}
        style={{ height: '100%', cursor: 'inherit' }}
      >
        {/* <L.ImageOverlay url="/images/map_raw.png" bounds={bounds} /> */}

        <Pane name="tilesPane" style={{ zIndex: 400 }} />
        <Pane name="dominionsPane" style={{ zIndex: 500 }} />
        <Pane name="subdominionsPane" style={{ zIndex: 600 }} />
        <Pane name="otherRegionsPane" style={{ zIndex: 700 }} />
        <Pane name="regionMarkersPane" style={{ zIndex: 800 }} />
        <Pane name="settlementsPane" style={{ zIndex: 900 }} />
        <Pane name="textPane" style={{ zIndex: 1000 }} />
        <Pane name="newElementsPane" style={{ zIndex: 1100 }} />
        <Pane name="popupsPane" style={{ zIndex: 1200 }} />

        <TileLayer
          // getTileUrl={getTileUrl}
          url="/images/tiles/{z}/{x}/{y}.png" // The path to your tile images
          attribution="&copy; Your Map Attribution" // Add any attribution required
          pane="tilesPane"
          zIndex={1}
          style={{ transform: 'translateY(-500px)' }}
        />

        <MapMarkers
          settlements={settlements}
          newLocation={newLocation}
          region={newRegion}
          startRegionCreation={startRegionCreation}
        />

        <SVGOverlay bounds={bounds} pane="textPane">
          <MapLabels
            zoom={zoom}
            settlements={settlements}
            initZoom={initZoom}
            newLocation={newLocation}
            bounds={bounds}
          />
        </SVGOverlay>

        <MapRegions
          regions={regions}
          newRegion={newRegion}
          newLocation={newLocation}
          bounds={bounds}
          zoom={zoom}
          initZoom={initZoom}
          onMapClick={onMapClick}
          resetNewRegion={resetNewRegion}
          editingRegion={editingRegion}
          editingRegionPoints={editingRegionPoints}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />

        <MapEvents />
      </MapContainer>
      <div className="map__edit-menu">
        {editingRegion && (
          <button
            type="button"
            className="map__button"
            onClick={() => setTool('paint')}
          >
            🖌 Pintar
          </button>
        )}
        {editingRegion && (
          <button
            type="button"
            className="map__button"
            onClick={() => setTool('delete')}
          >
            ⌫ Borrar
          </button>
        )}
        {editingRegion && (
          <button
            type="button"
            className="map__button"
            onClick={() => setTool(null)}
          >
            ✊ Navegar
          </button>
        )}
        {selectedRegion && !editingRegion && (
          <button
            type="button"
            className="map__button"
            onClick={startRegionEditing}
          >
            ✎ Editar {regions.find(r => r.id === selectedRegion).name}
          </button>
        )}
        {selectedRegion && editingRegion && (
          <button
            type="button"
            className="map__button"
            onClick={stopRegionEditing}
          >
            ✗ Cancelar
          </button>
        )}
        {editingRegion && (
          <button
            type="button"
            className="map__button"
            onClick={saveLocationsToRegion}
          >
            💾 Guardar
          </button>
        )}
      </div>
    </Form>
  );
}

export default withLoading(ClientMap);

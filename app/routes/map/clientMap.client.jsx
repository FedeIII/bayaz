import { useEffect, useState } from 'react';
import { Form, useLoaderData } from '@remix-run/react';
import {
  useMapEvents,
  MapContainer,
  Pane,
  SVGOverlay,
  TileLayer,
} from 'react-leaflet';
import { Util, CRS, Transformation } from 'leaflet';

import { removeItem } from '~/utils/array';
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
  const [crs, setCrs] = useState(null);

  const [zoom, setZoom] = useState(initZoom);
  const [newLocation, setNewLocation] = useState(null);
  const [newRegion, setNewRegion] = useState([]);
  function addLocationToRegion(location) {
    setNewRegion(old => [...old, location]);
  }
  function removeLocationFromRegion(location) {
    setNewRegion(old =>
      removeItem(
        vertex => vertex.lat === location.lat && vertex.lng === location.lng,
        old
      )
    );
  }
  function resetRegion(e) {
    e?.preventDefault();
    setNewRegion([]);
  }

  useEffect(() => {
    resetRegion();
  }, [regions.length]);

  const center = initCenter || [70.385009765625, 34.26859054483621];

  function onMapClick(e) {
    console.log('Click', [e.latlng.lat, e.latlng.lng], e);
    setNewLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
  }

  function MapEvents() {
    useMapEvents({
      click: onMapClick,
      zoom: e => {
        console.log('Zoom', e.target._zoom, e);
        setZoom(e.target._zoom);
      },
    });

    return null;
  }

  useEffect(() => {
    setCrs(
      Util.extend(CRS.Simple, {
        transformation: new Transformation(1, 0, 1, 0),
      })
    );
  }, []);

  return (
    <Form method="post" style={{ width: '100vw', height: '100vh' }}>
      {!!crs && (
        <MapContainer
          // center={[y^, x>]}
          center={center}
          zoom={initZoom}
          minZoom="2"
          maxZoom="8"
          scrollWheelZoom={true}
          crs={crs}
          style={{ height: '100%' }}
        >
          {/* <ImageOverlay url="/images/map_raw.png" bounds={bounds} /> */}

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
            addLocationToRegion={addLocationToRegion}
            removeLocationFromRegion={removeLocationFromRegion}
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
            resetRegion={resetRegion}
            addLocationToRegion={addLocationToRegion}
            removeLocationFromRegion={removeLocationFromRegion}
          />

          <MapEvents />
        </MapContainer>
      )}
    </Form>
  );
}

export default ClientMap;

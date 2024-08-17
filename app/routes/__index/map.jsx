import { useEffect, useState } from 'react';
import { Form, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import {
  createSettlement,
  getSettlements,
} from '~/services/settlements.server';
import {
  createRegion,
  deleteVertex,
  getRegions,
} from '~/services/regions.server';
import MapMarkers from '~/components/map/mapMarkers';
import MapLabels from '~/components/map/mapLabels';
import MapRegions from '~/components/map/mapRegions';
import { removeItem } from '~/utils/array';

import styles from '~/components/map/map.css';
import placesStyles from '~/components/places.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: placesStyles },
  ];
};

// x c [0, 100] left to right
// y c [0, 120] bottom to top

const bounds = [
  [0, 0],
  [120, 100],
];

const initZoom = 6;

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  let lat = url.searchParams.get('lat');
  let lng = url.searchParams.get('lng');
  const center =
    lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

  const [settlements, regions] = await Promise.all([
    getSettlements(),
    getRegions(),
  ]);

  return json({
    center,
    settlements: settlements.filter(settlement => !!settlement.location),
    regions,
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  if (action === 'createSettlement') {
    const lat = formData.get('lat');
    const lng = formData.get('lng');
    const type = formData.get('type');

    const settlement = await createSettlement({
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      type,
    });

    return redirect(`/places/settlement/${settlement.id}`);
  } else if (action === 'createRegion') {
    const regionName = formData.get('regionName');
    const regionColor = formData.get('regionColor');
    const vertices = formData.get('vertices');

    await createRegion({
      name: regionName,
      type: 'subdomain',
      color: regionColor,
      vertices: vertices.split('|').map(latLng => {
        const [lat, lng] = latLng.split(',');
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      }),
    });

    return json({ regions: await getRegions() });
  } else if (action === 'deleteVertex') {
    const id = formData.get('id');
    const vertexId = formData.get('vertexId');

    await deleteVertex(id, vertexId);

    return json({ regions: await getRegions() });
  }

  return null;
};

function Map() {
  const { center: initCenter, settlements, regions } = useLoaderData();
  const [L, setL] = useState(null);
  const [Lb, setLb] = useState(null);
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

  const center = initCenter || [52, 35];

  function onMapClick(e) {
    console.log('Click', [e.latlng.lat, e.latlng.lng], e);
    setNewLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
  }

  function MapEvents() {
    L.useMapEvents({
      click: onMapClick,
      zoom: e => {
        console.log('Zoom', e.target._zoom, e);
        setZoom(e.target._zoom);
      },
    });

    return null;
  }

  useEffect(() => {
    if (!L) import('react-leaflet').then(leaflet => setL(leaflet));
  }, [L]);

  useEffect(() => {
    if (!Lb) import('leaflet').then(leaflet => setLb(leaflet));
  }, [Lb]);

  return (
    <Form method="post" style={{ width: '100vw', height: '100vh' }}>
      {!!L && !!Lb && (
        <L.MapContainer
          // center={[y^, x>]}
          center={center}
          zoom={initZoom}
          minZoom="2"
          maxZoom="10"
          scrollWheelZoom={true}
          crs={Lb.default.CRS.Simple}
          style={{ height: '100%' }}
        >
          <L.ImageOverlay url="/images/map_raw.png" bounds={bounds} />

          <L.Pane name="domainsPane" style={{ zIndex: 500 }} />
          <L.Pane name="subdomainsPane" style={{ zIndex: 600 }} />
          <L.Pane name="settlementsPane" style={{ zIndex: 700 }} />
          <L.Pane name="textPane" style={{ zIndex: 800 }} />
          <L.Pane name="newElementsPane" style={{ zIndex: 900 }} />
          <L.Pane name="popupsPane" style={{ zIndex: 1000 }} />

          <MapMarkers
            L={L}
            settlements={settlements}
            newLocation={newLocation}
            region={newRegion}
            addLocationToRegion={addLocationToRegion}
            removeLocationFromRegion={removeLocationFromRegion}
          />

          <L.SVGOverlay bounds={bounds} pane="textPane">
            <MapLabels
              zoom={zoom}
              settlements={settlements}
              initZoom={initZoom}
              newLocation={newLocation}
              bounds={bounds}
            />
          </L.SVGOverlay>

          <MapRegions
            L={L}
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
        </L.MapContainer>
      )}
    </Form>
  );
}

export default Map;

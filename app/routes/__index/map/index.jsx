import { useEffect, useState } from 'react';
import { Form, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import {
  createSettlement,
  getSettlements,
} from '~/services/settlements.server';
import { createRegion, getRegions } from '~/services/regions.server';
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

const polygon = [
  [61.0810546875, 30.381518785650385],
  [57.4560546875, 36.41127634718001],
  [55.9248046875, 30.22530744985946],
];

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
    const verticesRaw = formData.getAll('region[]');
    const vertices = verticesRaw.map(vertexRaw => vertexRaw.split('-'));

    return await createRegion({
      name: regionName,
      type: 'subdomain',
      color: regionColor,
      vertices: vertices.map(([lat, lng]) => ({ lat, lng })),
    });
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

  const center = initCenter || [52, 35];

  function MapEvents() {
    L.useMapEvents({
      click: e => {
        console.log('Click', [e.latlng.lat, e.latlng.lng], e);
        setNewLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
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
      {!!newLocation && (
        <>
          <input
            readOnly
            type="text"
            name="lat"
            value={newLocation.lat}
            hidden
          />
          <input
            readOnly
            type="text"
            name="lng"
            value={newLocation.lng}
            hidden
          />
        </>
      )}
      {!!newRegion.length && (
        <>
          {newRegion.map(vertex => (
            <input
              readOnly
              type="text"
              name="region[]"
              value={`${vertex.lat}-${vertex.lng}`}
              hidden
            />
          ))}
        </>
      )}
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
          <L.ImageOverlay
            url="http://localhost:3000/images/map_raw.png"
            bounds={bounds}
          />
          <MapMarkers
            L={L}
            settlements={settlements}
            newLocation={newLocation}
            region={newRegion}
            addLocationToRegion={addLocationToRegion}
            removeLocationFromRegion={removeLocationFromRegion}
          />
          <L.SVGOverlay bounds={bounds}>
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
            bounds={bounds}
            zoom={zoom}
            initZoom={initZoom}
          />
          <MapEvents />
        </L.MapContainer>
      )}
    </Form>
  );
}

export default Map;

import { useEffect, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import {
  createSettlement,
  getSettlements,
} from '~/services/settlements.server';
import MapPopup from '~/components/map/mapPopup';

import styles from '~/components/map/map.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

// x c [0, 100] left to right
// y c [0, 120] bottom to top

const bounds = [
  [0, 0],
  [120, 100],
];

const initZoom = 6;

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

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  let lat = url.searchParams.get('lat');
  let lng = url.searchParams.get('lng');

  const settlements = await getSettlements();
  if (!settlements) {
    throw new Error('Party not found');
  }

  const center =
    lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

  return json({
    settlements: settlements.filter(settlement => !!settlement.location),
    center,
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const lat = formData.get('lat');
  const lng = formData.get('lng');
  const type = formData.get('type');

  const settlement = await createSettlement({
    location: { lat: parseFloat(lat), lng: parseFloat(lng) },
    type,
  });

  return redirect(`/places/settlement/${settlement.id}`);
};

function Map() {
  const { settlements, center: initCenter } = useLoaderData();
  const [L, setL] = useState(null);
  const [Lb, setLb] = useState(null);
  const [zoom, setZoom] = useState(initZoom);
  const [newLocation, setNewLocation] = useState(null);

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
          {settlements.map(settlement => (
            <L.CircleMarker
              key={settlement.name}
              center={[settlement.location.lat, settlement.location.lng]}
              pathOptions={{ color: '#dd2a2a' }}
              radius={5}
            >
              <MapPopup L={L} title={settlement.name}>
                <ul className="map__popup-options">
                  <li>
                    <Link
                      to={`/places/settlement/${settlement.id}`}
                      target="_blank"
                      className="places__save"
                    >
                      {settlement.name || 'Sin nombre'}
                    </Link>
                  </li>
                </ul>
              </MapPopup>
            </L.CircleMarker>
          ))}
          {!!newLocation && (
            <L.CircleMarker
              center={[newLocation.lat, newLocation.lng]}
              pathOptions={{ color: '#dd2a2a' }}
              radius={5}
            >
              <MapPopup L={L} title="Nuevo asentamiento">
                <select name="type" defaultValue="village">
                  <option value="village">Aldea</option>
                  <option value="town">Pueblo</option>
                  <option value="city">Ciudad</option>
                </select>
                <button type="submit">Crear</button>
              </MapPopup>
            </L.CircleMarker>
          )}
          <L.SVGOverlay bounds={bounds}>
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
                    stroke="#dd2a2a"
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
                    stroke="#dd2a2a"
                  >
                    New
                  </text>
                )}
              </>
            )}
          </L.SVGOverlay>
          <MapEvents />
        </L.MapContainer>
      )}
    </Form>
  );
}

export default Map;

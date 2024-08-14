import { useEffect, useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getSettlements } from '~/services/settlements.server';

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

export const loader = async () => {
  const settlements = await getSettlements();
  if (!settlements) {
    throw new Error('Party not found');
  }

  return json({
    settlements: settlements.filter(settlement => !!settlement.location),
  });
};

function Map() {
  const { settlements } = useLoaderData();
  const [L, setL] = useState(null);
  const [Lb, setLb] = useState(null);
  const [zoom, setZoom] = useState(initZoom);

  function MapEvents() {
    L.useMapEvents({
      click: e => {
        console.log('Click', [e.latlng.lat, e.latlng.lng], e);
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
    <div style={{ width: '100vw', height: '100vh' }}>
      {!!L && !!Lb && (
        <L.MapContainer
          // center={[y^, x>]}
          center={[52, 35]}
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
              <L.Popup>{settlement.name}</L.Popup>
            </L.CircleMarker>
          ))}
          <L.SVGOverlay bounds={bounds}>
            {zoom > 4 &&
              settlements.map(settlement => (
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
          </L.SVGOverlay>
          <MapEvents />
        </L.MapContainer>
      )}
    </div>
  );
}

export default Map;

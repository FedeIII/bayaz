import { useEffect, useState } from 'react';

// x c [0, 100] left to right
// y c [0, 120] bottom to top

const markers = [
  { x: 31.556205070206275, y: 53.690155029296875, label: 'Thalesferro' },
  { x: 31.56792092039059, y: 54.319061279296875, label: 'Bahía del Hierro' },
  // { x: 75, y: 0, label: 'Test' },
  // { x: 75, y: 25, label: 'Test1.5' },
  // { x: 75, y: 50, label: 'Test2' },
  // { x: 75, y: 75, label: 'Test2.5' },
  // { x: 75, y: 100, label: 'Test3' },
];

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

function Map() {
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
          {markers.map(marker => (
            <L.CircleMarker
              key={marker.label}
              center={[marker.y, marker.x]}
              pathOptions={{ color: '#dd2a2a' }}
              radius={5}
            >
              <L.Popup>{marker.label}</L.Popup>
            </L.CircleMarker>
          ))}
          <L.SVGOverlay bounds={bounds}>
            {zoom > 4 &&
              markers.map(marker => (
                <text
                  key={marker.label}
                  // x >
                  // y v
                  x={`${
                    (marker.x / bounds[1][1]) * 100 -
                    0.1 +
                    getLabelOffset(zoom) * (zoom - initZoom)
                  }%`}
                  y={`${
                    (1 - marker.y / bounds[1][0]) * 100 -
                    0.1 +
                    getLabelOffset(zoom) * (zoom - initZoom)
                  }%`}
                  textAnchor="end"
                  fontFamily="Rosarivo"
                  fontSize="16px"
                  stroke="#dd2a2a"
                >
                  {marker.label}
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

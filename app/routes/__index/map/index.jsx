import MapComponent from '../../../components/map/map';

const markers = [
  { x: 100, y: 150, label: 'Marker 1' },
  { x: 200, y: 250, label: 'Marker 2' },
];

function Map() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapComponent markers={markers} />
    </div>
  );
}

export default Map;

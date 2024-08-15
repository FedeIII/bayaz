import { Link } from '@remix-run/react';
import MapPopup from '~/components/map/mapPopup';

export default function MapMarkers(props) {
  const {
    L,
    settlements,
    newLocation,
    region,
    addLocationToRegion,
    removeLocationFromRegion,
  } = props;

  return (
    <>
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
            <ul className="map__popup-options">
              <li>
                <select name="type" defaultValue="village">
                  <option value="village">Aldea</option>
                  <option value="town">Pueblo</option>
                  <option value="city">Ciudad</option>
                </select>
                <button name="action" value="createSettlement" type="submit">
                  Crear asentamiento
                </button>
              </li>
              <li>
                {!!region.find(
                  vertex =>
                    vertex.lat === newLocation.lat &&
                    vertex.lng === newLocation.lng
                ) ? (
                  <button onClick={() => removeLocationFromRegion(newLocation)}>
                    Quitar vértice
                  </button>
                ) : (
                  <button onClick={() => addLocationToRegion(newLocation)}>
                    Añadir vértice
                  </button>
                )}
              </li>
            </ul>
          </MapPopup>
        </L.CircleMarker>
      )}
    </>
  );
}

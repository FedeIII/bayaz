import { Link, useSubmit } from '@remix-run/react';
import { useRef, useState } from 'react';
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

  const submit = useSubmit();
  const typeRef = useRef(null);
  const [locationOver, setLocationOver] = useState(null);

  return (
    <>
      {settlements.map(settlement => (
        <L.CircleMarker
          key={settlement.id}
          pane="settlementsPane"
          center={[settlement.location.lat, settlement.location.lng]}
          pathOptions={{
            color:
              locationOver?.lat === settlement.location.lat &&
              locationOver?.lng === settlement.location.lng
                ? '#2b8c47'
                : '#dd2a2a',
          }}
          radius={
            locationOver?.lat === settlement.location.lat &&
            locationOver?.lng === settlement.location.lng
              ? 6
              : 5
          }
          eventHandlers={{
            mouseover: e => setLocationOver(e.latlng),
            mouseout: e => setLocationOver(null),
          }}
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
          pane="newElementsPane"
          center={[newLocation.lat, newLocation.lng]}
          pathOptions={{ color: '#d84343' }}
          radius={5}
        >
          <MapPopup L={L} title="Nuevo asentamiento">
            <ul className="map__popup-options">
              <li>
                <select name="type" defaultValue="village" ref={typeRef}>
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
              <li>
                {!!region.find(
                  vertex =>
                    vertex.lat === newLocation.lat &&
                    vertex.lng === newLocation.lng
                ) ? (
                  <button
                    type="button"
                    onClick={() => removeLocationFromRegion(newLocation)}
                  >
                    Quitar vértice
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addLocationToRegion(newLocation)}
                  >
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

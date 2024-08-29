import { Link, useSubmit } from '@remix-run/react';
import { useRef, useState } from 'react';
import MapPopup from '~/components/map/mapPopup';
import { t } from '~/domain/translations';

function SettlementMarker(props) {
  const { L, settlement, locationOver, setLocationOver } = props;
  const {
    id,
    location,
    name,
    population,
    government,
    security,
    securityType,
    magicShops,
    commerces,
  } = settlement;

  return (
    <L.CircleMarker
      key={id}
      pane="settlementsPane"
      center={[location.lat, location.lng]}
      pathOptions={{
        color:
          locationOver?.lat === location.lat &&
          locationOver?.lng === location.lng
            ? '#2b8c47'
            : '#dd2a2a',
      }}
      radius={
        locationOver?.lat === location.lat && locationOver?.lng === location.lng
          ? 6
          : 5
      }
      eventHandlers={{
        mouseover: e => setLocationOver(e.latlng),
        mouseout: () => setLocationOver(null),
      }}
    >
      <MapPopup L={L} title={name}>
        <ul className="map__popup-options">
          <li>
            <Link
              to={`/places/settlement/${id}`}
              target="_blank"
              className="places__save"
            >
              {name || 'Sin nombre'}
            </Link>
          </li>
          <li>
            <span>Población: ~{population}</span>
            {!!government && <span>{t(government.type)}</span>}
          </li>
          <li>
            <span>
              {security} {t(securityType)}
            </span>
            {!!magicShops && <span>{magicShops} tiendas</span>}
          </li>
          {!!commerces?.length && (
            <li>
              Comercio:{' '}
              <ul>
                {commerces.map(com => (
                  <li key={com}>{t(com)}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </MapPopup>
    </L.CircleMarker>
  );
}

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
  const newLocationPopupRef = useRef(null);
  const [locationOver, setLocationOver] = useState(null);

  return (
    <>
      {settlements.map(settlement => (
        <SettlementMarker
          key={settlement.id}
          L={L}
          settlement={settlement}
          locationOver={locationOver}
          setLocationOver={setLocationOver}
        />
      ))}
      {!!newLocation && (
        <L.CircleMarker
          pane="newElementsPane"
          center={[newLocation.lat, newLocation.lng]}
          pathOptions={{ color: '#d84343' }}
          radius={5}
        >
          <MapPopup L={L} title="Nuevo asentamiento" ref={newLocationPopupRef}>
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
                    onClick={() => {
                      addLocationToRegion(newLocation);
                      newLocationPopupRef.current._closeButton.click();
                    }}
                  >
                    Añadir vértice;
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

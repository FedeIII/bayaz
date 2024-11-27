import { Link, useSubmit } from '@remix-run/react';
import { useRef, useState } from 'react';
import { CircleMarker, Marker } from 'react-leaflet';

import { t } from '~/domain/translations';
import { closeMapPopup, getSettlementRadius } from '~/utils/map';
import MapPopup from './mapPopup';

function SettlementMarker(props) {
  const { settlement, locationOver, setLocationOver } = props;
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

  const popupRef = useRef(null);
  const markerRef = useRef(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [position, setPosition] = useState([location.lat, location.lng]);

  const MarkerComponent = isEditingLocation ? Marker : CircleMarker;

  const submit = useSubmit();
  function placeSettlement(location) {
    submit(
      {
        action: 'editSettlementLocation',
        id,
        lat: location.lat,
        lng: location.lng,
      },
      { method: 'post' }
    );
  }

  const isActive =
    locationOver?.lat === position[0] && locationOver?.lng === position[1];

  return (
    <MarkerComponent
      key={id}
      ref={markerRef}
      pane="settlementsPane"
      center={position}
      position={position}
      draggable
      pathOptions={{
        color: isActive ? '#2b8c47' : '#dd2a2a',
      }}
      radius={getSettlementRadius(settlement) + (isActive ? 1 : 0)}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const newPosition = marker.getLatLng();
            setPosition(marker.getLatLng());
            placeSettlement(newPosition);
          }
        },
        mouseover: e => setLocationOver(e.latlng),
        mouseout: () => setLocationOver(null),
      }}
    >
      <MapPopup title={name} ref={popupRef}>
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
          {isEditingLocation ? (
            <button
              type="button"
              onClick={e => {
                setIsEditingLocation(false);
                closeMapPopup(popupRef, e);
              }}
            >
              Parar edición
            </button>
          ) : (
            <button
              type="button"
              onClick={e => {
                setIsEditingLocation(true);
                closeMapPopup(popupRef, e);
              }}
            >
              Editar posición
            </button>
          )}
        </ul>
      </MapPopup>
    </MarkerComponent>
  );
}

export default function MapMarkers(props) {
  const { settlements, newLocation, region, startRegionCreation } = props;

  const submit = useSubmit();
  const typeRef = useRef(null);
  const newLocationPopupRef = useRef(null);
  const [locationOver, setLocationOver] = useState(null);

  return (
    <>
      {settlements.map(settlement => (
        <SettlementMarker
          key={settlement.id}
          settlement={settlement}
          locationOver={locationOver}
          setLocationOver={setLocationOver}
        />
      ))}
      {!!newLocation && (
        <CircleMarker
          pane="newElementsPane"
          center={[newLocation.lat, newLocation.lng]}
          pathOptions={{ color: '#d84343' }}
          radius={5}
        >
          <MapPopup title="Nuevo asentamiento" ref={newLocationPopupRef}>
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
                    onClick={e => {
                      startRegionCreation();
                      closeMapPopup(newLocationPopupRef, e);
                    }}
                  >
                    Nueva región
                  </button>
                )}
              </li>
            </ul>
          </MapPopup>
        </CircleMarker>
      )}
    </>
  );
}
